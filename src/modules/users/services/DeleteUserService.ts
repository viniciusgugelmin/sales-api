import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found');
    }

    await usersRepository.remove(user);
  }
}

export default DeleteUserService;
