import redis from 'redis';

export const redisMockOperations = new Map();

const mockRedisServer = ({
  get: (key: string, callbackFn: Function) => {
    const data = redisMockOperations.get(key);
    return callbackFn(null, data);
  },
  setex: (key: string, expireTime: string, value: string, callbackFn: Function) => {
    redisMockOperations.set(key, value);
    return callbackFn(undefined, true);
  },
  del: (key: string, callbackFn: Function) => {
    redisMockOperations.delete(key);
    return callbackFn(undefined, true);
  },
  flushall: (callbackFn: Function) => {
    redisMockOperations.clear();
    return callbackFn(undefined, true);
  },
} as unknown) as redis.RedisClient;

export default mockRedisServer;
