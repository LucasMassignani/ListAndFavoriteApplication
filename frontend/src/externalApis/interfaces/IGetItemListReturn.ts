import IDynamicFilter from './IDynamicFilter';
import IItem from './IItem';

export default interface IGetItemListReturn {
  filter: IDynamicFilter;
  list: IItem[];
  totalPages: number;
  totalRegisters: number;
}
