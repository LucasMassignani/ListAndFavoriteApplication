import React, { useCallback, useRef } from 'react';
import { Form, Button, Col, Row, FormInstance } from 'antd';
import IDynamicFilter from '../../externalApis/interfaces/IDynamicFilter';
import SelectBool from '../SelectBool';
import SelectTextList from '../SelectTextList';
import IFilterValue from '../../externalApis/interfaces/IFilterValue';
import SelectSort from '../SelectSort';
import Modal from 'antd/lib/modal/Modal';
import { FooterContainer } from './styles';

interface IFilter {
  dynamicFilter: IDynamicFilter;
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: IFilterValue[]) => void;
}

const Filter: React.FC<IFilter> = ({
  dynamicFilter,
  visible,
  onClose,
  onSubmit,
}) => {
  const formRef = useRef<FormInstance>(null);

  const handleSubmit = useCallback(
    (data) => {
      const valueList = Object.keys(data).map((key): IFilterValue => {
        const value = data[key];
        const filter = dynamicFilter[key];
        return {
          value,
          filter,
        };
      });

      onSubmit(valueList);
    },
    [dynamicFilter, onSubmit],
  );

  const handleClickSubmit = useCallback(() => {
    if (formRef.current?.submit) {
      formRef.current.submit();
    }
  }, []);

  return (
    <Modal
      title="Filter"
      onCancel={onClose}
      visible={visible}
      footer={
        <FooterContainer>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleClickSubmit} type="primary">
            Submit
          </Button>
        </FooterContainer>
      }
    >
      <Form
        layout="vertical"
        ref={formRef}
        onFinish={handleSubmit}
        hideRequiredMark
      >
        <Row gutter={16}>
          {Object.keys(dynamicFilter).map((key) => {
            const filter = dynamicFilter[key];

            if (filter.type === 'bool') {
              return (
                <Col key={filter.name} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <SelectBool filter={filter} />
                </Col>
              );
            }
            if (filter.type === 'textList') {
              return (
                <Col key={filter.name} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <SelectTextList filter={filter} />
                </Col>
              );
            }
            if (filter.type === 'sort') {
              return (
                <Col key={filter.name} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <SelectSort filter={filter} />
                </Col>
              );
            }
            console.error(
              'Invalid type for dynamicFilter. Check this externalApi dynamicFilter!',
            );
            return <React.Fragment key={key} />;
          })}
        </Row>
      </Form>
    </Modal>
  );
};

export default Filter;
