import express from 'express';

import registerRoutes from './lib/registerRoutes';

const app = express();
const port = 3000;

registerRoutes(app).then(() => {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
});
