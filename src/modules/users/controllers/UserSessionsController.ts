import { Request, Response } from 'express';
import CreateUserSessionsService from '@modules/users/services/CreateUserSessionsService';

export default class UserSessionsController {
  public async post(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUserSession = new CreateUserSessionsService();
    const { user } = await createUserSession.execute({ email, password });

    return response.json({
      user,
    });
  }
}
