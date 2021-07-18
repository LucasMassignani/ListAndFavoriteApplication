import FakeFavoritesRepository from '../repositories/fakes/FakeFavoritesRepository';
import ListFavoritesService from './ListFavoritesService';

let fakeFavoritesRepository: FakeFavoritesRepository;
let listProviderAppointments: ListFavoritesService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeFavoritesRepository = new FakeFavoritesRepository();

    listProviderAppointments = new ListFavoritesService(
      fakeFavoritesRepository,
    );
  });

  it('should be able to list all favorites', async () => {
    const favorite = await fakeFavoritesRepository.create({
      user_id: 'user_id',
      item_id: 'item_id',
    });

    const favorite2 = await fakeFavoritesRepository.create({
      user_id: 'user_id',
      item_id: 'item_id2',
    });

    const appointments = await listProviderAppointments.execute({
      user_id: 'user_id',
    });

    expect(appointments).toEqual([favorite, favorite2]);
  });
});
