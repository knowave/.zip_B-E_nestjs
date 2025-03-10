import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CronLog, CronLogSchema } from './schemas/cron.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: CronLog.name, schema: CronLogSchema }])],
    controllers: [CronController],
    providers: [CronService],
})
export class CronModule {}
