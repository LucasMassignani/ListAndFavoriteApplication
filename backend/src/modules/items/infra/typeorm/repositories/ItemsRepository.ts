import { getRepository, Repository } from 'typeorm';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';

import Item from '../entities/Item';
import IItemDTO from '@modules/items/dtos/IItemDTO';

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async findById(id: string): Promise<Item | undefined> {
    const item = await this.ormRepository.findOne(id);

    return item;
  }

  public async findByItem(itemDTO: IItemDTO): Promise<Item | undefined> {
    const item = await this.ormRepository.findOne({
      where: {
        original_id: itemDTO.original_id,
        api_type: itemDTO.api_type,
      },
    });

    return item;
  }

  public async create(itemData: ICreateItemDTO): Promise<Item> {
    const item = this.ormRepository.create(itemData);

    await this.ormRepository.save(item);

    return item;
  }

  public async save(item: Item): Promise<Item> {
    const saveItem = await this.ormRepository.save(item);
    return saveItem;
  }
}

export default ItemsRepository;
