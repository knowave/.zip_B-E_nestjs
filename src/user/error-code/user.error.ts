import { CommonError } from 'src/error/error.interface';

export const USER_NOT_FOUND: CommonError = {
  code: 'USER_NOT_FOUND',
  message: '존재하는 사용자가 없습니다.',
};

export const EXIST_EMAIL_BAD_REQUEST: CommonError = {
  code: 'EXIST_EMAIL_BAD_REQUEST',
  message: '다름 이메일을 사용해주세요.',
};
