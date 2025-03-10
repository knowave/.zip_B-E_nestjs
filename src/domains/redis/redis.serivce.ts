import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

    async set(key: string, value: string, ttl?: number): Promise<void> {
        if (ttl) {
            await this.redisClient.set(key, value, 'EX', ttl);
        } else {
            await this.redisClient.set(key, value);
        }
    }

    async get(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }

    async del(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async setLock(key: string, ttl: number): Promise<boolean> {
        const result = await (this.redisClient.set as any)(key, 'locked', 'NX', 'EX', ttl);
        return result === 'OK';
    }
    

    async releaseLock(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async isLocked(key: string): Promise<boolean> {
        const result = await this.redisClient.get(key);
        return result !== null;
    }

    async onModuleDestroy() {
        await this.redisClient.quit();
    }
}
