const { ApolloServer, gql } = require('apollo-server');

// No GraphQL toda request é POST
// Toda request bate no mesmo end point (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server running at URL:${url}`))