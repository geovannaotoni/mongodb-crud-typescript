import { connect } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  MONGO_USERNAME: process.env.MONGO_USERNAME || 'root',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'example',
  MONGO_HOSTNAME: process.env.MONGO_HOSTNAME || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || '27017',
  MONGO_DB: process.env.MONGO_DB || 'mydatabase',
};
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = dbConfig;

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

async function connectToMongoDB() {
  try {
    await connect(uri);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro de conexão com o MongoDB:', error);
  }
}

export default connectToMongoDB;