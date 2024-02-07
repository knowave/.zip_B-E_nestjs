import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ comment: '사용자 이메일' })
  email: string;

  @Column({ comment: '사용자 비밀번호', select: false })
  password: string;

  @Column({ comment: '사용자 닉네임' })
  nickname: string;

  @Column({ comment: '사용자 토큰', nullable: true })
  token?: string;

  @Column({ comment: '관심지역', nullable: true })
  preferredRegion?: string;

  @Column({
    comment: '프로필 이미지',
    length: 300,
    default: '경기',
    nullable: true,
  })
  profileImage?: string;
}
