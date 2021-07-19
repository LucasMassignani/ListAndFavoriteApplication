import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import ItemsRepository from '@modules/items/infra/typeorm/repositories/ItemsRepository';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import FavoritesRepository from '@modules/favorites/infra/typeorm/repositories/FavoritesRepository';
import FiltersRepository from '@modules/filters/infra/typeorm/repositories/FiltersRepository';
import IFiltersRepository from '@modules/filters/repositories/IFiltersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<IFavoritesRepository>(
  'FavoritesRepository',
  FavoritesRepository,
);

container.registerSingleton<IFiltersRepository>(
  'FiltersRepository',
  FiltersRepository,
);
