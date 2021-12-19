import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersControllers from '@modules/users/controllers/UsersControllers';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersControllers();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.post,
);

export default usersRouter;
