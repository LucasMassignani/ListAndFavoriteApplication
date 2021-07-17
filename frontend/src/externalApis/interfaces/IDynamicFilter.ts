import IBool from './FilterTypes/IBool';
import ISort from './FilterTypes/ISort';
import ITextList from './FilterTypes/ITextList';

export default interface IDynamicFilter {
  [key: string]: IBool | ITextList | ISort;
}
