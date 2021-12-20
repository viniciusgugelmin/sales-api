import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/user.routes';
import userSessionsRouter from '@modules/users/routes/user.sessions.routes';
import userAvatarRouter from '@modules/users/routes/user.avatar.routes';
import userTokenRouter from '@modules/users/routes/user.token.routes';

const routes = Router();

/* PRODUCTS */
routes.use('/products', productsRouter);
/* USERS */
routes.use('/users', usersRouter);
routes.use('/users/sessions', userSessionsRouter);
routes.use('/users/avatar', userAvatarRouter);
routes.use('/users/token', userTokenRouter);

export default routes;
