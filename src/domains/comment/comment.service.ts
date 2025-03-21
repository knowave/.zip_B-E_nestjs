import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import { UserService } from '../user/user.service';
import { ApartmentService } from '../apartment/apartment.service';
import { BAD_REQUEST_ERROR } from 'src/common/exceptions/error-code/bad-request.error';
import { createApartmentCommentType } from './types/create-apartment-comment.type';
import { CreateCommentTypeEnum } from './enums/create-comment-type.enum';
import { Comment } from './entities/comment.entity';
import { GetManyApartmentCommentQuery } from './dto/request/get-many-apartment-comment.req';
import { ApartmentEnum } from './enums/apartment.type.enum';
import { plainToInstance } from 'class-transformer';
import { GetManyApartmentCommentResponse } from './dto/response/get-many-apartment-comment.res';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly userService: UserService,
        private readonly apartmentService: ApartmentService,
    ) {}

    async getCommentById(id: string) {
        const comment = await this.commentRepository.findOneById(id);

        if (!comment) throw new BaseException(NOT_FOUND_ERROR.COMMENT);

        return comment;
    }

    async createApartmentComment({ body, userId, apartmentId }: createApartmentCommentType) {
        if (body.content.length > 600) throw new BaseException(BAD_REQUEST_ERROR.INVALID_COMMENT_CONTENT);

        let createComment: Comment;
        const user = await this.userService.getUserById(userId);
        switch (body.type) {
            case CreateCommentTypeEnum.APT:
                const apartment = await this.apartmentService.getApartmentById(apartmentId);

                createComment = this.commentRepository.create({ ...body, user, apartment });
                await this.commentRepository.save(createComment);
                await this.apartmentService.incrementCommentCount(apartment.id);
                break;
        }
    }

    async getManyApartmentComment({ page, take, ...query }: GetManyApartmentCommentQuery) {
        if (query.type === ApartmentEnum.PUBLIC_APT && !query.publicApartmentId)
            throw new BaseException(BAD_REQUEST_ERROR.INVALID_PUBLIC_APARTMENT);

        if (query.type === ApartmentEnum.PRIVATE_APT && !query.privateApartmentId)
            throw new BaseException(BAD_REQUEST_ERROR.INVALID_PRIVATE_APARTMENT);

        const skip = (page - 1) * take;

        const [commentList, totalCount] = await this.commentRepository.findManyApartmentCommentPagination({
            skip,
            take,
            ...query,
        });

        return plainToInstance(GetManyApartmentCommentResponse, <GetManyApartmentCommentResponse>{
            commentList,
            currentPage: page,
            totalPage: Math.ceil(totalCount / take),
            totalCount,
        });
    }

    async incrementCommentByLikeCount(id: string) {
        await this.commentRepository.increment({ id }, 'likeCount', 1);
    }

    async decrementCommentByLikeCount(id: string) {
        await this.commentRepository.decrement({ id }, 'likeCount', 1);
    }
}
