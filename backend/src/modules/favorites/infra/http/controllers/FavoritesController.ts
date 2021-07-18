import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListFavoritesService from '@modules/favorites/services/ListFavoritesService';
import CreateFavoriteService from '@modules/favorites/services/CreateFavoriteService';
import DeleteFavoriteService from '@modules/favorites/services/DeleteFavoriteService';

export default class FavoritesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listFavoritesService = container.resolve(ListFavoritesService);
    const favorites = await listFavoritesService.execute({
      user_id: request.user.id,
    });
    return response.json(favorites);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createFavoriteService = container.resolve(CreateFavoriteService);
    const favorites = await createFavoriteService.execute({
      user_id: request.user.id,
      item: request.body.item,
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
