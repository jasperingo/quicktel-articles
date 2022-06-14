import { GraphQLYogaError } from '@graphql-yoga/node';
import Joi from 'joi';
import UserRepository from '../repositories/user-repository';

type NextFunction = (root: any, args: any, context: any, info: any) => void;

const schema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string().email({ minDomainSegments: 2 }).external(async (value) => {
    if (await UserRepository.existsByEmail(value)) {
      throw new Error('any.invalid');
    }

    return value;
  }),

  password: Joi.string().min(6),
});

const UserCreateValidationMiddleware = (next: NextFunction) => 
async (root: any, args: any, context: any, info: any) => {
  const { error } = await schema.validateAsync(args, { abortEarly: false, context });
  
  if (error) throw new GraphQLYogaError('Validation failed', { data: error.details });

  return next(root, args, context, info)
}

export default UserCreateValidationMiddleware;
