import resolver from '../asset.resolvers';
import data from '../../data';

describe('Test Asset Resolver', () => {
  it('Should return all assets', () => {
    const assets = resolver.Query.assets();
    expect(assets).toBe(data);
  });
});
