import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm';
import routes from './routes';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode || 400).json({
      status: 'error',
      message: error.message,
      details: error.details || null
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
