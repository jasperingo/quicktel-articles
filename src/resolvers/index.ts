import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { ArticleMutationResolver, ArticleQueryResolver, ArticleResolverMiddlewares } from './article-resolvers';
import { AuthMutationResolver } from './auth-resolver';
import { UserMutationResolver, UserResolverMiddlewares } from './user-resolvers';

const resolversComposition = {
  ...UserResolverMiddlewares,
  ...ArticleResolverMiddlewares,
};

const resolvers = {
  Query: {
    ...ArticleQueryResolver,
  },

  Mutation: {
    ...UserMutationResolver,
    ...AuthMutationResolver,
    ...ArticleMutationResolver,
  },
};

export const Resolvers = composeResolvers(resolvers, resolversComposition);
