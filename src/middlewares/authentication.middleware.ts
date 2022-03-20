import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import HttpException from 'src/utils/Exception';

export interface IUserCretendials {
  id: string;
  email: string;
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        status: 'error.unauthorizated',
        message: 'Missing authorization token',
      });
    }

    const [bearer, token] = authorization.split(' ');

    if (!bearer || bearer !== 'Bearer' || !token) {
      console.log('primeiro');

      return res.status(401).json({
        status: 'error.unauthorizated',
        message: 'Invalid token',
      });
    }

    verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'error.unauthorizated',
          message: 'Invalid token',
        });
      }

      req.body.credentials = decoded;

      next();
    });
  }
}
