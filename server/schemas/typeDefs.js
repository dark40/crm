const { gql }  = require('apollo-server-express');

const typeDefs = gql`
type Note {
    _id: ID 
    content: String
    createdDate: Date
}

type Case {
    _id: ID
    firstName: String
    lastName: String
    bio: String
    dob: Date
    createdDate: Date
    notes: [Note]
}

type User {
    _id: ID 
    firstName: String
    lastName: String
    email: String
    cases: [Case]
}

type Auth {
    token: ID
    user: User
}

type Query {
    cases: [Case]
    
}

type Mutation {

}
`;

module.exports = typeDefs;