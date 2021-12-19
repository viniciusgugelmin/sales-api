import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowUserService;
