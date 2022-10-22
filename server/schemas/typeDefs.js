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
    users: [User]
}

type User {
    _id: ID 
    firstName: String
    lastName: String
    email: String
}

type Auth {
    token: ID
    user: User
}

type Query {
    users: [User]
    user(userId: ID!): User
    cases: [Case]
    case(caseId: ID!): Case
    notes: [Note]
    note(noteId: ID!): Note
}

input CaseInput {
    _id: ID
    firstName: String
    lastName: String
    bio: String
    dob: Date
    createdDate: Date
    notes: [ID]
    users: [ID]
}

input NoteInput {
    _id: ID 
    content: String
    createdDate: Date
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCase(input: CaseInput!): Case
    updateCase(input: CaseInput!): Case
    removeCase(_id: ID!): Case
    addNote(input: NoteInput!): Note
    updateNote(input: NoteInput!): Note
    removeNote(_id: ID!): Note
}
`;

module.exports = typeDefs;