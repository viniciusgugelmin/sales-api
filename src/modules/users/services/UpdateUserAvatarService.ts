import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '@config/uploads';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
