import console from 'console';
import process from 'process';

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`app started on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error('failed to running app', error);
    process.exit(1);
  }
}

startServer();
