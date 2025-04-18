import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly SEARCH_KEY = 'search:keyword';

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

    async zincrby(keyword: string) {
        const searchKey = this.getTodaySearchKey();
        const ttl = await this.redisClient.ttl(searchKey);

        if (ttl === -1) {
            await this.redisClient.expire(searchKey, 60 * 60 * 24);
        }

        return await this.redisClient.zincrby(searchKey, 1, keyword);
    }

    async zrevrange() {
        const searchKey = this.getTodaySearchKey();
        return await this.redisClient.zrevrange(searchKey, 0, 9, 'WITHSCORES');
    }

    async onModuleDestroy() {
        await this.redisClient.quit();
    }

    private getTodaySearchKey() {
        const today = new Date().getDate();
        return `${this.SEARCH_KEY}:${today}`;
    }
}
