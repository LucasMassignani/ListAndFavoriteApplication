import { injectable, inject } from 'tsyringe';
import IFavoritesRepository from '../repositories/IFavoritesRepository';
import Favorite from '../infra/typeorm/entities/Favorite';

interface IRequest {
  user_id: string;
}

@injectable()
class ListFavoritesService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Favorite[]> {
    const favorites = await this.favoritesRepository.findAllUserFavorite(
      user_id,
    );
    return favorites;
  }
}

export default ListFavoritesService;
