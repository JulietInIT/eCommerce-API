import '#db';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from '#routes';
import { errorHandler, notFoundHandler } from '#middlewares';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cookieParser());

app.use('/auth', authRouter);

app.use('*splat', notFoundHandler);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[31mServer listening at http://localhost:${port}\x1b[0m`)
);
