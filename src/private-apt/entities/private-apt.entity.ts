import { Entity, Column, OneToOne, OneToMany, PrimaryColumn } from 'typeorm';
// import { PrivateAptDetail1 } from './PrivateAptDetail1';
// import { PrivateImg } from './PrivateImg';
// import { PrivateAptDetail2 } from './PrivateAptDetail2';
import { Like } from 'src/like/entities/like';
// import { Comment } from './Comment';

@Entity()
export class PrivateApt {
  @PrimaryColumn()
  pblancNo: number;

  @Column({ nullable: true, length: 40 })
  executor: string;

  @Column({ nullable: true, length: 10 })
  operation: string;

  @Column({ nullable: true })
  houseManageNo: number;

  @Column({ nullable: true, length: 40 })
  houseName: string;

  @Column({ nullable: true, length: 20 })
  winDate: string;

  @Column({ nullable: true, length: 20 })
  receptStartDate: string;

  @Column({ nullable: true, length: 20 })
  receptEndDate: string;

  @Column({ nullable: true, length: 20 })
  recruitDate: string;

  @Column({ nullable: true, length: 15 })
  rentSection: string;

  @Column({ nullable: true, length: 15 })
  sido: string;

  //   @OneToOne(() => PrivateAptDetail1, (detail1) => detail1.privateApt)
  //   detail1: PrivateAptDetail1;

  //   @OneToOne(() => PrivateImg, (img) => img.privateApt)
  //   img: PrivateImg;

  //   @OneToOne(() => PrivateAptDetail2, (detail2) => detail2.privateApt)
  //   detail2: PrivateAptDetail2;

  @OneToMany(() => Like, (like) => like.privateApt)
  likes: Like[];

  //   @OneToMany(() => Comment, (comment) => comment.privateApt)
  //   comments: Comment[];
}
