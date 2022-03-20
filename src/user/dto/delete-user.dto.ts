import { IUserCretendials } from 'src/middlewares/authentication.middleware';

export class DeleteUserDTO {
  password: string;
  credentials: IUserCretendials;
}
