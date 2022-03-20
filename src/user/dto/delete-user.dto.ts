import { ApiProperty } from '@nestjs/swagger';
import { IUserCretendials } from 'src/middlewares/authentication.middleware';

export class DeleteUserDTO {
  @ApiProperty()
  password: string;

  credentials: IUserCretendials;
}
