const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    weights: [Weight]!
    cardio: [Cardio]!
  }
# comment
  type Weight {
    _id: ID
    exercise: String
    pounds: Float
    date: String
    
  }

  type Cardio {
    _id: ID
    exercise: String
    miles: Float
    minutes: Float
    date: String
    
  }

  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    weights(username: String): [Weight]
    weight(weightId: ID!): Weight
    cardio(username: String!): [Cardio]
    cardioEntry(cardioId: ID!): Cardio
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWeight(username: String!, exercise: String!, pounds: Float!, date: String!): Weight
    addCardio(username: String!, exercise: String!, miles: Float!, minutes: Float!, date: String!): Cardio
    removeWeight(weightId: ID!): Weight
    removeCardio(cardioId: ID!): Cardio
}

`;

module.exports = typeDefs;
