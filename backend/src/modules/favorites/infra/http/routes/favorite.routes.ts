import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import FavoritesController from '../controllers/FavoritesController';

const favoritesRouter = Router();
const favoritesController = new FavoritesController();

favoritesRouter.use(ensureAuthenticated);

favoritesRouter.get('/', favoritesController.index);

favoritesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      item: Joi.object({
        api_type: Joi.string().required(),
        original_id: Joi.string().required(),
        title: Joi.string().required(),
        image_url: Joi.string().required(),
        image_preview: Joi.string().allow(''),
      }).required(),
    },
  }),
  favoritesController.create,
);

favoritesRouter.delete(
  '/:item_id',
  celebrate({
    [Segments.PARAMS]: {
      item_id: Joi.string().required(),
    },
  }),
  favoritesController.delete,
);

export default favoritesRouter;
