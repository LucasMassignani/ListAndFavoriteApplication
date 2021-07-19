import Filter from '../infra/typeorm/entities/Filter';
import ICreateFilterDTO from '../dtos/ICreateFilterDTO';

export default interface IFiltersRepository {
  findById(id: string): Promise<Filter | undefined>;
  create(data: ICreateFilterDTO): Promise<Filter>;
  createList(data: ICreateFilterDTO[]): Promise<Filter[]>;
  save(item: Filter): Promise<Filter>;
}
