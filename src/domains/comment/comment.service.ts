import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

    async getCommentById(id: string) {
        const comment = await this.commentRepository.findOneById(id);

        if (!comment) throw new BaseException(NOT_FOUND_ERROR.COMMENT);

        return comment;
    }

    async incrementCommentCount(id: string) {
        await this.commentRepository.incrementCommentCount(id);
    }

    async decrementCommentCount(id: string) {
        await this.commentRepository.decrementCommentCount(id);
    }
}
