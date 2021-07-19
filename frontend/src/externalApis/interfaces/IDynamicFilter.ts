import IAllFilterTypes from './FilterTypes/IAllFiltersTypes';

export default interface IDynamicFilter {
  [key: string]: IAllFilterTypes;
}
