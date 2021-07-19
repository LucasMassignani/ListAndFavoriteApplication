import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository';
import ListFavoriteItemsService from './ListFavoriteItemsService';

let fakeItemsRepository: FakeItemsRepository;
let listFavoriteItems: ListFavoriteItemsService;

describe('ListFavoriteItemsService', () => {
  beforeEach(() => {
    fakeItemsRepository = new FakeItemsRepository();

    listFavoriteItems = new ListFavoriteItemsService(fakeItemsRepository);
  });

  it('should be able to list Favorite items', async () => {
    const listItems = await listFavoriteItems.execute({
      user_id: 'user_id',
      limit: 20,
      page: 1,
      listFilterValue: [],
    });

    expect(listItems.pagination.totalRegisters).toEqual(1);
    expect(listItems.list).toEqual([]);
  });
});
