const Post = {// GraphQL is going to call this function for each individual post with the id property
    author(parent, args, { db }, info) {
        return db.users.find(user => user.id === parent.author)
    },
    comments(parent, args, { db }, info) {
        return db.comments.filter(comment => comment.post === parent.id)
    }
}

export { Post as default }