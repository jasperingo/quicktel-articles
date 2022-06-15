import { GraphQLYogaError } from '@graphql-yoga/node';
import UserRepository from '../repositories/user-repository';
import JWTService from '../services/jwt-service';
import { NextResolverFunction } from '../types';

const AuthMiddleware = (next: NextResolverFunction) => 
async (root: any, args: any, context: any, info: any) => {
 
  try {

    const header = context.req.headers.authorization || '';

    const token = header.substring('bearer'.length + 1);

    const auth = await JWTService.verify(token);

    context.user = await UserRepository.findById(auth.sub as number);

    if (context.user === null) {
      throw new Error('Invalid access token');
    }
 
    return next(root, args, context, info);

  } catch(error) {
    throw new GraphQLYogaError('Authentication failed', { data: error });
  }
}

export default AuthMiddleware;
