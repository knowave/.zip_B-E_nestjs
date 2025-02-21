import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Like } from 'src/modules/like/entities/like.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, comment: '사용자 email' })
  email: string;

  @Column({ type: 'varchar', comment: '사용자 닉네임' })
  nickname: string;

  @Column({ type: 'varchar', nullable: true, comment: '사용자 비밀번호' })
  password: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    comment: '사용자 refresh token',
  })
  token: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '사용자가 관심있는 지역 (시/도)',
  })
  region: string;

  @Column({
    type: 'varchar',
    length: 2048,
    comment: '사용자 프로필 이미지 URL',
    nullable: true,
  })
  imageUrl: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  commentList: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likeList: Like[];
}
