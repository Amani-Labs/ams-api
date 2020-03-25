import Redis from 'redis';
import winston from 'winston';
import redisDeletePattern from 'redis-delete-pattern';
import { promisify } from 'util';


export class RedisCache {
  private client: Redis.RedisClient;

  private setexAsync: (key: string, seconds: number, value: string) => Promise<string>;

  private getAsync: (key: string) => Promise<string>;

  private delAsync: (key: string) => Promise<number>;

  private flushallAsync: () => Promise<any>;

  constructor(redisClient: Redis.RedisClient, private readonly cacheExpireTime = 3600) {
    this.client = redisClient;
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
    this.flushallAsync = promisify(this.client.flushall).bind(this.client);
  }

  async save<T>(key: string, value: T) {
    return this.setexAsync(key, this.cacheExpireTime, JSON.stringify(value));
  }

  async fetch(key: string) {
    const data = await this.getAsync(key);
    return JSON.parse(data);
  }

  async delete(key: string) {
    return this.delAsync(key);
  }

  async deleteAllWithPattern(pattern: string) {
    return redisDeletePattern({
      redis: this.client,
      pattern: `${pattern}:*`,
    }, (err) => err);
  }

  async empty() {
    return this.flushallAsync();
  }
}

export default RedisCache;
