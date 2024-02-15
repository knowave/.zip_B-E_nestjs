import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PrivateApt } from 'src/private-apt/entities/private-apt.entity';
import { PubNotice } from 'src/pub-notice/entities/pub-notice.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  commentId: number;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => PrivateApt, (privateApt) => privateApt.comments, {
    onDelete: 'CASCADE',
  })
  privateApt: PrivateApt;

  @ManyToOne(() => PubNotice, (pubNotice) => pubNotice.likes, {
    onDelete: 'CASCADE',
  })
  pubNotice: PubNotice;
}
