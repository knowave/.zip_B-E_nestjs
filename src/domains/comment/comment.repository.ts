import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
    constructor(private readonly dataSource: DataSource) {
        super(Comment, dataSource.createEntityManager());
    }

    findOneById(id: string) {
        return this.findOne({ where: { id } });
    }

    async incrementCommentCount(id: string) {
        await this.increment({ id }, 'commentCount', 1);
    }

    async decrementCommentCount(id: string) {
        await this.decrement({ id }, 'commentCount', 1);
    }
}
