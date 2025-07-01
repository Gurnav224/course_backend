import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import os from 'os';
import cors from 'cors';
import courseRouter from './routes/course.routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.get('/', (_req: Request, res: Response) => {
  const serverDetails = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: os.uptime(),
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
    },
  };
  res.status(200).json({ message: 'The app is running', server: serverDetails });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'server health information' });
});

// course api routes

app.use('/api/v1', courseRouter);

export default app;
