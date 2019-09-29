// Demo User Data
const users = [{
    id: '1',
    name: 'Carlos Hudson',
    email: 'carlos.hudson@hp.com',
    age: 23
}, {
    id: '2',
    name: 'Rafael Aldama',
    email: 'rafael@hotmail.com'
}, {
    id: '3',
    name: 'Dany Arce',
    email: 'dany@hotmail.com',
    age: 24
}]

// Demo Post Data
const posts = [{
    id : '1',
    title: 'Post 1',
    body: 'First Post',
    published: true,
    author: '1'
}, {
    id : '2',
    title: 'Post 2',
    body: 'Body of the Post 2',
    published: false,
    author: '2'
}, {
    id : '3',
    title: 'Post 3',
    body: 'Body of the Post 3',
    published: true,
    author: '3'
}];

// Demo Comments Data
const comments = [{
    id: '1',
    text: 'This is the first comment',
    author: '1',
    post: '1'
},{
    id: '2',
    text: 'This is the second comment',
    author: '1',
    post: '3'
}, {
    id: '3',
    text: 'This is the third comment',
    author: '2',
    post: '2'
}, {
    id: '4',
    text: 'This is the fourth comment',
    author: '3',
    post: '1'   
}]

const db = {
    users,
    posts,
    comments
}

export { db as default };