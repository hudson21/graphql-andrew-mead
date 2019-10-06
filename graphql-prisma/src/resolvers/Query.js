import getUserId from '../utils/getUserId';

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
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        }, info)
    },
    async post(parent, { id }, { prisma, request }, info) {
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where: {
                id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)
        
        if (posts.length === 0) throw new Error('Post not found')
        
        return posts[0]
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info);
    }
}

export { Query as default }