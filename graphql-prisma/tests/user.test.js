import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import bcrypt from 'bcryptjs'
import prisma from '../src/prisma'

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

//This method runs after each test case
beforeEach(async () => {
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    const user = await prisma.mutation.createUser({
        data: {
            name: "Arturo Villa", 
            email: "arturo@hotmail.com", 
            password: bcrypt.hashSync("myPassword")
        }
    })
    await prisma.mutation.createPost({
        data: { 
            title: "First Post", 
            body: "Body of the First Post",
            published: false,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    await prisma.mutation.createPost({
        data: { 
            title: "Second Post", 
            body: "Body of the second Post",
            published: true,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
})

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Carlos Hudson", 
                    email: "carlos@hotmail.com", 
                    password: "myPassword"
                }
            ) {
                token 
                user {
                    id
                }
            }
        }
    `

    const response = await client.mutate({ mutation: createUser })

    const userExists = await prisma.exists.User({ id: response.data.createUser.user.id})

    expect(userExists).toBe(true)
})