import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtworkList from '../../components/ArtworkList';
import ArtInstituteChicagoApi from '../../externalApis/ArtInstituteChicagoApi';
import IItem from '../../externalApis/interfaces/IItem';
import { Container } from './styles';

interface IParams {
  page?: string;
}

const ChicagoArtwork: React.FC = () => {
  const { page } = useParams<IParams>();

  const [listChicagoArtwork, setListChicagoArtwork] = useState<IItem[]>([]);

  useEffect(() => {
    async function findArtwork(): Promise<void> {
      const list = await ArtInstituteChicagoApi.getItemList({
        limit: 21,
        page: page ? Number(page) : 1,
      });
      setListChicagoArtwork(list);
    }

    findArtwork();
  }, [page]);

  return (
    <Container>
      <ArtworkList
        title="Art Institute of Chicago"
        artworkList={listChicagoArtwork}
      />
    </Container>
  );
};

export default ChicagoArtwork;
