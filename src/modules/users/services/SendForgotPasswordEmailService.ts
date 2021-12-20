import AppError from '@shared/errors/AppError';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import { UserTokensRepositories } from '@modules/users/typeorm/repositories/UserTokensRepositories';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`User does not exists`);
    }

    const userTokensRepositories = getCustomRepository(UserTokensRepositories);
    const token = await userTokensRepositories.generate(user.id);
  }
}

export default SendForgotPasswordEmailService;
