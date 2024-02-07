import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Apartment {
  @PrimaryColumn({ type: 'integer' })
  pblancNo: number;

  @Column({ type: 'string', length: 40, nullable: true })
  executor: string;

  @Column({ type: 'string', length: 10, nullable: true })
  operation: string;

  @Column({ type: 'integer', nullable: true })
  houseManageNo: number;

  @Column({ type: 'string', length: 40, nullable: true })
  houseName: string;

  @Column({ type: 'string', length: 20, nullable: true })
  winDate: string;

  @Column({ type: 'string', length: 20, nullable: true })
  receptStartDate: string;

  @Column({ type: 'string', length: 20, nullable: true })
  receptEndDate: string;

  @Column({ type: 'string', length: 20, nullable: true })
  recruitDate: string;

  @Column({ type: 'string', length: 15, nullable: true })
  rentSection: string;

  @Column({ type: 'string', length: 15, nullable: true })
  sido: string;
}
