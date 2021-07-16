import React from 'react';
import { Row, Col } from 'antd';
import Artwork from '../Artwork';
import { Container, TitleContainer } from './styles';
import IItem from '../../externalApis/interfaces/IItem';
import { Link } from 'react-router-dom';

interface IArtworkList {
  title: string;
  pathToAll?: string;
  artworkList: IItem[];
}

const ArtworkList: React.FC<IArtworkList> = ({
  title,
  pathToAll,
  artworkList,
}) => {
  return (
    <div>
      <TitleContainer>
        <h2>{title}</h2>
        {pathToAll && <Link to={pathToAll}>See All</Link>}
      </TitleContainer>
      <Container>
        <Row gutter={32}>
          {artworkList.map((item) => {
            return (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <Artwork item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default ArtworkList;
