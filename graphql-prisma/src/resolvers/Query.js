const Query = {
    users(parent, args, { db }, info) {
        if (!args.name) {
            return db.users;
        } else {
            return db.users.filter(user => user.name.toLowerCase().includes(args.name.toLowerCase()))
        }
    },
    posts(parent, args, { db }, info) {
        if (args.title) {
            return db.posts.filter(post => {
                const titleMatch =  post.title.toLowerCase().includes(args.title.toLowerCase());
                const bodyMatch = post.body.toLowerCase().includes(args.title.toLowerCase());
                return titleMatch || bodyMatch;
            });
        } else {
            return db.posts;
        } 
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