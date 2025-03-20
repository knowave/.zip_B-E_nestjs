import { Processor, Process } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { ApartmentService } from '../apartment/apartment.service';
import { Job } from 'bullmq';

@Injectable()
@Processor('job-queue')
export class QueueProcessor {
    private readonly logger = new Logger(QueueProcessor.name);

    constructor(private readonly apartmentService: ApartmentService) {}

    @Process('apartment-supply-job')
    async apartmentSupplyJob(job: Job) {
        this.logger.log('Start Apartment Supply Job');
        await this.apartmentService.createApartmentList();
        this.logger.log('End Apartment Supply Job');
    }
}
