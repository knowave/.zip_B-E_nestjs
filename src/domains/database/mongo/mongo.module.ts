import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MONGO_URI } from 'src/common/env';

@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URI, {
            retryWrites: false,
        }),
    ],
})
export class MongoModule implements OnModuleInit {
    private readonly logger = new Logger(MongoModule.name);

    constructor(@InjectConnection() private readonly connection: Connection) {}

    async onModuleInit() {
        this.connection.once('open', () => {
            this.logger.log('MongoDB Connected Successfully');
        });

        this.connection.on('error', (error) => {
            this.logger.error(`MongoDB Connection Error: ${error}`);
        });

        this.connection.on('disconnected', () => {
            this.logger.warn('MongoDB Disconnected, trying to reconnect...');
        });
    }
}
