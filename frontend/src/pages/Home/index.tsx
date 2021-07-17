import React, { useEffect, useState } from 'react';
import CardList from '../../components/CardList';
import ArtInstituteChicagoApi from '../../externalApis/ArtInstituteChicagoApi';
import IItem from '../../externalApis/interfaces/IItem';

import { Container } from './styles';

const Home: React.FC = () => {
  const [loadingChicagoArtwork, setLoadingChicagoArtwork] = useState(true);
  const [listChicagoArtwork, setListChicagoArtwork] = useState<IItem[]>([]);

  useEffect(() => {
    async function findArtwork(): Promise<void> {
      const response = await ArtInstituteChicagoApi.getItemList({
        limit: 3,
        page: 1,
      });
      setListChicagoArtwork(response.list);
      setLoadingChicagoArtwork(false);
    }

    findArtwork();
  }, []);

  return (
    <Container>
      <CardList
        title="Art Institute of Chicago"
        pathToAll="art-institute-chicago"
        loading={loadingChicagoArtwork}
        itemList={listChicagoArtwork}
      />
    </Container>
  );
};

export default Home;
