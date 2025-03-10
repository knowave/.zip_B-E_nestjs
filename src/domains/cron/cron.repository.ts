import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CronLog, CronLogModel } from './schemas/cron.schema';
import { CreateCronLogType } from './types/create-cron-log.type';

@Injectable()
export class CronRepository {
    constructor(@InjectModel(CronLog.name) private readonly cronLogModel: CronLogModel) {}

    createCronLog({ name, status, time }: CreateCronLogType) {
        this.cronLogModel.create({ name, status, time });
    }
}
