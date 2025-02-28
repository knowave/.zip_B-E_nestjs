import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import { CreatePublicApartmentCommentBody } from './dto/request/create-public-apartment-comment.req';
import { UserService } from '../user/user.service';
import { PublicApartmentService } from '../public-apartment/public-apartment.service';
import { BAD_REQUEST_ERROR } from 'src/common/exceptions/error-code/bad-request.error';
import { PrivateApartmentService } from '../private-apartment/private-apartment.service';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly userService: UserService,
        private readonly publicApartmentService: PublicApartmentService,
        private readonly privateApartmentService: PrivateApartmentService,
    ) {}

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

    async createPublicApartmentComment({
        body: { content, isPrivate },
        userId,
        publicApartmentId,
    }: {
        body: CreatePublicApartmentCommentBody;
        userId: string;
        publicApartmentId: string;
    }) {
        const user = await this.userService.getUserById(userId);
        const publicApartment = await this.publicApartmentService.getPublicApartmentById(publicApartmentId);

        if (content.length > 600) throw new BaseException(BAD_REQUEST_ERROR.INVALID_COMMENT_CONTENT);

        const createComment = this.commentRepository.create({ content, isPrivate, user, publicApartment });
        await this.commentRepository.save(createComment);
        await this.publicApartmentService.incrementCommentCount(publicApartment.id);
    }

    async createPrivateApartmentComment({
        body: { content, isPrivate },
        userId,
        privateApartmentId,
    }: {
        body: CreatePublicApartmentCommentBody;
        userId: string;
        privateApartmentId: string;
    }) {
        const user = await this.userService.getUserById(userId);
        const privateApartment = await this.privateApartmentService.getPrivateApartmentById(privateApartmentId);

        if (content.length > 600) throw new BaseException(BAD_REQUEST_ERROR.INVALID_COMMENT_CONTENT);

        const createComment = this.commentRepository.create({ content, isPrivate, user, privateApartment });
        await this.commentRepository.save(createComment);
        await this.privateApartmentService.incrementCommentCount(privateApartmentId);
    }
}
