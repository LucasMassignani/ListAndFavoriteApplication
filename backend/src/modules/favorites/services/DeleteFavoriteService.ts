import { injectable, inject } from 'tsyringe';

import IFavoritesRepository from '../repositories/IFavoritesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  item_id: string;
}

@injectable()
class DeleteFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute({ user_id, item_id }: IRequest): Promise<void> {
    const favorite = await this.favoritesRepository.findByUserIdAndItemId(
      user_id,
      item_id,
    );

    if (!favorite) {
      throw new AppError('Favorite item not found!', 404);
    }
    await this.favoritesRepository.delete(favorite);
  }
}

export default DeleteFavoriteService;
