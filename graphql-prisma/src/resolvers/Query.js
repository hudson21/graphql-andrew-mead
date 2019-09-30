const Query = {
    users(parent, args, { prisma }, info) {
        // Different results that can be sent to the graphQL playground:
        // nothing, string, object
        //Object Approach
        return prisma.query.users(null, info)
    },
    posts(parent, args, { prisma }, info) {
        return prisma.query.posts(null, info)
    },
    me() {
        return {
            id: '14235dss',
            name: 'Carlos Hudson',
            email: 'carlosmigu27@hotmail.com',
            age: 23
        }
    },
    post() {
        return {
            id: '2342334',
            title: 'Assassins Creed',
            body: 'I am the body of the post',
            published: false
        }
    },
    comments(parent, args, { db }, info) {
        return db.comments;
    }
}

export { Query as default }