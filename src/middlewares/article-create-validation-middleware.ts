import { GraphQLYogaError } from '@graphql-yoga/node';
import { checkSchema, Schema, validationResult } from 'express-validator';
import ArticleRepository from '../repositories/article-repository';
import { NextResolverFunction } from '../types';

const schema: Schema = {
  title: { 
    notEmpty: { 
      bail: true,
      errorMessage: 'Field is required' 
    },

    custom: {
      options: async (value) => {
        if (await ArticleRepository.existsByTitle(value))
          throw 'Field already exists';
      }
    }
  },

  description: {
    notEmpty: {
      bail: true,
      errorMessage: 'Field is required',
    },
  }
};

const ArticleCreateValidationMiddleware = (next: NextResolverFunction) => 
async (root: any, args: any, context: any, info: any) => {
 
  const req = { body: args };

  await checkSchema(schema).run(req);
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new GraphQLYogaError('Validation failed', { data: errors.array() });
  }

  return next(root, args, context, info);
}

export default ArticleCreateValidationMiddleware;
