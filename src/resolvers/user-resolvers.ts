import { GraphQLYogaError } from '@graphql-yoga/node';
import AuthMiddleware from '../middlewares/auth-middleware';
import UserCreateValidationMiddleware from '../middlewares/user-create-validation-middleware';
import UserRepository from '../repositories/user-repository';
import HashService from '../services/hash-service';

export const UserResolverMiddlewares = {
  'Query.user': [AuthMiddleware],
  'Mutation.createUser': [UserCreateValidationMiddleware]
};

export const UserMutationResolver = {
  async createUser(parent: any, args: any, context: any, info: any) {
    try {
      args.password = await HashService.hashPassword(args.password);

      const result = await UserRepository.create(args);

      return UserRepository.findById(result.id);
      
    } catch(error) {
      throw new GraphQLYogaError('Server failed', { data: error });
    }
  }
};

export const UserQueryResolver = {
  async user(parent: any, { id }: any, context: any, info: any) {
    return UserRepository.findById(id);
  },
};
