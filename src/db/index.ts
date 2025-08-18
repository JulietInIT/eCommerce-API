import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

try {
  const client = await mongoose.connect(MONGO_URI as string, {
    dbName: DB_NAME,
  });
  console.log(
    `\x1b[35mconnected to Mongo DB: ${client.connection.db?.databaseName}\x1b[0m`
  );
} catch (error) {
  console.error('MongoDB connection error', error);
  process.exit(1);
}