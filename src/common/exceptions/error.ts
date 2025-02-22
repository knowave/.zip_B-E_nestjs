import { HttpException } from '@nestjs/common';

export interface Error {
    code: string;
    message: string;
    statusCode: number;
    data?: any;
}

export class BaseException extends HttpException {
    code: string;
    data?: any;

    constructor(error: Error) {
        super(error.message, error.statusCode);
        this.code = error.code;
        this.data = error.data;
    }
}
