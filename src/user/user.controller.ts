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
      throw new HttpException({
        status: 'error.invalidParameters',
      });
    }

    if (await this.userService.findByEmail(email)) {
      throw new HttpException({
        status: 'error.userAlreadyExists',
      });
    }

    const user = await this.userService.create({ name, email, password });

    return {
      user,
      token: sign({ id: user.id, email: user.email }, process.env.JWT_KEY),
    };
  }

  @Put()
  async update(@Body() { name, credentials }: UpdateUserDTO) {
    if (!name) {
      throw new HttpException({
        status: 'error.invalidParameters',
      });
    }

    if (!(await this.userService.findByEmail(credentials.email))) {
      throw new HttpException({
        status: 'error.userNotFound',
      });
    }

    const userUpdated = await this.userService.update(credentials.id, { name });

    return { userUpdated };
  }
}
