import Redis from 'redis';
import RedisClient from './redis.cache';
import 'dotenv/config';

const { REDIS_URL } = process.env;

const Cache = new RedisClient(Redis.createClient(REDIS_URL || ''));

export default Cache;
