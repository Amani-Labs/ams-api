import { User } from '../sequelize/models/user.models';


export const userResolver = {
  Query: {
    users: () => User.findAll(),
  },
};

export const createUserResolver = {
  Mutation: {
    addUser: async (_, {
      firstName, lastName, userName, email, password, avatar,
    }) => {
      const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
        avatar,
      });
      user.save();
      return user;
    },
  },
};
