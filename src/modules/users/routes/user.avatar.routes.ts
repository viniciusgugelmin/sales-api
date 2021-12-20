import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploads';
import UserAvatarController from '@modules/users/controllers/UserAvatarController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';

const userAvatarRouter = Router();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

userAvatarRouter.patch(
  '/',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.put,
);

export default userAvatarRouter;
