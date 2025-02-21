import { User } from 'src/modules/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
  @ManyToOne(() => User, (user) => user.commentList)
  user: User;
}
