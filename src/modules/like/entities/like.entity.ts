import { User } from 'src/modules/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @ManyToOne(() => User, (user) => user.likeList)
  user: User;
}
