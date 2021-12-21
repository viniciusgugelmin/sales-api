import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';
import User from '@modules/users/typeorm/entities/User';
import { compare } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && user.email !== email) {
      throw new AppError(`User with email '${email}' already exists`);
    }

    if (password && !old_password) {
      throw new AppError(`Old password is required`);
    }

    if (password && old_password) {
      const passwordConfirmed = await compare(old_password, user.password);

      if (!passwordConfirmed) {
        throw new AppError(`Old password does not match`);
      }

      const hashedPassword = await usersRepository.generatePassword(password);

      Object.assign(user, { password: hashedPassword });
    }

    Object.assign(user, { name, email });

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
