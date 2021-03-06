import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import HttpException from 'src/utils/Exception';
import { CreateUserDTO } from './dto/create-user.dto';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  async get(@Param() params) {
    const user = await this.userService.findById(params.id);

    if (!user) {
      throw new HttpException({ status: 'error.userNotFound' });
    }

    return user;
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a user' })
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
  @ApiOperation({ summary: 'Update a user' })
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

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  async delete(@Body() { password, credentials }: DeleteUserDTO) {
    if (!password) {
      throw new HttpException({ status: 'error.invalidParameters' });
    }

    const user = await this.userService.findByEmail(credentials.email);

    if (!user) {
      throw new HttpException({ status: 'error.userNotFound' });
    }

    if (!compareSync(password, user.password)) {
      throw new HttpException({ status: 'error.invalidPassword' });
    }

    await this.userService.delete(user.id);
  }
}
