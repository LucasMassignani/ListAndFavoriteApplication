import { v4 } from 'uuid';

import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';

import Favorite from '../../infra/typeorm/entities/Favorite';
import Filter from '@modules/filters/infra/typeorm/entities/Filter';

class FakeFavoritesRepository implements IFavoritesRepository {
  private favorites: Favorite[] = [];

  public async findByUserIdAndItemId(
    user_id: string,
    item_id: string,
  ): Promise<Favorite | undefined> {
    return this.favorites.find(
      favorite => favorite.user_id === user_id && favorite.item_id === item_id,
    );
  }

  public async findAllUserFilters(): Promise<Filter[]> {
    return [];
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
