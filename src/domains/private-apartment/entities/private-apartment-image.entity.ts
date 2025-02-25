import { Column, Entity, ManyToOne } from 'typeorm';
import { PrivateApartment } from './private-apartment.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PrivateApartmentImage extends BaseEntity {
    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 2083, nullable: false, comment: '민영 아파트 이미지 주소' })
    imageUrl: string;

    @ManyToOne(() => PrivateApartment, (apartment) => apartment.images)
    privateApartment: PrivateApartment;
}
