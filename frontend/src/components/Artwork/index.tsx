import React from 'react';
import { Image } from 'antd';

import { Container } from './styles';
import IItem from '../../externalApis/interfaces/IItem';

interface IArtwork {
  item: IItem;
}

const Artwork: React.FC<IArtwork> = ({ item }) => {
  return (
    <Container>
      <Image width={200} height={200} src={item.imageUrl} alt="" />
    </Container>
  );
};

export default Artwork;
