import 'dotenv/config';

export const DATABASE_HOST = process.env.DATABASE_HOST as string;
export const DATABASE_PORT = process.env.DATABASE_PORT as string;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
export const DATABASE_NAME = process.env.DATABASE_NAME as string;

export const PORT = process.env.PORT as string;
export const NODE_ENV = process.env.NODE_ENV as string;

export const JWT_ACCESS_TOKEN_SECRET = process.env
  .JWT_ACCESS_TOKEN_SECRET as string;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env
  .JWT_ACCESS_TOKEN_EXPIRATION_TIME as string;
