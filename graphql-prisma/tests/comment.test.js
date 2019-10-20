import 'cross-fetch/polyfill'
import seedDatabase, { userOne, commentOne, commentTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import { deleteComment } from './utils/operations' 

const client = getClient()

beforeEach(seedDatabase)

test('Should delete own comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentTwo.comment.id
    }

    await client.mutate({ mutation: deleteComment, variables })
    const commentExists = await prisma.exists.Comment({ id: commentTwo.comment.id })

    expect(commentExists).toBe(false)
})

test('Should not delete other users comments', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentOne.comment.id
    }

    await expect(
        client.mutate({ mutation: deleteComment, variables })    
    ).rejects.toThrow()
})
