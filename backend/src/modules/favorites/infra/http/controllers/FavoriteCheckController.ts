import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowFavoriteService from '@modules/favorites/services/ShowFavoriteService';

export default class FavoriteCheckController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showFavoriteService = container.resolve(ShowFavoriteService);
    const favorite = await showFavoriteService.execute({
      user_id: request.user.id,
      original_id: request.params.original_id,
      api_type: request.params.api_type,
    });
    return response.json(favorite);
  }
}
