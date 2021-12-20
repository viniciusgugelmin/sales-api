import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserTokenController from '@modules/users/controllers/UserTokenController';

const userTokenRouter = Router();
const userTokenController = new UserTokenController();

userTokenRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  userTokenController.post,
);

userTokenRouter.put(
  '/reset-password',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  userTokenController.put,
);

export default userTokenRouter;
