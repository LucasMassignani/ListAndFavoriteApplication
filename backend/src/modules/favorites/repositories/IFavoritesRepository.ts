import Favorite from '../infra/typeorm/entities/Favorite';
import ICreateFavoriteDTO from '../dtos/ICreateFavoriteDTO';
import Filter from '@modules/filters/infra/typeorm/entities/Filter';

export default interface IFavoritesRepository {
  findByUserIdAndItemId(
    user_id: string,
    item_id: string,
  ): Promise<Favorite | undefined>;
  delete(favorite: Favorite): Promise<void>;
  findAllUserFilters(user_id: string): Promise<Filter[]>;
  create(data: ICreateFavoriteDTO): Promise<Favorite>;
  save(user: Favorite): Promise<Favorite>;
}
