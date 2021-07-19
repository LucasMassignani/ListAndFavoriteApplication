import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository';
import FakeFavoritesRepository from '../repositories/fakes/FakeFavoritesRepository';
import ShowFavoriteService from './ShowFavoriteService';

let fakeFavoritesRepository: FakeFavoritesRepository;
let fakeItemsRepository: FakeItemsRepository;
let showFavorite: ShowFavoriteService;

describe('ShowFavoriteService', () => {
  beforeEach(() => {
    fakeFavoritesRepository = new FakeFavoritesRepository();
    fakeItemsRepository = new FakeItemsRepository();

    showFavorite = new ShowFavoriteService(
      fakeFavoritesRepository,
      fakeItemsRepository,
    );
  });

  it('should be able to find Favorite', async () => {
    const item = await fakeItemsRepository.create({
      api_type: 'teste',
      original_id: 'original_id',
      image_url: '',
      title: '',
    });

    const favorite = await fakeFavoritesRepository.create({
      user_id: 'user_id',
      item_id: item.id,
    });

    const findFavorite = await showFavorite.execute({
      user_id: 'user_id',
      api_type: 'teste',
      original_id: 'original_id',
    });

    expect(findFavorite).toEqual(favorite);
  });
});
