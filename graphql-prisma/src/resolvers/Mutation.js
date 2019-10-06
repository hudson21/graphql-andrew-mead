import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId';

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
            token: jwt.sign({ userId: user.id }, 'thisisasecret')
        }
    },
    async createUser(parent, args, { prisma }, info) {
        /*const emailTaken = await prisma.exists.User({ email: args.data.email })

        if (emailTaken) throw new Error('Email taken')*/

        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        const password = await bcrypt.hash(args.data.password, 10)
        const user = prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password
            } 
        })

        return {
            user, 
            token: jwt.sign({ userId: user.id }, 'thisisasecret')
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

        if (!postExists) throw new Error('Unable to update the post')

        return prisma.mutation.updatePost({
            data,
            where: {
                id: id
            }
        }, info)
    },
    createComment(parent, { data }, { prisma }, info) {
        return prisma.mutation.createComment({
            data: {
               text: data.text,
               author: {
                   connect: {
                       id: data.author
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
    deleteComment(parent, { id }, { prisma }, info) {
        return prisma.mutation.deleteComment({ 
            where: {
                id
            }
         }, info)
    },
    updateComment(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        }, info)
    }
}
 
export { Mutation as default }