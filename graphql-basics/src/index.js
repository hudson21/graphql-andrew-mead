import { GraphQLServer } from 'graphql-yoga';


//Type Definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        me: User!
        post: Post!
        add(a: Float!, b: Float!): Float!
        grades: [Int]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

//Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: '14235dss',
                name: 'Carlos Hudson',
                email: 'carlosmigu27@hotmail.com',
                age: 23
            }
        },
        post() {
            return {
                id: '2342334',
                title: 'Assassins Creed',
                body: 'I am the body of the post',
                published: false
            }
        },
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello ${args.name}!. You are my favorite ${args.position}`
            } else {
                return 'Hello!'
            }
        },
        add(parent, args, ctx, info) {
            return args.a + args.b
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
