import { BaseEntity } from 'src/common/base.entity';
import { Comment } from 'src/domains/comment/entities/comment.entity';
import { Apartment } from 'src/domains/apartment/entities/apartment.entity';
import { User } from 'src/domains/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Like extends BaseEntity {
    @ManyToOne(() => User, (user) => user.likeList)
    user: User;

    @ManyToOne(() => Comment, (comment) => comment.likeList)
    comment: Comment;

    @ManyToOne(() => Apartment, (apartment) => apartment.likes)
    apartment: Apartment;
}
