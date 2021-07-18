import { v4 } from 'uuid';

import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';

import Favorite from '../../infra/typeorm/entities/Favorite';

class FakeFavoritesRepository implements IFavoritesRepository {
  private favorites: Favorite[] = [];

  public async findAllUserFavorite(user_id: string): Promise<Favorite[]> {
    return this.favorites.filter(favorite => favorite.user_id === user_id);
  }

  public async findByUserIdAndItemId(
    user_id: string,
    item_id: string,
  ): Promise<Favorite | undefined> {
    return this.favorites.find(
      favorite => favorite.user_id === user_id && favorite.item_id === item_id,
    );
  }

  public async create(favoriteData: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = new Favorite();

    Object.assign(favorite, { id: v4() }, favoriteData);

    this.favorites.push(favorite);

    return favorite;
  }

  public async save(favorite: Favorite): Promise<Favorite> {
    const findIndex = this.favorites.findIndex(
      findFavorite => findFavorite.id === favorite.id,
    );

    this.favorites[findIndex] = favorite;

    return favorite;
  }

  public async delete(favorite: Favorite): Promise<void> {
    this.favorites = this.favorites.filter(
      findFavorite => findFavorite.id !== favorite.id,
    );
  }
}

export default FakeFavoritesRepository;
