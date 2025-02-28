import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';
import { Like } from 'src/domains/like/entities/like.entity';
import { PrivateApartment } from 'src/domains/private-apartment/entities/private-apartment.entity';
import { PublicApartment } from 'src/domains/public-apartment/entities/public-apartment.entity';
import { User } from 'src/domains/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ maxLength: 600, description: '댓글 내용' })
    @Column({ type: 'varchar', length: 600, comment: '댓글 내용' })
    content: string;

    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ example: false, description: '비공개 댓글 여부' })
    @Column({ type: 'boolean', default: true, comment: '비공개 댓글 여부' })
    isPrivate: boolean;

    @Expose()
    @IsNumber()
    @ApiProperty({ readOnly: true, description: '사용자 좋아요 수' })
    @Column({ type: 'int', default: 0, comment: '사용자 좋아요 수' })
    likeCount: number;

    @ManyToOne(() => User, (user) => user.commentList)
    user: User;

    @OneToMany(() => Like, (like) => like.comment)
    likeList: Like[];

    @ManyToOne(() => PublicApartment, (apartment) => apartment.comments)
    publicApartment: PublicApartment;

    @ManyToOne(() => PrivateApartment, (apartment) => apartment.comments)
    privateApartment: PrivateApartment;
}
