/* eslint-disable no-undef */
import app from '../src/index';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app started on http://localhost:${PORT}`);
});
