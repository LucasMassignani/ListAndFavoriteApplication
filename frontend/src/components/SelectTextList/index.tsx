import React from 'react';
import { Select, Form } from 'antd';
import ITextList from '../../externalApis/interfaces/FilterTypes/ITextList';

const { Option } = Select;

interface ISelectTextList {
  filter: ITextList;
}

const SelectTextList: React.FC<ISelectTextList> = ({ filter }) => {
  return (
    <Form.Item name={filter.name} label={filter.label}>
      <Select mode="tags">
        {filter.recommendedOptions.map((option) => {
          return (
            <Option key={option} value={option}>
              {option}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default SelectTextList;
