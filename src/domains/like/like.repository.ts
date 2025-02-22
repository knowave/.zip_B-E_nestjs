import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeRepository extends Repository<Like> {
    constructor(private readonly dataSource: DataSource) {
        super(Like, dataSource.createEntityManager());
    }

    findOneByUserIdAndCommentId(userId: string, commentId: string) {
        return this.findOne({
            where: { user: { id: userId }, comment: { id: commentId } },
        });
    }
}
