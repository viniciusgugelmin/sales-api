import AppError from '@shared/errors/AppError';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import { UserTokensRepositories } from '@modules/users/typeorm/repositories/UserTokensRepositories';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { Request } from 'express';

interface IRequest {
  email: string;
  request: Request;
}

class SendForgotPasswordEmailService {
  public async execute({ email, request }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`User does not exists`);
    }

    const userTokensRepositories = getCustomRepository(UserTokensRepositories);
    const { token } = await userTokensRepositories.generate(user.id);
    const userForgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'user_forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[SALES API] Password recover',
      templateData: {
        file: userForgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://${request.headers.host}/reset-password?t=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
