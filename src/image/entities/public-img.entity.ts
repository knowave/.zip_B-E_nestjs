import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { PubNotice } from 'src/pub-notice/entities/pub-notice.entity';

@Entity()
export class PublicImg extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url1: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url2: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url3: string;

  @ManyToOne(() => PubNotice, (pubNotice) => pubNotice.publicImgs, {
    onDelete: 'CASCADE',
  })
  pubNotice: PubNotice;
}
