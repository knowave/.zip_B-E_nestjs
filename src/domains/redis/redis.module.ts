import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({})
export class RedisModule {
    static forRoot(options: RedisOptions): DynamicModule {
        const provider = {
            provide: 'REDIS_CLIENT',
            useFactory: () => new Redis(options)
        };

        return {
            module: RedisModule,
            providers: [provider, RedisService],
            exports: [provider, RedisService]
        };
    }
}
