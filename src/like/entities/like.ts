import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PrivateApt } from 'src/private-apt/entities/private-apt.entity';

@Entity({ name: 'likes' })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  likeId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => PrivateApt, { onDelete: 'CASCADE' })
  privateApt: PrivateApt;
}
