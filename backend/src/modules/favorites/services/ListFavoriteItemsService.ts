import { injectable, inject } from 'tsyringe';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import Item from '@modules/items/infra/typeorm/entities/Item';

interface IRequest {
  user_id: string;
  limit: number;
  page: number;
  listFilterValue?: any;
}

@injectable()
class ListFavoriteItemsService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    user_id,
    limit,
    page,
    listFilterValue,
  }: IRequest): Promise<{
    list: Item[];
    pagination: { totalRegisters: number };
  }> {
    const items = await this.itemsRepository.findAllUserFavoriteItems(user_id, {
      limit,
      page,
      listFilterValue,
    });
    return items;
  }
}

export default ListFavoriteItemsService;
