import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query.js';  
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User';

const resolvers = {
    Query,
    Mutation,
    //Subscription,
    User,
}

//It is a list of all of the graphQL fragments definitions. It extracts all the fragments used in the resolvers 
const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }