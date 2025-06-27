import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import route from './routes.ts/route';
const app = express();
const port = config.get<number>('port');

app.use(express.json());
app.listen(port,async () => {
  logger.info(`Server is running on port ${port}`);

    await connect();
    route(app);
    logger.info(`Connected to the database and routes are set up`);
}); 