import { OmitType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class CreateUserBody extends OmitType(User, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'isDeleted',
    'token',
    'commentList',
    'likeList',
]) {}
