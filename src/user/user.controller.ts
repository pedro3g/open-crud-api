import { Body, Controller, Post, Put } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import HttpException from 'src/utils/Exception';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() { name, email, password }: CreateUserDTO) {
    if (!name || !email || !password) {
      throw new HttpException(
        {
          status: 'error.invalidParameters',
        },
        400,
      );
    }

    if (await this.userService.findByEmail(email)) {
      throw new HttpException(
        {
          status: 'error.userAlreadyExists',
        },
        400,
      );
    }

    const user = await this.userService.create({ name, email, password });

    return {
      user,
      token: sign({ id: user.id, email: user.email }, process.env.JWT_KEY),
    };
  }
}
