import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError(`Email address '${email}' already used`);
    }

    const hashedPassword = await usersRepository.generatePassword(password);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
