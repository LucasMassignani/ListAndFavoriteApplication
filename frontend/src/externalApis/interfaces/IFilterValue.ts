import IBool from './FilterTypes/IBool';
import ISort from './FilterTypes/ISort';
import ITextList from './FilterTypes/ITextList';

export default interface IFilterValue {
  filter: IBool | ITextList | ISort;
  value: any;
}
