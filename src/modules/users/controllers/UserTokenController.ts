import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import ResetPasswordService from '../services/ResetPasswordService';

export default class UserTokenController {
  public async post(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmail.execute({ email });

    return response.status(204).json();
  }

  public async put(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
