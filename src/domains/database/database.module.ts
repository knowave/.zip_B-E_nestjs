import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/common/config/type-orm.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    const isInitialized = this.dataSource.isInitialized;
    const database = this.dataSource.options.database;

    try {
      if (isInitialized) this.logger.log(`Database connected: ${database}`);
    } catch (err) {
      this.logger.error(`Failed to initialize database: ${err}`);
    }
  }
}
