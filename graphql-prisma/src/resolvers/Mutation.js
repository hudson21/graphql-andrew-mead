import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
    async login(parent, { data }, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: data.email
            }
        }, null)

        if (!user) throw new Error('Unable to login')

        const isMatch = await bcrypt.compare(data.password, user.password)

        if (!isMatch) throw new Error('Unable to login')

        return {
            user, 
            token: generateToken(user.id)
        }
    },
    async createUser(parent, args, { prisma }, info) {
        /*const emailTaken = await prisma.exists.User({ email: args.data.email })

        if (emailTaken) throw new Error('Email taken')*/
        const password = await hashPassword(args.data.password)

        const user = prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password
            } 
        })

        return {
            user, 
            token: generateToken(user.id)
        }
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
             where: {
                 id: userId
                } 
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        } 

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({ 
            id: args.id, 
            author: {
                id: userId
            } 
        })

        if (!postExists) throw new Error('Unable to delete post')

        return prisma.mutation.deletePost({ 
            where: {
                id: args.id
            }
         },info)
    },  
    async updatePost(parent, { id, data }, { prisma, request }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({ 
            id, 
            author: {
                id: userId
            } 
        })

        const postPublishedExists = await prisma.exists.Post({ 
            id,
            published: true, 
            author: {
                id: userId
            } 
        })

        if (postPublishedExists && !data.published) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id
                    }
                }
            })
        } 

        if (!postExists) throw new Error('Unable to update the post')

        return prisma.mutation.updatePost({
            data,
            where: {
                id: id
            }
        }, info)
    },
    async createComment(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        const publishePostExists = await prisma.exists.Post({ id: data.post, published: true })
        
        if (!publishePostExists) throw new Error('Unable to create comment') 

        return prisma.mutation.createComment({
            data: {
               text: data.text, 
               author: {
                   connect: {
                       id: userId
                   }
               },
               post: {
                   connect: {
                       id: data.post
                   }
               } 
            }
        }, info)
    },
    async deleteComment(parent, { id }, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = await prisma.exists.Comment({ 
            id, 
            author: {
                id: userId
            } 
        })

        if (!commentExists) throw new Error('Unable to delete the comment')

        return prisma.mutation.deleteComment({ 
            where: {
                id
            }
         }, info)
    },
    async updateComment(parent, { id, data }, { prisma, request }, info) {
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({ 
            id, 
            author: {
                id: userId
            } 
        })

        if (!commentExists) throw new Error('Unable to update the commentt')

        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        }, info)
    }
}
 
export { Mutation as default }