import { User } from 'src/domains/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @ManyToOne(() => User, (user) => user.likeList)
  user: User;
}
