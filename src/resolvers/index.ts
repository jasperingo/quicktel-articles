import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { ArticleQueryResolver } from './article-resolvers';
import { AuthMutationResolver } from './auth-resolver';
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
    ...AuthMutationResolver,
  },
};

export const Resolvers = composeResolvers(resolvers, resolversComposition);
