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
    @Column({ type: 'varchar', nullable: false, comment: '계약기간' })
    contractPeriod: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '계약기간 게시일' })
    contractPeriodAnnouncementDate?: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '계약기간 만료일' })
    contractPeriodExpiredDate?: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '공고명' })
    announcementName: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'date', nullable: true, comment: '공고일자' })
    announcementDate?: Date;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '공고종류' })
    announcementType: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: false, comment: '금회분양세대수' })
    numberOfUnits: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '블록' })
    block: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false, comment: '사업지구' })
    businessDistrict: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'boolean', nullable: false, comment: '수도권 여부' })
    isCapitalArea: boolean;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: true, comment: '월임대료' })
    monthlyRent?: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: true, comment: '임대보증금' })
    leaseDeposit?: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 50, nullable: false, comment: '주택형' })
    housingType: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 50, nullable: false, comment: '지역본부' })
    regionalOffice: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', nullable: false, comment: '총세대수' })
    totalHouseholds: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '아파트 조회 건수' })
    viewCount: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '아파트 댓글 수' })
    commentCount: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', default: false, comment: '분양기상한제' })
    subsidy: string;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '초기 분납금' })
    initialPayment: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '계약금' })
    contractDeposit: number;

    // 중도금
    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '중도금' })
    midPayment: number;

    @Expose()
    @ApiProperty()
    @Column({ type: 'integer', default: 0, comment: '잔금' })
    remainingBalance: number;

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
