import Redis from 'redis';
import RedisClient from './redis.cache';
import 'dotenv/config';

const Cache = new RedisClient(Redis.createClient(process.env.REDIS_URL));

export default Cache;
