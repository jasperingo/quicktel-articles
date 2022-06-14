import { GraphQLYogaError } from '@graphql-yoga/node';
import { checkSchema, Schema, validationResult } from 'express-validator';
import UserRepository from '../repositories/user-repository';

type NextFunction = (root: any, args: any, context: any, info: any) => void;

const schema: Schema = {
  name: { notEmpty: { errorMessage: 'Field is required' } },

  email: {
    notEmpty: {
      bail: true,
      errorMessage: 'Field is required',
    },

    isEmail: {
      bail: true,
      errorMessage: 'Field is invalid',
    },

    custom: {
      options: async (value) => {
        if (await UserRepository.existsByEmail(value))
          throw 'Field already exists';
      }
    }
  },

  password: {
    notEmpty: {
      bail: true,
      errorMessage: 'Field is required',
    },

    isLength: {
      options: {
        min: 6
      }
    },
  }
};

const UserCreateValidationMiddleware = (next: NextFunction) => 
async (root: any, args: any, context: any, info: any) => {
 
  const req = { body: args };

  await checkSchema(schema).run(req);
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new GraphQLYogaError('Validation failed', { data: errors.array() });
  }

  return next(root, args, context, info)
}

export default UserCreateValidationMiddleware;
