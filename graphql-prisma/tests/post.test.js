import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import { getPosts, getMyPosts, createPost, updatePost, deletePost } from './utils/operations'
import getClient from './utils/getClient'

const client = getClient()

//This method runs before each test case
beforeEach(seedDatabase)

test('Should expose published posts', async () => {
    
    const response = await client.query({ query: getPosts })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch user posts', async () => {
    const client = getClient(userOne.jwt)

    const { data } = await client.query({ query: getMyPosts })

    expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postOne.post.id,
        data: {
            published: false
        }
    } 

    const { data } = await client.mutate({ mutation: updatePost, variables })
    const postExists = await prisma.exists.Post({ id: postOne.post.id, published: false })

    expect(data.updatePost.published).toBe(false)
    expect(postExists).toBe(true)
})

test('Should create a new Post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        data: {
            title: "Testing another Post",
            body: "Body of another Post",
            published: true
        }
    }

    const { data } = await client.mutate({ mutation: createPost, variables })

    const postExists = await prisma.exists.Post({
        id: data.createPost.id,
        title: data.createPost.title,
        body: data.createPost.body,
        published: data.createPost.published
    })

    expect(data.createPost.title).toBe("Testing another Post")
    expect(data.createPost.body).toBe("Body of another Post")
    expect(data.createPost.published).toBe(true)
    expect(postExists).toBe(true)
})

test('Should Delete post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postTwo.post.id
    }

    const { data } = await client.mutate({ mutation: deletePost, variables })
    const postExists = await prisma.exists.Post({ id: postTwo.post.id })

    expect(postExists).toBe(false)
})