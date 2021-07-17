import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Pagination } from 'antd';
import qs from 'qs';

import CardList from '../../components/CardList';
import ArtInstituteChicagoApi from '../../externalApis/ArtInstituteChicagoApi';
import IItem from '../../externalApis/interfaces/IItem';
import { Container, CustomAlert, FilterContainer } from './styles';
import Filter from '../../components/Filter';
import IDynamicFilter from '../../externalApis/interfaces/IDynamicFilter';
import IFilterValue from '../../externalApis/interfaces/IFilterValue';
import { toast } from 'react-toastify';

const ChicagoArtwork: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [filterVisible, setFilterVisible] = useState(false);
  const [listFilterValue, setListFilterValue] = useState<IFilterValue[]>([]);
  const [dynamicFilter, setDynamicFilter] = useState<IDynamicFilter>({});
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(24);
  const [page, setPage] = useState<number>(0);
  const [itemList, setItemList] = useState<IItem[]>([]);

  useEffect(() => {
    const params = qs.parse(location.search.replace('?', ''));

    const newPage = params.page ? Number(params.page) : 1;
    setPage(newPage > 24 ? 24 : newPage);

    try {
      const newListFilterValue = JSON.parse(String(params.listFilterValue));
      setListFilterValue(newListFilterValue);
    } catch (e) {
      setListFilterValue([]);
    }
  }, [location.search]);

  useEffect(() => {
    async function findArtwork(): Promise<void> {
      try {
        const response = await ArtInstituteChicagoApi.getItemList({
          limit: 21,
          page,
          listFilterValue,
        });
        setItemList(response.list);
        setDynamicFilter(response.filter);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (error) {
        setItemList([]);
        setDynamicFilter({});
        setTotalPages(0);
        setLoading(false);
        toast.error('Error trying to get the artworks');
      }
    }

    findArtwork();
  }, [listFilterValue, page]);

  const handleChangePagination = useCallback(
    (pageNumber: number) => {
      setLoading(true);
      setItemList([]);
      history.push({
        pathname: '/art-institute-chicago',
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
        pathname: '/art-institute-chicago',
        search: `?page=${1}&listFilterValue=${JSON.stringify(data)}`,
      });
    },
    [history],
  );

  return (
    <Container>
      {page === 24 && totalPages > 24 && (
        <CustomAlert
          onClick={handleClickFilter}
          message="Want to see more artworks? Try to add a filter!"
          type="info"
        />
      )}
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
      />
      <CardList
        title="Art Institute of Chicago"
        loading={loading}
        itemList={itemList}
      />

      <Pagination
        showQuickJumper
        showLessItems
        hideOnSinglePage
        showSizeChanger={false}
        defaultCurrent={1}
        current={page}
        pageSize={21}
        total={totalPages > 24 ? 504 : totalPages * 21}
        onChange={handleChangePagination}
      />
    </Container>
  );
};

export default ChicagoArtwork;
