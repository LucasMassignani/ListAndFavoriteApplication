import Favorite from '../infra/typeorm/entities/Favorite';
import ICreateFavoriteDTO from '../dtos/ICreateFavoriteDTO';

export default interface IFavoritesRepository {
  findAllUserFavorite(user_id: string): Promise<Favorite[]>;
  findByUserIdAndItemId(
    user_id: string,
    item_id: string,
  ): Promise<Favorite | undefined>;
  delete(favorite: Favorite): Promise<void>;
  create(data: ICreateFavoriteDTO): Promise<Favorite>;
  save(user: Favorite): Promise<Favorite>;
}
