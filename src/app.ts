import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config';
import helmet from 'helmet';

// Routes
import { router as homeHealthRouter } from './routes/homeHealth.route';
import { router as authRouter } from "./routes/auth.route";

const app = express();
const HOST_FRONT_END = config.get('HOST_FRONT_END');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin: HOST_FRONT_END,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Routes
app.use('/', homeHealthRouter);
app.use('/api/v1/auth', authRouter);

export { app };
