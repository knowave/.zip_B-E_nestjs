import { CreateCommentBody } from '../dto/request/create-comment.req';

export type createApartmentCommentType = {
    body: CreateCommentBody;
    userId: string;
    apartmentId: string;
};
