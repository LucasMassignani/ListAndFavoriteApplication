import IDynamicFilter from './IDynamicFilter';
import IFilter from './IFilter';
import IGetItemListReturn from './IGetItemListReturn';
import IItem from './IItem';
import IOptions from './IOptions';

export default interface IItemApi {
  getApiType(): string;
  getItemList(options: IOptions): Promise<IGetItemListReturn>;
  getDynamicFilter(): IDynamicFilter;
  getFilterFromItem(item: IItem): Promise<IFilter[]>;
}
