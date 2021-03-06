import { EntityRepository, Repository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import { hash } from 'bcryptjs';

@EntityRepository(User)
export class UsersRepositories extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    return await this.findOne({ where: { name: name } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email: email } });
  }

  public async generatePassword(password: string): Promise<string> {
    return await hash(password, 8);
  }
}
