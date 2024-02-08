import { CommonError } from 'src/error/error.interface';

export const USER_NOT_EXIST_TOKEN: CommonError = {
  code: 'USER_NOT_EXIST_TOKEN',
  message: '토큰이 존재하지 않습니다.',
};

export const AUTH_INVALID_TOKEN: CommonError = {
  code: 'AUTH_INVALID_TOKEN',
  message: '유효하지 않은 토큰입니다.',
};

export const AUTH_JWT_EXPIRED: CommonError = {
  code: 'AUTH_JWT_EXPIRED',
  message: '토큰이 만료되었습니다.',
};

export const AUTH_PERMISSION_DENIED: CommonError = {
  code: 'PERMISSION_DENIED',
  message: '잘못된 경로입니다.',
};

export const USER_NOT_EXIST_REFRESH_TOKEN: CommonError = {
  code: 'USER_NOT_EXIST_REFRESH_TOKEN',
  message: 'RefreshToken이 존재하지 않습니다.',
};
