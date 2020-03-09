import resolver from '../asset.resolvers';

describe('Test Asset Resolver', () => {
  const spy = jest.spyOn(resolver.Query, 'assets');
  it('Should return all assets', () => {
    resolver.Query.assets();
    expect(spy).toHaveBeenCalled();
  });
});
