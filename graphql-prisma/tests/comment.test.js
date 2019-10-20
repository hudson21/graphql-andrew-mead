import 'cross-fetch/polyfill'
import seedDatabase, { userOne, commentOne, commentTwo, postOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import { deleteComment, subscribeToComments, subscribeToPosts } from './utils/operations' 

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

test('Should subscribe to comments for a post', async (done) => {
    const variables = {
        postId: postOne.post.id
    }

    //Next will be fired any single time there is a new comment created with the postId of the subscription
    client.subscribe({ query: subscribeToComments, variables }).subscribe({ 
        //next wont run unless there is a mutation (create, update or delete)
        next(response) {
            expect(response.data.comment.mutation).toBe('DELETED')
            done()
        }
    })

    // Change a comment
    await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id }})
})

test('Should subscribe to changes for published posts', async (done) => {
    client.subscribe({ query: subscribeToPosts }).subscribe({
        //next wont run unless there is a mutation (create, update or delete)
        next(response) {
            expect(response.data.post.mutation).toBe('DELETED')
            done()
        }
    })

    await prisma.mutation.deletePost({ where: { id: postOne.post.id } })
})
