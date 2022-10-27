import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`

export const ADD_CASE = gql`
mutation addCase($firstName: String!, $lastName: String!, $bio: String!, $dob: String!, $notes: [ID]!, $users: [ID]!){
    addCase(firstName: $firstName, lastName: $lastName, bio: $bio, dob: $dob, notes: $notes, users: $users) {
      _id
      firstName
      lastName
      bio
      dob
      createdDate
      notes {
        _id
        content
        createdDate
      }
      users {
        _id
        email
        firstName
        lastName
      }
    }
  }
`

export const ADD_NOTE = gql`
mutation addNote($content: String!) {
    addNote(content: $content) {
      _id
      content
      createdDate
    }
  }
`

export const UPDATE_CASE = gql`
mutation updateCase ($id: ID!, $firstName: String, $lastName: String, $bio: String, $dob: String, $notes: [ID], $users: [ID]) {
  updateCase(_id: $id, firstName: $firstName, lastName: $lastName, bio: $bio, dob: $dob, notes: $notes, users: $users) {
    _id
    firstName
    lastName
  }
}
`