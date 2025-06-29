/* eslint-disable no-undef */
import app from '../src/index';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`app started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('failed to running app', error);
    process.exit(1);
  }
}

startServer();
