import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { ArticleQueryResolver } from './article-resolvers';
import { UserMutationResolver, UserResolverMiddlewares } from './user-resolvers';

const resolversComposition = {
  ...UserResolverMiddlewares
};

const resolvers = {
  Query: {
    ...ArticleQueryResolver,
  },

  Mutation: {
    ...UserMutationResolver,
  },
};

export const Resolvers = composeResolvers(resolvers, resolversComposition);
