import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
})

export { prisma as default }


// callbacks, promises, async await

//prisma.query, prisma.mutation, prisma.subscription, prisma.exists

//first argument: operational argument
//second argument: selection set (the fields you wanna see in the graphql results)

/*prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
    console.log("users", JSON.stringify(data, undefined, 2));
})*/

/*prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
    console.log("comments", JSON.stringify(data, undefined, 2));
})*/

//1. Create a new Post
//2. Fetch all of the info about the user (author)

/*prisma.exists.Comment({
    id: 'ck14c8y1a003w0778egikdjsw',
    author: {
        id: 'ck14bq9ce00350778ie208omz'
    }
}).then(exists => {
    console.log(exists)
})

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error ('User not found')
    } 

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published } } }')
    return post.author
}

createPostForUser('ck14bq9ce00350778ie208omz', {
    title: 'New Post',
    body: 'This is the body of the New Post',
    published: false
}).then(user => console.log(JSON.stringify(user, undefined, 2)))
.catch(error => console.log(error))


const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })

    if (!postExists) throw new Error('Post not found') 

    const post = await prisma.mutation.updatePost({
        data,
        where: {
            id: postId
        }
    }, '{ author { id name email posts { id title published } } }')
    return post.author
}

updatePostForUser('ck158kydw00130778f4yhktj0', {
    published: true, 
    body: 'This is the body of the New Post Modified'
}).then(user => console.log(JSON.stringify(user, undefined, 2)))
.catch(error => console.log(error.message))*/
