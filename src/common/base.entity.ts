import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @Expose()
  @ApiProperty({ readOnly: true, description: '엔티티 고유 식별자' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ readOnly: true, description: '엔티티 생성 일시' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ readOnly: true, description: '엔티티 수정 일시' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ readOnly: true, description: '엔티티 삭제 일시' })
  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeSoftRemove()
  protected beforeSoftRemove() {
    this.deletedAt = new Date();
  }
}
