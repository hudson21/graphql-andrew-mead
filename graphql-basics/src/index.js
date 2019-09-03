import { GraphQLServer } from 'graphql-yoga';


//Type Definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

//Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Carlos Miguel Hudson Díaz'
        },
        age() {
            return 23
        },
        employed() {
            return true
        },
        gpa() {
            return 9.5
        },
        title() {
            return 'Assassins Creed'
        },
        price() {
            return 99.99
        },
        releaseYear() {
            return null
        },
        rating() {
            return 5.4
        },
        inStock() {
            return false
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!');
});
