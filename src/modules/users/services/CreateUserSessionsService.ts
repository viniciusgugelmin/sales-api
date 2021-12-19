import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateUserSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError(`The password or email is invalid`, 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError(`The password or email is invalid`, 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateUserSessionsService;
