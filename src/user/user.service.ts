import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import HttpException from 'src/utils/Exception';
import regex from 'src/utils/regex';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

const client = new PrismaClient();

@Injectable()
export class UserService {
  async findByEmail(email: string) {
    return client.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create({ name, email, password }: CreateUserDTO) {
    if (name.length < 3) {
      throw new HttpException({
        status: 'error.invalidParameters',
        message: 'The "name" parameter must be longer than 3 characters',
      });
    } else if (password.length < 6) {
      throw new HttpException({
        status: 'error.invalidParameters',
        message: 'The "password" parameter must be longer than 3 characters',
      });
    } else if (!regex.email.test(email)) {
      throw new HttpException({
        status: 'error.invalidParameters',
        message: 'invalid email format',
      });
    }

    return client.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async update(id: string, { name }: Omit<UpdateUserDTO, 'credentials'>) {
    return client.user.update({
      where: { id },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async delete(id: string) {
    return client.user.delete({
      where: { id },
    });
  }
}
