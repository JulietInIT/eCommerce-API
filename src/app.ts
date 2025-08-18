import '#db';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cookieParser());

app.listen(port, () =>
  console.log(`\x1b[31mServer listening at http://localhost:${port}\x1b[0m`)
);