import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import bookRoutes from './routes/book.routes';
import borrowerRoutes from './routes/borrower.routes';
import borrowingRoutes from './routes/borrowing.routes';
import dashboardRoutes from './routes/dashboard.routes';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Library Management System API');
});

app.use('/users', userRoutes);
app.use('/books/', bookRoutes);
app.use('/borrowings', borrowingRoutes);
app.use('/borrowers', borrowerRoutes);
app.use('/dashboard', dashboardRoutes);

export default app;
