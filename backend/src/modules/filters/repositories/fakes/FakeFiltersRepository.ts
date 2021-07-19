import { v4 } from 'uuid';

import IFiltersRepository from '@modules/filters/repositories/IFiltersRepository';
import ICreateFilterDTO from '@modules/filters/dtos/ICreateFilterDTO';

import Filter from '../../infra/typeorm/entities/Filter';

class FakeFiltersRepository implements IFiltersRepository {
  private filters: Filter[] = [];

  public async findById(id: string): Promise<Filter | undefined> {
    const findFilter = this.filters.find(filter => filter.id === id);

    return findFilter;
  }

  public async create(filterData: ICreateFilterDTO): Promise<Filter> {
    const filter = new Filter();

    Object.assign(filter, { id: v4() }, filterData);

    this.filters.push(filter);

    return filter;
  }

  public async createList(filtersData: ICreateFilterDTO[]): Promise<Filter[]> {
    const newFilters: Filter[] = [];
    filtersData.map(filterData => {
      const filter = new Filter();

      Object.assign(filter, { id: v4() }, filterData);
      newFilters.push(filter);
      this.filters.push(filter);
    });

    return newFilters;
  }

  public async save(filter: Filter): Promise<Filter> {
    const findIndex = this.filters.findIndex(
      findFilter => findFilter.id === filter.id,
    );

    this.filters[findIndex] = filter;

    return filter;
  }
}

export default FakeFiltersRepository;
