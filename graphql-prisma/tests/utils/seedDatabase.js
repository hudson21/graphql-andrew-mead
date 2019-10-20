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

const userTwo = {
    input: {
        name: "Luisa María", 
        email: "luisa@hotmail.com", 
        password: bcrypt.hashSync("flute5816")
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

const commentOne = {
    input: {
        text: 'Comment 1'
    },
    comment: undefined
}

const commentTwo = {
    input: {
        text: 'Comment 2'
    },
    comment: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // Create user one
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

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

    //Create Comment One
    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect: {
                    id: userTwo.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    })

    //Create Comment Two
    commentTwo.comment = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    })
}

export { seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo }