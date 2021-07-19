import { injectable, inject } from 'tsyringe';

import IFavoritesRepository from '../repositories/IFavoritesRepository';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import IFiltersRepository from '@modules/filters/repositories/IFiltersRepository';
import Favorite from '../infra/typeorm/entities/Favorite';

interface IRequest {
  user_id: string;
  item: {
    original_id: string;
    api_type: string;
    title: string;
    image_url: string;
    image_preview?: string;
  };
  filters: Array<{ name: string; value: string }>;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
    @inject('FiltersRepository')
    private filtersRepository: IFiltersRepository,
  ) {}

  public async execute({
    user_id,
    item,
    filters,
  }: IRequest): Promise<Favorite> {
    let itemDB = await this.itemsRepository.findByItem(item);

    if (!itemDB) {
      itemDB = await this.itemsRepository.create(item);
      if (itemDB.id) {
        const filtersWithId = filters.map(filter => ({
          ...filter,
          item_id: itemDB?.id || '',
        }));
        await this.filtersRepository.createList(filtersWithId);
      }
    }

    const checkFavoriteExists =
      await this.favoritesRepository.findByUserIdAndItemId(user_id, itemDB.id);

    if (checkFavoriteExists) {
      return checkFavoriteExists;
    }
    const favorite = await this.favoritesRepository.create({
      item_id: itemDB.id,
      user_id,
    });

    return favorite;
  }
}

export default CreateUserService;
