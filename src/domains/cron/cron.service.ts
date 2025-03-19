import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.serivce';
import { Cron } from '@nestjs/schedule';
import { CronRepository } from './cron.repository';
import { ApartmentService } from '../apartment/apartment.service';

@Injectable()
export class CronService {
    private readonly lockTTL = 30;
    private readonly lockKey = 'cron-job-lock';
    private readonly logger = new Logger(CronService.name);

    constructor(
        private readonly redisService: RedisService,
        private readonly cronRepository: CronRepository,
        private readonly apartmentService: ApartmentService,
    ) {}

    @Cron('0 6 * * *', { name: 'daily-apartment-supply-cron-job', timeZone: 'Asia/Seoul' })
    async handleDailyApartmentSupplyCronJob() {
        const lock = await this.redisService.setLock(this.lockKey, this.lockTTL);

        if (!lock) {
            this.logger.warn('Already running Cron Job. Skip...');
            this.cronRepository.createCronLog({
                name: this.lockKey,
                status: false,
                time: 0,
            });
            return;
        }

        const lockAcquired = await this.redisService.setLock(this.lockKey, this.lockTTL);

        if (!lockAcquired) {
            this.logger.warn('Another instance is running, Skip...');
            this.cronRepository.createCronLog({
                name: this.lockKey,
                status: false,
                time: 0,
            });
            return;
        }

        try {
            const startTime = Date.now();
            this.logger.log('Start Daily Apartment Supply Cron Job');
            await this.apartmentService.createApartmentList();
            this.logger.log('End Daily Apartment Supply Cron Job');
            const endTime = Date.now();
            this.cronRepository.createCronLog({
                name: this.lockKey,
                status: true,
                time: endTime - startTime,
            });
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        } finally {
            await this.redisService.releaseLock(this.lockKey);
        }
    }
}
