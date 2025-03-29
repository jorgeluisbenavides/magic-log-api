import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor() {}

  use(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}