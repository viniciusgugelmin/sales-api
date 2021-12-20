import AppError from '@shared/errors/AppError';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import { UserTokensRepositories } from '@modules/users/typeorm/repositories/UserTokensRepositories';
import EtherealMail from '@config/mail/EtherealMail';

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
    const { token } = await userTokensRepositories.generate(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[SALES API] Password recover',
      templateData: {
        template: `Click here to change your password: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
