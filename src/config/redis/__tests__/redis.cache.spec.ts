import redis from 'redis';
import { RedisCache } from '../redis.cache';
import mockedRedisServer, { redisMockOperations } from '../__mocks__/redis.mock';


describe(RedisCache, () => {
  let cache: RedisCache;

  beforeAll(() => {
    jest.spyOn(redis, 'createClient').mockReturnValue(mockedRedisServer);
    cache = new RedisCache(mockedRedisServer);
  });

  const [key, value] = ['myname', 'carlos'];
  it('should save cached data', async () => {
    await cache.save(key, value);
    const res = JSON.parse(redisMockOperations.get(key));
    expect(res).toBeDefined();
    expect(res).toEqual(value);
  });

  it('should return data if exist', async () => {
    const res = await cache.fetch(key);
    expect(res).toBeDefined();
    expect(res).toEqual(value);
  });

  it('should delete data for provided key', async () => {
    await cache.delete('myname');
    const res = redisMockOperations.get(key);
    expect(res).toBeUndefined();
  });

  it('should remove all data in the store', async () => {
    await cache.save(key, value);
    await cache.empty();
    const res = redisMockOperations.get(key);
    expect(res).toBeUndefined();
  });
});
