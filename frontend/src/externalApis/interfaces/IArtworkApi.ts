import IItem from './IItem';
import IOptions from './IOptions';

export default interface IArtworkApi {
  getItemList(options: IOptions): Promise<Array<IItem>>;
}
