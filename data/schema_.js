import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} from 'graphql-tools';
import mocks from './mocks'

const typeDefs = `
type Query {
	testString: String,
  	author(firstName: String, lastName: String): Author,
  	allAuthors: [Author]
},
type Author{
	firstName: String, //Primer Nombre es obligatorio
	lastName: String //Segundo Nombre
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default schema;