import { GraphQLYogaError } from '@graphql-yoga/node';
import UserCreateValidationMiddleware from '../middlewares/user-create-validation-middleware';
import UserRepository from '../repositories/user-repository';
import HashService from '../services/hash-service';

export const UserResolverMiddlewares = {
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
