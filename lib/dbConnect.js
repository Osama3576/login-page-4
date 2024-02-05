import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('please define the mongo_db url');
}

async function dbConnect() {
  return mongoose.connect(MONGODB_URI);
}

export default dbConnect;
