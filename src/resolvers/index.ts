import ArticleRepository from '../repositories/article-repository';

export const Resolvers = {
  Query: {
    async articles() {
      return ArticleRepository.findAll();
    },
  },
};
