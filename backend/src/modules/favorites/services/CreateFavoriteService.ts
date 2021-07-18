import { injectable, inject } from 'tsyringe';

import IFavoritesRepository from '../repositories/IFavoritesRepository';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
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
}

@injectable()
class CreateUserService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({ user_id, item }: IRequest): Promise<Favorite> {
    let itemDB = await this.itemsRepository.findByItem(item);

    if (!itemDB) {
      itemDB = await this.itemsRepository.create(item);
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
