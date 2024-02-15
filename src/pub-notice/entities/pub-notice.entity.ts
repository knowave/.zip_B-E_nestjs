import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { PublicImg } from 'src/image/entities/public-img.entity';
import { Like } from 'src/like/entities/like';
import { Comment } from 'src/comment/entities/comment';

@Entity('Pubnotices')
export class PubNotice extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  panId: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  panState: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  panUploadDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  aisTypeCode: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  suplyTypeCode: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  sidoName: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  uppAisTypeName: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  aisTypeName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  startDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  closeDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  announceDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  submitStartDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  submitEndDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contractStartDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contractEndDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  houseCnt: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  size: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  moveYM: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  heatMethod: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  panDate: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  uppAisTypeCode: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  panName: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  allCount: string;

  @Column({ type: 'text', nullable: true })
  fileLink: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: false })
  detailUrl: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  csCode: string;

  @OneToOne(() => PublicImg, (publicImg) => publicImg.pubNotice, {
    onDelete: 'CASCADE',
  })
  publicImgs: PublicImg[];

  @OneToMany(() => Like, (like) => like.pubNotice, { onDelete: 'CASCADE' })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.pubNotice, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
