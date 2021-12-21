import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '@modules/users/typeorm/repositories/UsersRepositories';
import User from '@modules/users/typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepositories);

    return await usersRepository.find();
  }
}

export default ListUserService;
