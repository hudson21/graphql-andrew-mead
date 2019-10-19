import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

//This method runs before each test case
beforeEach(seedDatabase)

test('Should expose published posts', async () => {
    const getPosts = gql`
        query {
            posts {
                id 
                title 
                body 
                published
            }
        }
    `
    const response = await client.query({ query: getPosts })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch user posts', async () => {
    const client = getClient(userOne.jwt)
    const getMyPosts = gql`
        query {
            myPosts {
                id
                title 
                body
                published
            }
        }
    `

    const { data } = await client.query({ query: getMyPosts })

    expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
    const client = getClient(userOne.jwt)
    const updatePost = gql`
        mutation {
            updatePost(
                id: "${postOne.post.id}",
                data: {
                    published: false
                }
            ) {
                id
                title 
                body 
                published
            }
        }
    `
    const { data } = await client.mutate({ mutation: updatePost })
    const postExists = await prisma.exists.Post({ id: postOne.post.id, published: false })

    expect(data.updatePost.published).toBe(false)
    expect(postExists).toBe(true)
})

test('Should create a new Post', async () => {
    const client = getClient(userOne.jwt)
    const createPost = gql`
        mutation {
            createPost(
                data: {
                    title: "Testing another Post",
                    body: "Body of another Post",
                    published: true
                }
            ) {
                id
                title
                body 
                published
            }
        }
    `

    const { data } = await client.mutate({ mutation: createPost })
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
    const deletePost = gql`
        mutation {
            deletePost(id: "${postTwo.post.id}" ) {
                id
            }
        }
    `

    const { data } = await client.mutate({ mutation: deletePost })
    const postExists = await prisma.exists.Post({ id: postTwo.post.id })

    expect(postExists).toBe(false)
})