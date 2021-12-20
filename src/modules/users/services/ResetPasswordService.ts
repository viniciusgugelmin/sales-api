import AppError from '@shared/errors/AppError';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import { UserTokensRepositories } from '@modules/users/typeorm/repositories/UserTokensRepositories';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const userTokensRepositories = getCustomRepository(UserTokensRepositories);

    const userToken = await userTokensRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError(`User token does not exist`);
    }

    const user = await usersRepository.findOne(userToken.user_id);

    if (!user) {
      throw new AppError(`User does not exist`);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await usersRepository.generatePassword(password);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
