import { CheckPasswordBody } from '../dto/request/check-password.req';

export type CheckPasswordReqType = {
    userId: string;
    body: CheckPasswordBody;
};
