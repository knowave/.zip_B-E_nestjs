import { CreateCommentBody } from '../dto/request/create-comment.req';
import { CreateCommentTypeEnum } from '../enums/create-comment-type.enum';

export type createApartmentCommentType = {
    body: CreateCommentBody;
    userId: string;
    publicApartmentId?: string;
    privateApartmentId?: string;
};
