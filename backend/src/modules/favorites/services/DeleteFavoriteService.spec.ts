import FakeFavoritesRepository from '../repositories/fakes/FakeFavoritesRepository';
import DeleteFavoriteService from './DeleteFavoriteService';

let fakeFavoritesRepository: FakeFavoritesRepository;
let deleteFavorite: DeleteFavoriteService;

describe('DeleteFavorite', () => {
  beforeEach(() => {
    fakeFavoritesRepository = new FakeFavoritesRepository();

    deleteFavorite = new DeleteFavoriteService(fakeFavoritesRepository);
  });

  it('should be able to delete favorite', async () => {
    fakeFavoritesRepository.create({
      user_id: 'user_id',
      item_id: 'item_id',
    });

    await deleteFavorite.execute({
      user_id: 'user_id',
      item_id: 'item_id',
    });

    const checkIfFavoriteExist =
      await fakeFavoritesRepository.findByUserIdAndItemId('user_id', 'item_id');
    expect(checkIfFavoriteExist).toBeUndefined();
  });
});
