import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '../../errors/AppError';
import routes from './routes';
import '../typeorm';
import '../../container';

const api = express();
api.use(cors());
api.use(express.json());
api.use(routes);
api.use(errors());
api.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

api.listen(8880, () => console.log('Server listening on port 8880'));
