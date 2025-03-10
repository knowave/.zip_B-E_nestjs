import { Module } from '@nestjs/common';
import { MySQLModule } from './mysql/mysql.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
    imports: [MySQLModule, MongoModule],
})
export class DatabaseModule {}
