import getUserId from '../utils/getUserId';

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if (args.name) {
            opArgs.where = {
                OR: [{
                    name_contains: args.name
                }]
            }
        }
        // Different results that can be sent to the graphQL playground:
        // nothing, string, object
        //Object Approach
        return prisma.query.users(opArgs, info)
    },
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        }, info)
    }
}

export { Query as default }