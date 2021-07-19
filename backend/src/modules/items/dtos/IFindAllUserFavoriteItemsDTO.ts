import Item from '../infra/typeorm/entities/Item';
import IPaginationDTO from './IPaginationDTO';

export default interface IFindAllUserFavoriteItemsDTO {
  list: Item[];
  pagination: IPaginationDTO;
}
