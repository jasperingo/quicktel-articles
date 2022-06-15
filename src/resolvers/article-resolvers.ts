import { GraphQLYogaError } from '@graphql-yoga/node';
import ArticleCreateValidationMiddleware from '../middlewares/article-create-validation-middleware';
import AuthMiddleware from '../middlewares/auth-middleware';
import ArticleRepository from '../repositories/article-repository';

export const ArticleResolverMiddlewares = {
  'Query.articles': [AuthMiddleware],
  'Mutation.createArticle': [AuthMiddleware, ArticleCreateValidationMiddleware],
};

export const ArticleMutationResolver = {
  async createArticle(parent: any, args: any, context: any, info: any) {
    try {
      args.userId = context.user.id;

      const result = await ArticleRepository.create(args);

      return ArticleRepository.findById(result.id);
      
    } catch(error) {
      throw new GraphQLYogaError('Server failed', { data: error });
    }
  }
};

export const ArticleQueryResolver = {
  async articles() {
    return ArticleRepository.findAll();
  },
};

