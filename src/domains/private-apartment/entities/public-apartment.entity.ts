import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PublicApartmentImage } from './public-apartment-image.entity';
import { Like } from 'src/domains/like/entities/like.entity';
import { Comment } from 'src/domains/comment/entities/comment.entity';

@Entity()
export class PublicApartment extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, comment: '공고 상태' })
    status: string;

    @Column({ type: 'date', nullable: false, comment: '공고 게시일' })
    postDate: Date;

    @Column({ type: 'date', nullable: false, comment: '공고 만료일' })
    expiredDate: Date;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 매물 유형 코드' })
    apartmentTypeCode: string;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 공급 정보 구분 코드' })
    supplyInfoTypeCode: string;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 공급 지역명' })
    supplyAreaName: string;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고 유형명' })
    supplyTypeName: string;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고 세부 유형명' })
    supplyDetailTypeName: string;

    @Column({ type: 'date', nullable: false, comment: '아파트 청약 신청일' })
    applicationDate: Date;

    @Column({ type: 'date', nullable: false, comment: '아파트 청약 신청 만료일' })
    applicationExpiredDate: Date;

    @Column({ type: 'date', nullable: false, comment: '아파트 청약 발표일' })
    announcementDate: Date;

    @Column({ type: 'date', nullable: false, comment: '아파트 공고 서류 제출일' })
    documentSubmissionDate: Date;

    @Column({ type: 'date', nullable: false, comment: '아파트 공고 서류 제출 만료일' })
    documentSubmissionExpiredDate: Date;

    @Column({ type: 'date', nullable: false, comment: '아파트 계약 시작일' })
    contractStartDate: Date;

    @Column({ type: 'date', nullable: false, comment: '아파트 계약 종료일' })
    contractEndDate: Date;

    @Column({ type: 'integer', nullable: false, comment: '아파트 총 세대수' })
    totalHouseholds: number;

    @Column({ type: 'integer', nullable: false, comment: '아파트 전용 면적' })
    exclusiveArea: number;

    @Column({ type: 'date', nullable: false, comment: '아파트 입주 예정일' })
    expectedMoveInDate: Date;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 난방 방식' })
    heatingType: string;

    @Column({ type: 'date', nullable: false, comment: '아파트 모집 공고일' })
    recruitmentAnnouncementDate: Date;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 상위 매물 유형 코드' })
    upperApartmentTypeCode: string;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고명' })
    announcementName: string;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 공고 번호' })
    announcementNumber: string;

    @Column({ type: 'integer', nullable: false, comment: '아파트 전체 조회 건수' })
    totalViewCount: number;

    @Column({ type: 'integer', nullable: false, comment: '아파트 조회 건수' })
    viewCount: number;

    @Column({ type: 'varchar', length: 2083, nullable: false, comment: '아파트 공고문 다운 링크' })
    announcementDownloadLink: string;

    @Column({ type: 'varchar', length: 255, nullable: false, comment: '아파트 주소' })
    address: string;

    @Column({ type: 'varchar', length: 2083, nullable: false, comment: '아파트 공고 상세 URL' })
    detailUrl: string;

    @Column({ type: 'varchar', nullable: false, comment: '아파트 고객센터 연계 시스템 구분코드' })
    customerCenterSystemTypeCode: string;

    @Column({ type: 'integer', default: 0, comment: '아파트 댓글 수' })
    commentCount: number;

    @Column({ type: 'integer', default: 0, comment: '아파트 좋아요 수' })
    likeCount: number;

    @OneToMany(() => PublicApartmentImage, (image) => image.publicApartment, { cascade: true })
    images: PublicApartmentImage[];

    @OneToMany(() => Like, (like) => like.publicApartment, { cascade: true })
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.publicApartment, { cascade: true })
    comments: Comment[];
}
