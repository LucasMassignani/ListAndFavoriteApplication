import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListFiltersService from '@modules/filters/services/ListFiltersService';

export default class FiltersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listFiltersService = container.resolve(ListFiltersService);
    const filters = await listFiltersService.execute({
      user_id: request.user.id,
    });
    return response.json(filters);
  }
}
