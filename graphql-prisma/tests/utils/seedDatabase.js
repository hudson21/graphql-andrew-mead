import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'
import jwt from 'jsonwebtoken'

const userOne = {
    input: {
        name: "Arturo Villa", 
        email: "arturo@hotmail.com", 
        password: bcrypt.hashSync("myPassword")
    },
    user: undefined,
    jwt: undefined
}

const postOne = {
    input: {
        title: "Second Post", 
        body: "Body of the second Post",
        published: true,
    },
    post: undefined
}

const postTwo = {
    input: {
        title: "First Post", 
        body: "Body of the First Post",
        published: false,
    }, 
    post: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })

    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // Create Post one
    postOne.post = await prisma.mutation.createPost({
        data: { 
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })

    // Create Post two 
    postTwo.post = await prisma.mutation.createPost({
        data: { 
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
}

export { seedDatabase as default, userOne, postOne, postTwo }