import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import FavoriteCheckController from '../controllers/FavoriteCheckController';

const favoriteCheck = Router();
const favoriteCheckController = new FavoriteCheckController();

favoriteCheck.use(ensureAuthenticated);

favoriteCheck.get(
  '/:original_id/:api_type',
  celebrate({
    [Segments.PARAMS]: {
      original_id: Joi.string().required(),
      api_type: Joi.string().required(),
    },
  }),
  favoriteCheckController.show,
);

export default favoriteCheck;
