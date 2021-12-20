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

export default userTokenRouter;
