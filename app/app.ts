import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './elephantsql';
import userRouter from './routes/userRoutes';
import skillsRouter from './routes/skillsRoutes';
const app: Application = express();

// app.use(express.json());

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('Hello');
// });

// app.use('/users', userRouter);
// app.use('/skills', skillsRouter);

// const PORT = process.env.PORT || 3000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//   });
// });

export default app;