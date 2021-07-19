import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Pagination } from 'antd';
import qs from 'qs';

import CardList from '../../components/CardList';
import IItem from '../../externalApis/interfaces/IItem';
import { Container, FilterContainer } from './styles';
import Filter from '../../components/Filter';
import IDynamicFilter from '../../externalApis/interfaces/IDynamicFilter';
import IFilterValue from '../../externalApis/interfaces/IFilterValue';
import { toast } from 'react-toastify';
import api from '../../services/api';
import ArtInstituteChicagoApi from '../../externalApis/ArtInstituteChicagoApi';
import StoreApi from '../../externalApis/StoreApi';

const Favorite: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [filterVisible, setFilterVisible] = useState(false);
  const [listFilterValue, setListFilterValue] = useState<IFilterValue[]>([]);
  const [dynamicFilter, setDynamicFilter] = useState<IDynamicFilter>({});
  const [loading, setLoading] = useState(true);
  const [totalRegisters, setTotalRegisters] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [itemList, setItemList] = useState<IItem[]>([]);

  useEffect(() => {
    const params = qs.parse(location.search.replace('?', ''));

    const newPage = params.page ? Number(params.page) : 1;
    setPage(newPage);

    try {
      const newListFilterValue = JSON.parse(String(params.listFilterValue));
      setListFilterValue(newListFilterValue);
    } catch (e) {
      setListFilterValue([]);
    }
  }, [location.search]);

  useEffect(() => {
    async function findFavorite(): Promise<void> {
      try {
        const [favoriteResponse, filterResponse] = await Promise.all([
          api.get('favorites', {
            params: {
              limit: 21,
              page,
              listFilterValue: JSON.stringify(listFilterValue),
            },
          }),
          api.get('filters'),
        ]);

        const chicagoFilters = ArtInstituteChicagoApi.getDynamicFilter();
        const storeFilters = StoreApi.getDynamicFilter();

        const newDynamicFilter = Object.keys(filterResponse.data).reduce(
          (acc: IDynamicFilter, key) => {
            const filter = filterResponse.data[key];
            const chicagoFilter = chicagoFilters[key];
            const storeFilter = storeFilters[key];

            if (chicagoFilter) {
              if (chicagoFilter.type === 'textList') {
                chicagoFilter.recommendedOptions = filter.values;
              }
              acc[key] = chicagoFilter;
            }

            if (storeFilter) {
              if (storeFilter.type === 'select') {
                storeFilter.options = filter.values.map((value: string) => {
                  return {
                    label: value,
                    value: value,
                  };
                });
              }
              acc[key] = storeFilter;
            }
            return acc;
          },
          {} as IDynamicFilter,
        );

        setItemList(favoriteResponse.data.list);

        setDynamicFilter(newDynamicFilter);
        setTotalRegisters(favoriteResponse.data.pagination.totalRegisters);
        setLoading(false);
      } catch (error) {
        setItemList([]);
        setDynamicFilter({});
        setTotalRegisters(0);
        setLoading(false);
        toast.error('Error trying to get the favorite list!');
      }
    }

    findFavorite();
  }, [listFilterValue, page]);

  const handleChangePagination = useCallback(
    (pageNumber: number) => {
      setLoading(true);
      setItemList([]);
      history.push({
        pathname: '/favorite',
        search: `?page=${pageNumber}&listFilterValue=${JSON.stringify(
          listFilterValue,
        )}`,
      });
    },
    [history, listFilterValue],
  );

  const handleClickFilter = useCallback(() => {
    setFilterVisible(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setFilterVisible(false);
  }, []);

  const handleSubmitFilter = useCallback(
    (data: IFilterValue[]) => {
      setLoading(true);
      setItemList([]);
      setFilterVisible(false);
      history.push({
        pathname: '/favorite',
        search: `?page=${1}&listFilterValue=${JSON.stringify(data)}`,
      });
    },
    [history],
  );

  const handleClear = useCallback(() => {
    setLoading(true);
    setItemList([]);
    setFilterVisible(false);
    history.push({
      pathname: '/favorite',
      search: `?page=${1}`,
    });
  }, [history]);

  return (
    <Container>
      <FilterContainer>
        <Button disabled={loading} type="primary" onClick={handleClickFilter}>
          Filter
        </Button>
      </FilterContainer>
      <Filter
        dynamicFilter={dynamicFilter}
        visible={filterVisible}
        onClose={handleCloseFilter}
        onSubmit={handleSubmitFilter}
        onClear={handleClear}
      />
      <CardList title="Favorites" loading={loading} itemList={itemList} />

      <Pagination
        showQuickJumper
        showLessItems
        hideOnSinglePage
        showSizeChanger={false}
        defaultCurrent={1}
        current={page}
        pageSize={21}
        total={totalRegisters}
        onChange={handleChangePagination}
      />
    </Container>
  );
};

export default Favorite;
