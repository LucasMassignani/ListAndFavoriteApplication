import React from 'react';
import { Row, Col } from 'antd';
import Card from '../Card';
import { Container, CustomEmpty, TitleContainer } from './styles';
import IItem from '../../externalApis/interfaces/IItem';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

interface ICardList {
  title: string;
  loading?: boolean;
  pathToAll?: string;
  itemList: IItem[];
}

const CardList: React.FC<ICardList> = ({
  title,
  loading = false,
  pathToAll,
  itemList,
}) => {
  return (
    <div>
      <TitleContainer>
        <h2>{title}</h2>
        {pathToAll && <Link to={pathToAll}>See All</Link>}
      </TitleContainer>
      <Container>
        <Row gutter={32}>
          {loading ? (
            <Loading />
          ) : itemList.length < 1 ? (
            <CustomEmpty />
          ) : (
            itemList.map((item) => {
              const md = itemList.length === 2 ? 12 : 8;
              return (
                <Col key={item.original_id} xs={24} sm={12} md={md}>
                  <Card item={item} />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CardList;
