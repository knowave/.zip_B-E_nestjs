import { PickType } from '@nestjs/swagger';
import { Comment } from '../../entities/comment.entity';

export class CreateCommentBody extends PickType(Comment, ['content', 'isPrivate']) {}
