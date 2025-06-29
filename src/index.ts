import express, { type Request, type Response, type Application } from 'express';
import os from 'os';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
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
