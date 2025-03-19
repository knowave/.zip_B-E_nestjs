import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ApartmentImage } from './apartment-image.entity';
import { Like } from 'src/domains/like/entities/like.entity';
import { Comment } from 'src/domains/comment/entities/comment.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Apartment extends BaseEntity {
    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '공고 상태' })
    status: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '공고 게시일' })
    postDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '공고 만료일' })
    expiredDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 매물 유형 코드' })
    apartmentTypeCode: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 공급 정보 구분 코드' })
    supplyInfoTypeCode: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 공급 지역명' })
    supplyAreaName: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고 유형명' })
    supplyTypeName: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고 세부 유형명' })
    supplyDetailTypeName: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 청약 신청일' })
    applicationDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 청약 신청 만료일' })
    applicationExpiredDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 청약 발표일' })
    announcementDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 공고 서류 제출일' })
    documentSubmissionDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 공고 서류 제출 만료일' })
    documentSubmissionExpiredDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 계약 시작일' })
    contractStartDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 계약 종료일' })
    contractEndDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: false, comment: '아파트 총 세대수' })
    totalHouseholds: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: false, comment: '아파트 전용 면적' })
    exclusiveArea: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 입주 예정일' })
    expectedMoveInDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 난방 방식' })
    heatingType: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: false, comment: '아파트 모집 공고일' })
    recruitmentAnnouncementDate: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 상위 매물 유형 코드' })
    upperApartmentTypeCode: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고명' })
    announcementName: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고 번호' })
    announcementNumber: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: false, comment: '아파트 조회 건수' })
    viewCount: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 2083, nullable: false, comment: '아파트 공고문 다운 링크' })
    announcementDownloadLink: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 255, nullable: false, comment: '아파트 주소' })
    address: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 2083, nullable: false, comment: '아파트 공고 상세 URL' })
    detailUrl: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '아파트 고객센터 연계 시스템 구분코드' })
    customerCenterSystemTypeCode: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '아파트 댓글 수' })
    commentCount: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '아파트 좋아요 수' })
    likeCount: number;

    @OneToMany(() => ApartmentImage, (image) => image.apartment, { cascade: true })
    images: ApartmentImage[];

    @OneToMany(() => Like, (like) => like.apartment, { cascade: true })
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.apartment, { cascade: true })
    comments: Comment[];
}
