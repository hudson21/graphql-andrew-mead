import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query.js';  
import Mutation from './resolvers/Mutation';
import Comment from './resolvers/Comment';
import User from './resolvers/User';
import Post from './resolvers/Post';

const server = new GraphQLServer({
    //The root is graphql-basics folder
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {   
        //Here we are passing the db variables in a global way. So it does not matter where the resolvers are they can reach this data
        db 
    }
});

server.start(() => {
    console.log('The server is up!');
});
