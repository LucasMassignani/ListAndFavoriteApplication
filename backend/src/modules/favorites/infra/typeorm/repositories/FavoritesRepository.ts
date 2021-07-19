import { getRepository, Repository } from 'typeorm';

import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';

import Favorite from '../entities/Favorite';
import Filter from '@modules/filters/infra/typeorm/entities/Filter';

class FavoritesRepository implements IFavoritesRepository {
  private ormRepository: Repository<Favorite>;

  constructor() {
    this.ormRepository = getRepository(Favorite);
  }

  public async findByUserIdAndItemId(
    user_id: string,
    item_id: string,
  ): Promise<Favorite | undefined> {
    const favorite = await this.ormRepository.findOne({
      where: {
        user_id,
        item_id,
      },
    });

    return favorite;
  }

  public async findAllUserFilters(user_id: string): Promise<Filter[]> {
    const favorites = await this.ormRepository
      .createQueryBuilder('favorites')
      .leftJoinAndSelect('favorites.item', 'item')
      .leftJoinAndSelect('item.filters', 'filters')
      .where('favorites.user_id = :user_id', { user_id })
      .getMany();

    const filters = favorites.reduce((acc, favorite) => {
      acc = [...acc, ...favorite.item.filters];
      return acc;
    }, [] as Filter[]);
    return filters;
  }

  public async create(favoriteData: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = this.ormRepository.create(favoriteData);

    await this.ormRepository.save(favorite);

    return favorite;
  }

  public async save(favorite: Favorite): Promise<Favorite> {
    const saveFavorite = await this.ormRepository.save(favorite);
    return saveFavorite;
  }

  public async delete(favorite: Favorite): Promise<void> {
    await this.ormRepository.delete(favorite.id);
  }
}

export default FavoritesRepository;
