import ArticleRepository from '../repositories/article-repository';

export const ArticleQueryResolver = {
  async articles() {
    return ArticleRepository.findAll();
  },
};
