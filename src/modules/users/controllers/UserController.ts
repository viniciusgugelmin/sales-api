import { Request, Response } from 'express';
import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return response.json(users);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const showUser = new ShowUserService();
    const userId = request.user.id;
    const user = await showUser.execute({ id: userId });

    return response.json(user);
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

  public async put(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, old_password } = request.body;
    const updateUser = new UpdateUserService();
    const user = await updateUser.execute({
      id: userId,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
