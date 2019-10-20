import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import { createUser, getUsers, login, getProfile } from './utils/operations'
import getClient from './utils/getClient'

const client = getClient()

//This method runs before each test case
beforeEach(seedDatabase)

test('Should create a new user', async () => {
    const variables = {
        data: {
            name: "Carlos Hudson", 
            email: "carlos@hotmail.com", 
            password: "myPassword"
        }
    }  

    const response = await client.mutate({ 
        mutation: createUser,  
        variables
    })

    const userExists = await prisma.exists.User({ id: response.data.createUser.user.id})

    expect(userExists).toBe(true)
})

test('Should expose public author profiles', async () => {
    
    const response = await client.query({ query: getUsers })

    //We are testing if there is at least one user and if that user comes with the email with a vaule of null
    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Arturo Villa')
})

test('Should not login with bad credentials', async () => {
    const variables = {
        email: "fabiola@example.com",
        password: "3skjñhafdsdsfs"
    }

    //We can work with resolves or rejects in promises
    await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()

    /* Synchronized function
    expect(() => {
        throw new Error('This is my error')
    }).toThrow()*/
})

test('Should not signup user with invalid password', async () => {
    const variables = {
        name: "Sandra Fabiola",
        email: "sandra@hotmail.com",
        password: "253d"
    }

    await expect(client.mutate({ mutation: createUser })).rejects.toThrow()
})

test('Should fetch user profile', async () => {
    const client = getClient(userOne.jwt)

    const { data } = await client.query({ query: getProfile }) 
    
    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
})