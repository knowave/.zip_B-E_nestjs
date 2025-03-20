import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';
import { ApartmentModule } from '../apartment/apartment.module';

@Module({
    imports: [
        ApartmentModule,
        BullModule.registerQueue({
            name: 'job-queue',
        }),
    ],
    providers: [QueueService, QueueProcessor],
    exports: [QueueService],
})
export class QueueModule {}
