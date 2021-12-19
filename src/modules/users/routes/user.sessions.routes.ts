import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserSessionsController from '@modules/users/controllers/UserSessionsController';

const userSessionsRouter = Router();
const userSessionsController = new UserSessionsController();

userSessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userSessionsController.post,
);

export default userSessionsRouter;
