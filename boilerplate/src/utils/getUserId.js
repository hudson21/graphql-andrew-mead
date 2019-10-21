import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    // get the header value, parse out the token, verify the token ...
    // This will exist only on mutations and queries --> request.request.headers.authorization
    //This is where the subcription data is --> request.connection.context.Authorization

    const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization 
 
    if (header) {
        // another way could be header.replace('Bearer', '')
        const token = header.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.userId
    }
    
    if (requireAuth) throw new Error('Authentication required') 

    //null is return if requireAuth is false 
    return null
    
}

export { getUserId as default }