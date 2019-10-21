import { GraphQLServer, PubSub } from 'graphql-yoga';
import prisma from './prisma';
import { resolvers, fragmentReplacements } from './resolvers/index';

const pubsub = new PubSub()

const server = new GraphQLServer({
    //The root is graphql-basics folder
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            //Here we are passing the db variables in a global way. So it does not matter where the resolvers are they can reach this data
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
});

export { server as default }