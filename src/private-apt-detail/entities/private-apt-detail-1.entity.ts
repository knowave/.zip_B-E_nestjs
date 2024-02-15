import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrivateApt } from 'src/private-apt/entities/private-apt.entity';

@Entity('privateAptDetail1')
export class PrivateAptDetail1 extends BaseEntity {
  @PrimaryGeneratedColumn()
  houseManageNo: number;

  @Column({ type: 'varchar', length: 30 })
  contractStartDate: string;

  @Column({ type: 'varchar', length: 30 })
  contractEndDate: string;

  @Column({ type: 'varchar', length: 30 })
  relevantArea1Date: string;

  @Column({ type: 'varchar', length: 30 })
  etcArea1Date: string;

  @Column({ type: 'varchar', length: 30 })
  gyeonggi1Date: string;

  @Column({ type: 'varchar', length: 30 })
  relevantArea2Date: string;

  @Column({ type: 'varchar', length: 30 })
  etcArea2Date: string;

  @Column({ type: 'varchar', length: 30 })
  gyeonggi2Date: string;

  @Column({ type: 'varchar', length: 70 })
  homePage: string;

  @Column({ type: 'varchar', length: 70 })
  applyAddress: string;

  @Column({ type: 'varchar', length: 30 })
  plusSupplyStartDate: string;

  @Column({ type: 'varchar', length: 30 })
  plusSupplyEndDate: string;

  @Column({ type: 'varchar', length: 15 })
  supplySize: string;

  @ManyToOne(() => PrivateApt, (privateApt) => privateApt.privateAptDetail1s, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_pblancNo', referencedColumnName: 'pblancNo' })
  privateApt: PrivateApt;
}
