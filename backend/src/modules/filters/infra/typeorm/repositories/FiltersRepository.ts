import { getRepository, Repository } from 'typeorm';

import IFiltersRepository from '@modules/filters/repositories/IFiltersRepository';
import ICreateFilterDTO from '@modules/filters/dtos/ICreateFilterDTO';

import Filter from '../entities/Filter';

class FiltersRepository implements IFiltersRepository {
  private ormRepository: Repository<Filter>;

  constructor() {
    this.ormRepository = getRepository(Filter);
  }

  public async findById(id: string): Promise<Filter | undefined> {
    const filter = await this.ormRepository.findOne(id);

    return filter;
  }

  public async create(filterData: ICreateFilterDTO): Promise<Filter> {
    const filter = this.ormRepository.create(filterData);

    await this.ormRepository.save(filter);

    return filter;
  }

  public async createList(filterData: ICreateFilterDTO[]): Promise<Filter[]> {
    const filter = this.ormRepository.create(filterData);

    await this.ormRepository.save(filter);

    return filter;
  }

  public async save(filter: Filter): Promise<Filter> {
    const saveFilter = await this.ormRepository.save(filter);
    return saveFilter;
  }
}

export default FiltersRepository;
