import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466'
})

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

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data
        }
    })
}

/*prisma.mutation.createPost({
    data: {
        title: 'My new Post from Node.js',
        body: 'This is the body of the Node.js Post',
        published: true,
        author: {
            connect: {
                id: 'ck14bq9ce00350778ie208omz'
            }
        }
    }
}, '{ id title body published }').then((data) => {
    console.log(data)
    return prisma.query.users(null, '{ id name posts { id title } }')
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})*/

/*prisma.mutation.updatePost({
    data: {
        body: 'My new Post from Node.js Modified',
        published: false
    },
    where: {
        id: 'ck14ejqne004j0778bsi95cp6'
    }
}, '{ id title body published }').then(() => {
    console.log('Post Updated Successfully')
    return prisma.query.posts(null, '{ id title body published }')
}).then(data => {
    console.log("posts", JSON.stringify(data, undefined, 2))
})*/