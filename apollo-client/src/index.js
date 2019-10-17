import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

//gql is in charge of getting parsed the query to the client.query
const getUsers = gql`
    query {
        users {
            id 
            name 
        }
    }
`

client.query({ query: getUsers}).then((response) => {
    let html= ''

    response.data.users.forEach((user) => {
        html += `
            <div>
                <h3>${user.name}</h3>
            </div>
        `
    }) 

    document.getElementById('users').innerHTML = html
})

const getPosts = gql`
    query {
        posts {
            id
            title 
            body 
            published
            author {
                name
            }
        }
    }
`

client.query({ query: getPosts }).then(response => {
    let html= ''

    response.data.posts.forEach((post) => {
        html += `
            <ul>
                <h3>Post ${post.id}</h3>
                <li>Title: ${post.title}</li>
                <li>Body: ${post.body}</li>
                <li>Published: ${post.published}</li>
                <li>Author: ${post.author.name}</li>
            </ul>
        `
    }) 

    document.getElementById('posts').innerHTML = html
})