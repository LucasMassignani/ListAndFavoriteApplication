import FakeFavoritesRepository from '@modules/favorites/repositories/fakes/FakeFavoritesRepository';
import ListFiltersService from './ListFiltersService';

let fakeFavoritesRepository: FakeFavoritesRepository;
let listFilters: ListFiltersService;

describe('ListFiltersService', () => {
  beforeEach(() => {
    fakeFavoritesRepository = new FakeFavoritesRepository();

    listFilters = new ListFiltersService(fakeFavoritesRepository);
  });

  it('should be able to list user filters', async () => {
    const listItems = await listFilters.execute({
      user_id: 'user_id',
    });

    expect(listItems).toEqual({});
  });
});
