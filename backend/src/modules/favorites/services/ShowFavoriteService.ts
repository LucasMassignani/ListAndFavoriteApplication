import { injectable, inject } from 'tsyringe';
import IFavoritesRepository from '../repositories/IFavoritesRepository';
import Favorite from '../infra/typeorm/entities/Favorite';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';

interface IRequest {
  user_id: string;
  original_id: string;
  api_type: string;
}

@injectable()
class ShowFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    user_id,
    original_id,
    api_type,
  }: IRequest): Promise<Favorite | undefined> {
    const item = await this.itemsRepository.findByItem({
      api_type,
      original_id,
    });
    if (!item) {
      return undefined;
    }
    const favorite = this.favoritesRepository.findByUserIdAndItemId(
      user_id,
      item.id,
    );
    return favorite;
  }
}

export default ShowFavoriteService;
