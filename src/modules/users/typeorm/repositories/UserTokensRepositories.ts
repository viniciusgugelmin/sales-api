import { EntityRepository, Repository } from 'typeorm';
import UserToken from '@modules/users/typeorm/entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepositories extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.findOne({ where: { token: token } });
  }

  public async findByUserId(userId: string): Promise<UserToken | undefined> {
    return await this.findOne({ where: { user_id: userId } });
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = await this.create({
      user_id: userId,
    });

    await this.save(userToken);

    return userToken;
  }
}
