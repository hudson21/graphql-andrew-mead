import jwt from 'jsonwebtoken'

const getUserId = (request) => {
    // get the header value, parse out the token, verify the token ...
    const header = request.request.headers.authorization

    if (!header) throw new Error('Authentication required')

    // another way could be header.replace('Bearer', '')
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, 'thisisasecret')

    return decoded.userId
}

export { getUserId as default }