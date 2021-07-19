import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import FiltersController from '../controllers/FiltersController';

const filtersRouter = Router();
const filtersController = new FiltersController();

filtersRouter.use(ensureAuthenticated);

filtersRouter.get('/', filtersController.index);

export default filtersRouter;
