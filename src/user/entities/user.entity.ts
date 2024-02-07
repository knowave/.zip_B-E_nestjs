import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  sido: string;

  @Column({ length: 300, default: '경기', nullable: true })
  profileImage: string;
}
