import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    // get the header value, parse out the token, verify the token ...
    const header = request.request.headers.authorization

    if (header) {
        // another way could be header.replace('Bearer', '')
        const token = header.split(' ')[1]
        const decoded = jwt.verify(token, 'thisisasecret')
        return decoded.userId
    }
    
    if (requireAuth) throw new Error('Authentication required') 

    //null is return if requireAuth is false 
    return null
    
}

export { getUserId as default }