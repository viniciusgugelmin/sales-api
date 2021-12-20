import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

export default class UserAvatarController {
  public async put(request: Request, response: Response): Promise<Response> {
    if (!request.file?.filename) {
      throw new AppError('File not sent');
    }

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}
