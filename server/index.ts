import { createServer as createHttpsServer } from 'https';
import { createServer as createHttpServer } from 'http';
import { resolve } from 'path';
import * as express from 'express';
import { readFileSync } from 'fs-extra';

import router from './routes';

const app = express();

app.use('/', router);
app.use('/dist', express.static('dist'));

const httpServer = createHttpServer(app);
const httpsServer = createHttpsServer({
    key: readFileSync(resolve(__dirname, '..', 'keys', 'server.key'), 'utf8'),
    cert: readFileSync(resolve(__dirname, '..', 'keys', 'server.crt'), 'utf8'),
    requestCert: false,
    rejectUnauthorized: false
}, app);

const HTTP_PORT = 8081;
const HTTPS_PORT = 8443;

/* eslint-disable no-console */
httpServer.listen(HTTP_PORT, () => {
    console.log('http server is listening on', HTTP_PORT);
});

httpsServer.listen(HTTPS_PORT, () => {
    console.log('https server is listening on', HTTPS_PORT);
});
