import { userResolver } from '../user.resolver';
import dbConnection from '../../config/connectDb';


describe('Test User Resolver', () => {
  beforeAll(async () => {
    await dbConnection;
  });

  afterAll(async (done) => {
    dbConnection.close();
    done();
  });

  it('Should login a user', async () => {
    const args = { email: 'foobar@gmail.com', password: 'password' }; // This user is in the seeders
    const spy = jest.spyOn(userResolver.Mutation, 'loginUser');
    await userResolver.Mutation.loginUser(null, args);
    expect(spy).toHaveBeenCalled();
  });

  it('Should throw error if email is not valid', async () => {
    const args = { email: 'invalid email', password: '12345' };
    const message = 'email must be a valid email';
    try {
      await userResolver.Mutation.loginUser(null, args);
    } catch (error) {
      expect(error.constructor.name).toEqual('UserInputError');
      expect(error.message).toEqual(message);
    }
  });

  it('Should throw error if email is wrong', async () => {
    const args = { email: 'wrong@email.com', password: '12345' };
    const message = 'Invalid email or password';
    try {
      await userResolver.Mutation.loginUser(null, args);
    } catch (error) {
      expect(error.constructor.name).toEqual('AuthenticationError');
      expect(error.message).toEqual(message);
    }
  });

  it('Should throw error if password is wrong', async () => {
    const args = { email: 'harera@gmail.com', password: 'wrong password' };
    const message = 'Invalid email or password';
    try {
      await userResolver.Mutation.loginUser(null, args);
    } catch (error) {
      expect(error.constructor.name).toEqual('AuthenticationError');
      expect(error.message).toEqual(message);
    }
  });
});
