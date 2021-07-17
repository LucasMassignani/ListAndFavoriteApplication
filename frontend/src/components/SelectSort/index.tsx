import React from 'react';
import { Select, Form } from 'antd';
import ISort from '../../externalApis/interfaces/FilterTypes/ISort';

const { Option } = Select;

interface ISelectSort {
  filter: ISort;
}

const SelectSort: React.FC<ISelectSort> = ({ filter }) => {
  return (
    <Form.Item name={filter.name} label={filter.label}>
      <Select>
        {filter.options.map((option) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default SelectSort;
