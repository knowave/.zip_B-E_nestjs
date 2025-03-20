import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CronLog, CronLogSchema } from './schemas/cron.schema';
import { RedisModule } from '../redis/redis.module';
import { REDIS_HOST, REDIS_PORT } from 'src/common/env';
import { CronRepository } from './cron.repository';
import { QueueModule } from '../queue/queue.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CronLog.name, schema: CronLogSchema }]),
        RedisModule.forRoot({
            host: REDIS_HOST || 'localHost',
            port: +REDIS_PORT || 6379,
        }),
        QueueModule,
    ],
    providers: [CronService, CronRepository],
    controllers: [CronController],
})
export class CronModule {}
