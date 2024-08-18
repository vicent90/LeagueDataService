import * as envalid from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const { port, str } = envalid;

const env = envalid.cleanEnv(process.env, {
  SERVER_PORT: port({ default: 4000 }),
  MONGO_PORT: port({ default: 27017 }),
  MONGO_URL: str({ default: "localhost" }),
  MONGO_COLLECTION_NAME: str({ default: "league-data" }),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  MONGO_CONTAINER_NAME: str(),
  REDIS_CONTAINER_NAME: str(),
  REDIS_URL: str({ default: "localhost" }),
  REDIS_PORT: port({ default: 6379 }),
  FOOTBAL_API_KEY: str(),
  FOOTBAL_API_URL: str(),
});

const config = {
  serverPort: env.SERVER_PORT,
  mongoPort: env.MONGO_PORT,
  mongoUrl: env.MONGO_URL,
  mongoCollectionName: env.MONGO_COLLECTION_NAME,
  mongoUsername: env.MONGO_INITDB_ROOT_USERNAME,
  mongoPassword: env.MONGO_INITDB_ROOT_PASSWORD,
  mongoContainerName: env.MONGO_CONTAINER_NAME,
  redisContainerName: env.REDIS_CONTAINER_NAME,
  redisPort: env.REDIS_PORT,
  redisUrl: env.REDIS_URL,
  footballApiKey: env.FOOTBAL_API_KEY,
  footballApiUrl: env.FOOTBAL_API_URL,
};

export default config;
