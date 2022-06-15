import Article from '../models/article';
import User from '../models/user';

const ArticleRepository = {
  async existsByTitle(title: string) {
    const article = await Article.findOne({ where: { title } });
    return article !== null;
  },

  findById(id: number) {
    return Article.findByPk(id, { include: { model: User } });
  },

  findAll() {
    return Article.findAll({ include: { model: User } });
  },

  create({ title, description, userId }: Article) {
    return Article.create({ title, description, userId });
  },
};

export default ArticleRepository;
