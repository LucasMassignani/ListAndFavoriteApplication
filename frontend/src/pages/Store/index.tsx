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
import StoreApi from '../../externalApis/StoreApi';

const Store: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [filterVisible, setFilterVisible] = useState(false);
  const [listFilterValue, setListFilterValue] = useState<IFilterValue[]>([]);
  const [dynamicFilter, setDynamicFilter] = useState<IDynamicFilter>({});
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(1);
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
    async function findStoreItems(): Promise<void> {
      try {
        const response = await StoreApi.getItemList({
          limit: 6,
          page,
          listFilterValue,
        });
        setItemList(response.list);
        setDynamicFilter(response.filter);
        setTotal(response.totalRegisters);
        setLoading(false);
      } catch (error) {
        setItemList([]);
        setDynamicFilter({});
        setTotal(0);
        setLoading(false);
        toast.error('Error trying to get the store items!');
      }
    }

    findStoreItems();
  }, [listFilterValue, page]);

  const handleChangePagination = useCallback(
    (pageNumber: number) => {
      setLoading(true);
      setItemList([]);
      history.push({
        pathname: '/store',
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
        pathname: '/store',
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
      pathname: '/store',
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
      <CardList title="Store" loading={loading} itemList={itemList} />

      <Pagination
        showQuickJumper
        showLessItems
        hideOnSinglePage
        showSizeChanger={false}
        defaultCurrent={1}
        current={page}
        pageSize={6}
        total={total}
        onChange={handleChangePagination}
      />
    </Container>
  );
};

export default Store;
