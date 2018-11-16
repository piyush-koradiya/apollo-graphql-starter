import { ApolloServer } from 'apollo-server-express'
import typeDefs from './types'
import resolvers from './resolvers'
import * as express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import * as mongoose from 'mongoose'

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})

const server = new ApolloServer({
  schema,
})

mongoose.connect('mongodb://localhost:27017/learning-graphql');

const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
