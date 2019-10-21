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

const seedDatabase = async () => {
    // Delete test data
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
}

export { seedDatabase as default, userOne, userTwo }