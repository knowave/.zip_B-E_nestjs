import { BaseEntity } from 'src/common/base.entity';
import { Like } from 'src/domains/like/entities/like.entity';
import { User } from 'src/domains/user/entities/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.commentList)
  user: User;

  @OneToMany(() => Like, (like) => like.comment)
  likeList: Like[];
}
