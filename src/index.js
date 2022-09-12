const { ApolloServer, gql } = require("apollo-server");
const { KnownArgumentNamesOnDirectivesRule } = require("graphql/validation/rules/KnownArgumentNamesRule");

// No GraphQL toda request é POST
// Toda request bate no mesmo end point (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(email:String!, name:String!): User!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: "Daniel",
    email: "daniel@teste.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Daniel 2",
    email: "daniel2@teste.com",
    active: false,
  },
  {
    _id: String(Math.random()),
    name: "Daniel 3",
    email: "daniel3@teste.com",
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      }

      users.push(newUser)

      return newUser;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server running at URL: ${url}`));
