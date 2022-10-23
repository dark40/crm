import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
query getAllUsers {
    users {
      _id
      email
      firstName
      lastName
    }
}
`
export const QUERY_USER = gql`
query getUser($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      email
    }
}
`

export const QUERY_ALL_CASES = gql`
query getAllCases {
    cases {
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
        firstName
        lastName
        email
      }
    }
  }
`

export const QUERY_CASE = gql`
query getCase($id: ID!) {
    case(_id: $id) {
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
        firstName
        lastName
        email
      }
    }
  }  
`

export const QUERY_ALL_NOTES = gql`
query getAllNotes {
    notes {
      _id
      content
      createdDate
    }
  }
`

export const QUERY_NOTE = gql`
query getNote($id: ID!) {
    note(_id: $id) {
      _id
      content
      createdDate
    }
  }
`