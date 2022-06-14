import User from '../models/user';

const UserRepository = {
  async existsByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user !== null;
  },

  findById(id: number) {
    return User.findByPk(id);
  },

  findByEmail(email: string) {
    return User.findOne({ where: { email } });
  },

  create({ name, email, password }: User) {
    return User.create({ name, email, password });
  },
};

export default UserRepository;
