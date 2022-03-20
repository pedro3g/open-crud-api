import { ApiProperty } from '@nestjs/swagger';
import { IUserCretendials } from 'src/middlewares/authentication.middleware';

export class UpdateUserDTO {
  @ApiProperty()
  name?: string;

  credentials: IUserCretendials;
}
