import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Demo User Data
const users = [{
    id: '1',
    name: 'Carlos Hudson',
    email: 'carlos.hudson@hp.com',
    age: 23
}, {
    id: '2',
    name: 'Rafael Aldama',
    email: 'rafael@hotmail.com'
}, {
    id: '3',
    name: 'Dany Arce',
    email: 'dany@hotmail.com',
    age: 24
}]

// Demo Post Data
const posts = [{
    id : '1',
    title: 'Post 1',
    body: 'First Post',
    published: true,
    author: '1'
}, {
    id : '2',
    title: 'Post 2',
    body: 'Body of the Post 2',
    published: false,
    author: '2'
}, {
    id : '3',
    title: 'Post 3',
    body: 'Body of the Post 3',
    published: true,
    author: '3'
}];

// Demo Comments Data
const comments = [{
    id: '1',
    text: 'This is the first comment',
    author: '1',
    post: '1'
},{
    id: '2',
    text: 'This is the second comment',
    author: '1',
    post: '3'
}, {
    id: '3',
    text: 'This is the third comment',
    author: '2',
    post: '2'
}, {
    id: '1',
    text: 'This is the fourth comment',
    author: '3',
    post: '1'
}]

//Type Definitions (schema)
const typeDefs = `
    type Query {
        users(name: String): [User!]!
        posts(title: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User! 
        createPost(tite: String!, body: String!, published: Boolean!, author: ID!): Post!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
`;

//Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.name) {
                return users;
            } else {
                return users.filter(user => user.name.toLowerCase().includes(args.name.toLowerCase()))
            }
        },
        posts(parent, args, ctx, info) {
            if (args.title) {
                return posts.filter(post => {
                    const titleMatch =  post.title.toLowerCase().includes(args.title.toLowerCase());
                    const bodyMatch = post.body.toLowerCase().includes(args.title.toLowerCase());
                    return titleMatch || bodyMatch;
                });
                
            } else {
                return posts;
            } 
        },
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
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            //It it just to verify if the email is already taken by another user or not
            const emailTaken = users.some(user => user.email === args.email)

            if (emailTaken) {
                throw new Error('Email taken.')
            }
            
            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user);

            return user;
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.author)

            if (!userExists) {
                throw new Error('User not found.')
            }
            
            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }
        }
    },
    Post: {// GraphQL is going to call this function for each individual post with the id property
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post)
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
