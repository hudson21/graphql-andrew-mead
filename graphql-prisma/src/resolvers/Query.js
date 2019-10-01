const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.name) {
            opArgs.where = {
                OR: [{
                    name_contains: args.name
                }, {
                    email_contains: args.name
                }]
            }
        }
        // Different results that can be sent to the graphQL playground:
        // nothing, string, object
        //Object Approach
        return prisma.query.users(opArgs, info)
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.title) {
            opArgs.where = {
                OR: [{
                    title_contains: args.title
                }, {
                    body_contains: args.title
                }]
            }
        } 
        return prisma.query.posts(opArgs, info)
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
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info);
    }
}

export { Query as default }