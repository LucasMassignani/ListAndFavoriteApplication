import Item from '../infra/typeorm/entities/Item';
import ICreateItemDTO from '../dtos/ICreateItemDTO';
import IItemDTO from '../dtos/IItemDTO';
import IFindAllUserFavoriteItemsDTO from '../dtos/IFindAllUserFavoriteItemsDTO';
import IFindAllUserFavoriteItemsOptionsDTO from '../dtos/IFindAllUserFavoriteItemsOptionsDTO';

export default interface IItemsRepository {
  findById(id: string): Promise<Item | undefined>;
  findByItem(item: IItemDTO): Promise<Item | undefined>;
  findAllUserFavoriteItems(
    user_id: string,
    item: IFindAllUserFavoriteItemsOptionsDTO,
  ): Promise<IFindAllUserFavoriteItemsDTO>;
  create(data: ICreateItemDTO): Promise<Item>;
  save(item: Item): Promise<Item>;
}
