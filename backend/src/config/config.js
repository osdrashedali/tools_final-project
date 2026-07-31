import dotenv from 'dotenv';
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,

};

if (!config.MONGO_URI) {
  throw new Error('MONGO_URI is missing in .env file');
}



export default config;
