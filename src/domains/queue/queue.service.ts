import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
    constructor(@InjectQueue('job-queue') private readonly queue: Queue) {}

    async addApartmentSupplyJob() {
        await this.queue.add('apartment-supply-job', {}, { removeOnComplete: true, removeOnFail: true });
    }
}
