import { CommonError } from 'src/error/error.interface';

export const USER_NOT_FOUND: CommonError = {
  code: 'USER_NOT_FOUND',
  message: '존재하는 사용자가 없습니다.',
};
