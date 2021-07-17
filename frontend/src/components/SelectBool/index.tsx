import React from 'react';
import { Select, Form } from 'antd';
import IBool from '../../externalApis/interfaces/FilterTypes/IBool';

const { Option } = Select;

interface ISelectBool {
  filter: IBool;
}

const SelectBool: React.FC<ISelectBool> = ({ filter }) => {
  return (
    <Form.Item name={filter.name} label={filter.label}>
      <Select>
        <Option value="both">Both</Option>
        <Option value="true">Yes</Option>
        <Option value="false">No</Option>
      </Select>
    </Form.Item>
  );
};

export default SelectBool;
