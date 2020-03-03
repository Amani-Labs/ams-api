import service from '../asset.services';

test('Asset service', async () => {
  const spy = jest.spyOn(service, 'getAllAssest');
  service.getAllAssest();
  expect(spy).toHaveBeenCalled();
});
