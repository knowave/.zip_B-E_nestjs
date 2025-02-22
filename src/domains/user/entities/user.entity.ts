import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from 'src/domains/comment/entities/comment.entity';
import { Like } from 'src/domains/like/entities/like.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class User extends BaseEntity {
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: '사용자 email' })
    @Column({ type: 'varchar', unique: true, comment: '사용자 email' })
    email: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: '사용자 닉네임' })
    @Column({ type: 'varchar', comment: '사용자 닉네임' })
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: '사용자 비밀번호' })
    @Column({
        type: 'varchar',
        nullable: true,
        select: false,
        comment: '사용자 비밀번호',
    })
    password?: string;

    @ApiProperty({ description: '사용자 refresh token' })
    @Column({
        type: 'varchar',
        length: 512,
        nullable: true,
        comment: '사용자 refresh token',
    })
    token?: string;

    @Expose()
    @IsString()
    @ApiProperty({
        description: '사용자가 관심있는 지역 (시/도)',
    })
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
        comment: '사용자가 관심있는 지역 (시/도)',
    })
    region?: string;

    @Expose()
    @IsString()
    @ApiProperty({ description: '사용자 프로필 이미지 URL' })
    @Column({
        type: 'varchar',
        length: 2048,
        comment: '사용자 프로필 이미지 URL',
        nullable: true,
    })
    imageUrl?: string;

    @Expose()
    @IsBoolean()
    @ApiProperty({ readOnly: true, description: '사용자 탈퇴 여부' })
    @Column({ type: 'boolean', default: false, comment: '사용자 탈퇴 여부' })
    isDeleted: boolean;

    @OneToMany(() => Comment, (comment) => comment.user)
    commentList: Comment[];

    @OneToMany(() => Like, (like) => like.user)
    likeList: Like[];
}
