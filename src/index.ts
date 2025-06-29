import os from 'os';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

export default app;
