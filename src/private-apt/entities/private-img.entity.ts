import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrivateApt } from './private-apt.entity';

@Entity()
export class PrivateImg extends BaseEntity {
  @PrimaryGeneratedColumn()
  houseManageNo: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url1: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url2: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url3: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url4: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  url5: string;

  @ManyToOne(() => PrivateApt, (privateApt) => privateApt.privateImgs, {
    onDelete: 'CASCADE',
  })
  privateApt: PrivateApt;
}
