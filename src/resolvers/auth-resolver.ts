import { GraphQLYogaError } from '@graphql-yoga/node';
import UserRepository from '../repositories/user-repository';
import HashService from '../services/hash-service';
import JWTService from '../services/jwt-service';

export const AuthMutationResolver = {
  async authUser(parent: any, args: any, context: any, info: any) {
    try {

      if (args.email === undefined) throw 401;

      const user = await UserRepository.findByEmail(args.email);
      
      if (
        user === null ||
        ! (await HashService.comparePassword(args.password, user.password))
      ) {
        throw 401;
      }

      const accessToken = await JWTService.sign({ sub: user.id });

      return { accessToken, userId: user.id };
      
    } catch(error) {
      if (error === 401) 
        throw new GraphQLYogaError('Authenitcation failed', { data: 'Credentials are incorrect' });
      else
        throw new GraphQLYogaError('Server failed', { data: error });
    }
  }
};
