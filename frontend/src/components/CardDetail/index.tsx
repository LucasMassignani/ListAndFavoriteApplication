import React, { useMemo } from 'react';
import { Form, Button, Col, Row } from 'antd';
import SelectBool from '../SelectBool';
import SelectTextList from '../SelectTextList';
import Select from '../Select';
import Modal from 'antd/lib/modal/Modal';
import IItem from '../../externalApis/interfaces/IItem';
import IFilter from '../../externalApis/interfaces/IFilter';
import IDynamicFilter from '../../externalApis/interfaces/IDynamicFilter';
import { FooterContainer } from './styles';

interface ICardDetail {
  item: IItem;
  filters: IFilter[];
  dynamicFilter: IDynamicFilter;
  visible: boolean;
  onClose: () => void;
}

const CardDetail: React.FC<ICardDetail> = ({
  item,
  filters,
  dynamicFilter,
  visible,
  onClose,
}) => {
  const values = useMemo(() => {
    return filters.reduce((acc: any, filter) => {
      acc[filter.name] = filter.value;
      return acc;
    }, {});
  }, [filters]);

  return (
    <Modal
      title={item.title}
      onCancel={onClose}
      visible={visible}
      footer={
        <FooterContainer>
          <Button onClick={onClose}>Close</Button>
        </FooterContainer>
      }
    >
      <Form layout="vertical" hideRequiredMark initialValues={values}>
        <Row gutter={16}>
          {Object.keys(dynamicFilter).map((key) => {
            const filter = dynamicFilter[key];

            if (filter.type === 'bool') {
              return (
                <Col key={filter.name} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <SelectBool disabled filter={filter} />
                </Col>
              );
            }
            if (filter.type === 'textList') {
              return (
                <Col key={filter.name} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <SelectTextList disabled filter={filter} />
                </Col>
              );
            }
            if (filter.type === 'select') {
              return (
                <Col key={filter.name} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Select disabled filter={filter} />
                </Col>
              );
            }

            return <React.Fragment key={key} />;
          })}
        </Row>
      </Form>
    </Modal>
  );
};

export default CardDetail;
