import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/user.routes';
import userSessionsRouter from '@modules/users/routes/user.sessions.routes';

const routes = Router();

/* PRODUCTS */
routes.use('/products', productsRouter);
/* USERS */
routes.use('/users', usersRouter);
routes.use('/users/sessions', userSessionsRouter);

export default routes;
