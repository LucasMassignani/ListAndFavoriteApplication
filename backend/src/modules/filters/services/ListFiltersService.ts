import { injectable, inject } from 'tsyringe';
import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';

interface IRequest {
  user_id: string;
}

interface IResponse {
  [key: string]: {
    name: string;
    values: string;
  };
}

@injectable()
class ListFavoritesService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const filters = await this.favoritesRepository.findAllUserFilters(user_id);

    const response = filters.reduce((acc: any, filter) => {
      if (acc[filter.name]) {
        if (!acc[filter.name].values.includes(filter.value)) {
          acc[filter.name].values.push(filter.value);
        }
      } else {
        acc[filter.name] = {
          name: filter.name,
          values: [filter.value],
        };
      }

      return acc;
    }, {});

    return response;
  }
}

export default ListFavoritesService;
