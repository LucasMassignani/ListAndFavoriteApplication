import React from 'react';
import { Select as SelectAnt, Form } from 'antd';
import ISort from '../../externalApis/interfaces/FilterTypes/ISort';
import ISelect from '../../externalApis/interfaces/FilterTypes/ISelect';

const { Option } = SelectAnt;

interface ISelectInput {
  filter: ISort | ISelect;
  disabled?: boolean;
}

const Select: React.FC<ISelectInput> = ({ filter, disabled = false }) => {
  return (
    <Form.Item name={filter.name} label={filter.label}>
      <SelectAnt disabled={disabled}>
        {filter.options.map((option) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </SelectAnt>
    </Form.Item>
  );
};

export default Select;
