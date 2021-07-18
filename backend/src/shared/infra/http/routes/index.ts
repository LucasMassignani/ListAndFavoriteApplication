import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import favoritesRouter from '@modules/favorites/infra/http/routes/favorite.routes';
import favoriteCheckRouter from '@modules/favorites/infra/http/routes/favoriteCheck.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/favorites', favoritesRouter);
routes.use('/favorite-check', favoriteCheckRouter);

export default routes;
