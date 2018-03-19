/*import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

const typeDefs = `
type Query {
  testString: String
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default schema;*/


import resolvers from './resolvers';
const typeDefs =const typeDefs = `
type Query {
  testString: String
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;