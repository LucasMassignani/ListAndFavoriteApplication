import { v4 } from 'uuid';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';

import Item from '../../infra/typeorm/entities/Item';
import IItemDTO from '@modules/items/dtos/IItemDTO';
import IFindAllUserFavoriteItemsDTO from '@modules/items/dtos/IFindAllUserFavoriteItemsDTO';

class FakeItemsRepository implements IItemsRepository {
  private items: Item[] = [];

  public async findById(id: string): Promise<Item | undefined> {
    const findItem = this.items.find(item => item.id === id);

    return findItem;
  }

  public async findByItem(itemDTO: IItemDTO): Promise<Item | undefined> {
    const findItem = this.items.find(
      item =>
        item.original_id === itemDTO.original_id &&
        item.api_type === itemDTO.api_type,
    );

    return findItem;
  }

  public async findAllUserFavoriteItems(): Promise<IFindAllUserFavoriteItemsDTO> {
    return {
      list: this.items,
      pagination: {
        totalRegisters: 1,
      },
    };
  }

  public async create(itemData: ICreateItemDTO): Promise<Item> {
    const item = new Item();

    Object.assign(item, { id: v4() }, itemData);

    this.items.push(item);

    return item;
  }

  public async save(item: Item): Promise<Item> {
    const findIndex = this.items.findIndex(findItem => findItem.id === item.id);

    this.items[findIndex] = item;

    return item;
  }
}

export default FakeItemsRepository;
