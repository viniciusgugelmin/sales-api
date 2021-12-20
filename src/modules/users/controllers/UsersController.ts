import { Request, Response } from 'express';
import ListUserService from '@modules/users/services/ListListService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return response.json(users);
  }

  public async post(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
