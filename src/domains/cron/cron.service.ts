import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Cron } from '@nestjs/schedule';
import { CronRepository } from './cron.repository';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class CronService {
    private readonly lockTTL = 30;
    private readonly lockKey = 'cron-job-lock';
    private readonly logger = new Logger(CronService.name);

    constructor(
        private readonly redisService: RedisService,
        private readonly cronRepository: CronRepository,
        private readonly queueService: QueueService
    ) {}

    @Cron('0 6 * * *', { name: 'apartment-supply-job', timeZone: 'Asia/Seoul' })
    async handleDailyApartmentSupplyCronJob() {
        const lock = await this.redisService.setLock(this.lockKey, this.lockTTL);

        if (!lock) {
            this.logger.warn('Already running Cron Job. Skip...');
            this.cronRepository.createCronLog({
                name: this.lockKey,
                status: false,
                time: 0
            });
            return;
        }

        try {
            const startTime = Date.now();
            await this.queueService.addApartmentSupplyJob();
            const endTime = Date.now();
            this.cronRepository.createCronLog({
                name: this.lockKey,
                status: true,
                time: endTime - startTime
            });
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        } finally {
            await this.redisService.releaseLock(this.lockKey);
        }
    }
}
