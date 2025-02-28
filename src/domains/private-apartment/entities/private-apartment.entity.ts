import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import { Comment } from 'src/domains/comment/entities/comment.entity';
import { Like } from 'src/domains/like/entities/like.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PrivateApartmentImage } from './private-apartment-image.entity';

@Entity()
export class PrivateApartment extends BaseEntity {
    @Expose()
    @ApiProperty()
    @Column({ type: 'int', comment: '모집 공고 번호' })
    privateNoticeNo: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '시행사' })
    executor: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '민영 or 공영' })
    type: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'int', nullable: true, comment: '주택 관리 번호' })
    housingManagementNo: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '아파트 이름' })
    apartmentName: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '청약 담청자 발표일' })
    announcementDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '청약 접수 시작일' })
    applicationStartDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '청약 접수 종료일' })
    applicationEndDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '모집 공고일' })
    noticeDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '아파트 분양 구분' })
    apartmentSaleType: string;

    @Expose()
    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '시 or 도' })
    region: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 계약 시작일' })
    contractStartDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 계약 종료일' })
    contractEndDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 청약 1순위 접수일 (해당지역)' })
    firstPriorityApplicationDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 청약 1순위 접수일 (기타지역)' })
    firstPriorityApplicationDateOther: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 청약 1순위 접수일 (경기)' })
    firstPriorityApplicationDateGyeonggi: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 청약 2순위 접수일 (해당지역)' })
    secondPriorityApplicationDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 청약 2순위 접수일 (기타지역)' })
    secondPriorityApplicationDateOther: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 청약 2순위 접수일 (경기)' })
    secondPriorityApplicationDateGyeonggi: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 2083, nullable: true, comment: '아파트 청약 홈페이지 주소' })
    homePageUrl: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '아파트 공급 위치' })
    supplyLocation: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 특별 공급 접수 시작일' })
    specialSupplyApplicationStartDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '아파트 특별 공급 접수 종료일' })
    specialSupplyApplicationEndDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'int', nullable: true, comment: '아파트 공급 규모' })
    supplySize: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'int', nullable: true, comment: '아파트 모델 번호' })
    modelNo: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '아파트 모델 타입' })
    modelType: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'int', nullable: true, comment: '아파트 전용 면적' })
    exclusiveArea: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '아파트 일반 공급 세대수' })
    generalSupplyFamilyCount: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '아파트 특별 공급 세대수' })
    specialSupplyFamilyCount: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, comment: '아파트 공급금액(분양최고금액,만원단위)' })
    supplyPrice: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: false, comment: '아파트 조회 건수' })
    viewCount: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '아파트 댓글 수' })
    commentCount: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '아파트 좋아요 수' })
    likeCount: number;

    @OneToMany(() => Like, (like) => like.privateApartment)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.privateApartment)
    comments: Comment[];

    @OneToMany(() => PrivateApartmentImage, (image) => image.privateApartment)
    images: PrivateApartmentImage[];
}
