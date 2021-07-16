import React, { useEffect, useState } from 'react';
import ArtworkList from '../../components/ArtworkList';
import ArtInstituteChicagoApi from '../../externalApis/ArtInstituteChicagoApi';
import IItem from '../../externalApis/interfaces/IItem';

import { Container } from './styles';

const Home: React.FC = () => {
  const [listChicagoArtwork, setListChicagoArtwork] = useState<IItem[]>([]);

  useEffect(() => {
    async function findArtwork(): Promise<void> {
      const list = await ArtInstituteChicagoApi.getItemList({
        limit: 3,
        page: 1,
      });
      setListChicagoArtwork(list);
    }

    findArtwork();
  }, []);

  return (
    <Container>
      <ArtworkList
        title="Search by Art Institute of Chicago"
        pathToAll="art-institute-chicago"
        artworkList={listChicagoArtwork}
      />
    </Container>
  );
};

export default Home;
