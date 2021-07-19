import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardList from '../../components/CardList';
import ArtInstituteChicagoApi from '../../externalApis/ArtInstituteChicagoApi';
import IItem from '../../externalApis/interfaces/IItem';
import StoreApi from '../../externalApis/StoreApi';

import { Container } from './styles';

const Home: React.FC = () => {
  const [loadingChicagoArtwork, setLoadingChicagoArtwork] = useState(true);
  const [listChicagoArtwork, setListChicagoArtwork] = useState<IItem[]>([]);

  const [loadingStore, setLoadingStore] = useState(true);
  const [listStore, setListStore] = useState<IItem[]>([]);

  useEffect(() => {
    async function findArtwork(): Promise<void> {
      try {
        const response = await ArtInstituteChicagoApi.getItemList({
          limit: 3,
          page: 1,
        });
        setListChicagoArtwork(response.list);
        setLoadingChicagoArtwork(false);
      } catch (error) {
        setListChicagoArtwork([]);
        setLoadingChicagoArtwork(false);
        toast.error('Error trying to get the artworks!');
      }
    }

    findArtwork();
  }, []);

  useEffect(() => {
    async function findStoreItems(): Promise<void> {
      try {
        const response = await StoreApi.getItemList({
          limit: 3,
          page: 1,
        });
        setListStore(response.list);
        setLoadingStore(false);
      } catch (error) {
        setListChicagoArtwork([]);
        setLoadingChicagoArtwork(false);
        toast.error('Error trying to get the store items!');
      }
    }

    findStoreItems();
  }, []);

  return (
    <Container>
      <CardList
        title="Art Institute of Chicago"
        pathToAll="art-institute-chicago"
        loading={loadingChicagoArtwork}
        itemList={listChicagoArtwork}
      />

      <CardList
        title="Store"
        pathToAll="store"
        loading={loadingStore}
        itemList={listStore}
      />
    </Container>
  );
};

export default Home;
