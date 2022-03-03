import express, { Request, Response, NextFunction, Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './elephantsql';
import userRouter from './routes/userRoutes';
import skillsRouter from './routes/skillsRoutes';
import AppError from './utils/appError';
dotenv.config({
  path: '../.env',
});

const app: Application = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/users', userRouter);
app.use('/skills', skillsRouter);

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

export default app;
