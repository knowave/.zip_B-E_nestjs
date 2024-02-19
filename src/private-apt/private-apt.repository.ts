import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateApt } from './entities/private-apt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrivateAptRepository {
  constructor(
    @InjectRepository(PrivateApt)
    private readonly repository: Repository<PrivateApt>,
  ) {}

  async getPrivateAptByPblancNo(pblancNo: number): Promise<PrivateApt> {
    return await this.repository
      .createQueryBuilder('privateApt')
      .where('privateApt.pblancNo', { pblancNo })
      .getOne();
  }
}
