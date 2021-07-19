import FakeFavoritesRepository from '../repositories/fakes/FakeFavoritesRepository';
import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository';
import CreateFavoriteService from './CreateFavoriteService';
import FakeFiltersRepository from '@modules/filters/repositories/fakes/FakeFiltersRepository';

let fakeFavoritesRepository: FakeFavoritesRepository;
let fakeItemsRepository: FakeItemsRepository;
let fakeFiltersRepository: FakeFiltersRepository;
let createFavorite: CreateFavoriteService;

describe('CreateFavorite', () => {
  beforeEach(() => {
    fakeFavoritesRepository = new FakeFavoritesRepository();
    fakeItemsRepository = new FakeItemsRepository();
    fakeFiltersRepository = new FakeFiltersRepository();
    createFavorite = new CreateFavoriteService(
      fakeFavoritesRepository,
      fakeItemsRepository,
      fakeFiltersRepository,
    );
  });

  it('should be able to favorite item', async () => {
    const favorite = await createFavorite.execute({
      user_id: 'user_id',
      item: {
        api_type: 'ArtInstituteChicagoApi',
        original_id: '123',
        title: 'Teste',
        image_url: 'teste.jpg',
        image_preview: '',
      },
      filters: [],
    });

    expect(favorite).toHaveProperty('id');
  });
});
