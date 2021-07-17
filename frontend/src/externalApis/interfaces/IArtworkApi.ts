import IGetItemListReturn from './IGetItemListReturn';
import IOptions from './IOptions';

export default interface IArtworkApi {
  getItemList(options: IOptions): Promise<IGetItemListReturn>;
}
