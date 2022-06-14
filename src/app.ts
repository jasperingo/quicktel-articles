import dotenv from 'dotenv';
dotenv.config();

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { createServer } from '@graphql-yoga/node';
import { Resolvers } from './resolvers';

(async function() {

  const schema = await loadSchema('./src/schemas/*.graphql', {
    loaders: [new GraphQLFileLoader()]
  });

  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers: Resolvers
  })

  const server = createServer({
    schema: schemaWithResolvers,
  });
  
  // start the server and explore http://localhost:4000/graphql
  server.start();
})();
