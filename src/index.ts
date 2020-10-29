import express from 'express';
import compression from 'compression';
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import redis from '../config/redis';
import { setInitialSupportedCurrencies } from '../config/initializationProcedures';
import routes from './routes';

const { NODE_ENV = 'development', PORT, REDIS_HOST, REDIS_PASSWORD } = process.env;

const app = express();

redis.configure({host: REDIS_HOST, password: REDIS_PASSWORD});

app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

morganBody(app, { prettify: NODE_ENV === 'development' });

app.use(routes);

setInitialSupportedCurrencies().then(result => {
    console.info(`${result} currencies were added on initializing.`);

    const port = PORT || 8080;

    app.listen({ port }, () => {
        console.info(`Server running on port ${port}`);
    });
}).catch(err => {
    console.log(`Error while trying to set add initial currencies. Error: ${err}.`);
});