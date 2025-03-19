import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Apartment } from './apartment.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ApartmentImage extends BaseEntity {
    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 2083, nullable: false, comment: '공영 아파트 이미지 주소' })
    imageUrl: string;

    @ManyToOne(() => Apartment, (apartment) => apartment.images)
    apartment: Apartment;
}
