import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListFavoriteItemsService from '@modules/favorites/services/ListFavoriteItemsService';
import CreateFavoriteService from '@modules/favorites/services/CreateFavoriteService';
import DeleteFavoriteService from '@modules/favorites/services/DeleteFavoriteService';

export default class FavoritesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, limit, listFilterValue } = request.query as any;

    const listFavoriteItemsService = container.resolve(
      ListFavoriteItemsService,
    );
    const favorites = await listFavoriteItemsService.execute({
      user_id: request.user.id,
      page,
      limit,
      listFilterValue: listFilterValue
        ? JSON.parse(listFilterValue)
        : undefined,
    });
    return response.json(favorites);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createFavoriteService = container.resolve(CreateFavoriteService);
    const favorites = await createFavoriteService.execute({
      user_id: request.user.id,
      item: request.body.item,
      filters: request.body.filters,
    });
    return response.json(favorites);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteFavoriteService = container.resolve(DeleteFavoriteService);
    const favorites = await deleteFavoriteService.execute({
      user_id: request.user.id,
      item_id: request.params.item_id,
    });
    return response.json(favorites);
  }
}
