import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  findOneByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  findOneById(id: string) {
    return this.findOne({ where: { id }, select: { password: true } });
  }
}
