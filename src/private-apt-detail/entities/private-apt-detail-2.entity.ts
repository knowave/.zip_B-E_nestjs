import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { PrivateApt } from 'src/private-apt/entities/private-apt.entity';

@Entity('privateAptDetail2')
export class PrivateAptDetail2 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  houseManageNo: number;

  @Column({ type: 'integer', nullable: true })
  modelNo: number;

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Column({ type: 'varchar', length: 20 })
  supplyAreaSize: string;

  @Column({ type: 'varchar', length: 10 })
  geSupplySize: string;

  @Column({ type: 'varchar', length: 10 })
  spSupplySize: string;

  @Column({ type: 'varchar', length: 20 })
  supplyAmount: string;

  @ManyToOne(() => PrivateApt, (privateApt) => privateApt.privateAptDetail2, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_pblancNo', referencedColumnName: 'pblancNo' })
  privateApt: PrivateApt;
}
