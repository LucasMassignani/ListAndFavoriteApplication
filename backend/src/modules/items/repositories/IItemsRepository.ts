import Item from '../infra/typeorm/entities/Item';
import ICreateItemDTO from '../dtos/ICreateItemDTO';
import IItemDTO from '../dtos/IItemDTO';

export default interface IItemsRepository {
  findById(id: string): Promise<Item | undefined>;
  findByItem(item: IItemDTO): Promise<Item | undefined>;
  create(data: ICreateItemDTO): Promise<Item>;
  save(item: Item): Promise<Item>;
}
