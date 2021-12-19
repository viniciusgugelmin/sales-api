import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersControllers from '@modules/users/controllers/UsersControllers';
import productsRouter from '@modules/products/routes/products.routes';

const usersRouter = Router();
const usersController = new UsersControllers();

usersRouter.get('/', usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required,
    },
  }),
  usersController.post,
);

export default usersRouter;
