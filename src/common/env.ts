import 'dotenv/config';

export const DATABASE_HOST = process.env.DATABASE_HOST as string;
export const DATABASE_PORT = process.env.DATABASE_PORT as string;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
export const DATABASE_NAME = process.env.DATABASE_NAME as string;

export const PORT = process.env.PORT as string;
export const NODE_ENV = process.env.NODE_ENV as string;

export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME as string;

export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME as string;

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;
export const REGION = process.env.REGION as string;
export const AWS_ACCESS = process.env.AWS_ACCESS as string;
export const AWS_SECRET = process.env.AWS_SECRET as string;

export const KAKAO_CALLBACK_URL = process.env.KAKAO_CALLBACK_URL as string;
export const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID as string;

export const NAVER_CALLBACK_URL = process.env.NAVER_CALLBACK_URL as string;
export const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID as string;
export const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET as string;

export const MONGO_URI = process.env.MONGO_URI as string;
export const REDIS_HOST = process.env.REDIS_HOST as string;
export const REDIS_PORT = process.env.REDIS_PORT as string;

export const APT_API_SECRET_KEY = process.env.APT_API_SECRET_KEY as string;
export const ORIGIN_URL = process.env.ORIGIN_URL as string;
