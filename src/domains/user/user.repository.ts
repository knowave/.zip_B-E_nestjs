import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  findOneByEmail(email: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  findOneById(id: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();
  }

  findOneWithdraw30DaysAgoUserById(id: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .andWhere('user.withdrawAt >= :thirtyDaysAgo', { thirtyDaysAgo })
      .withDeleted()
      .getOne();
  }

  findOneProfileUserById(id: string) {
    return this.findOne({ where: { id } });
  }
}
