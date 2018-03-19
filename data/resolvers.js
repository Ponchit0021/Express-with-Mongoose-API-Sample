const resolvers = {
    Query: {
        hello: () => {
            return 'Hello world!';
        },
        allAuthors: () => {
            return [{ id: 1, firstName: 'Hello', lastName: 'World' },
                { id: 2, firstName: 'Hallo', lastName: 'Welt' },
                { id: 3, firstName: 'Hola', lastName: 'Mundo' }
            ];
        }
    }
};

export default resolvers;