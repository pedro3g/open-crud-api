import { IUserCretendials } from 'src/middlewares/authentication.middleware';

export class UpdateUserDTO {
  name?: string;
  credentials: IUserCretendials;
}
