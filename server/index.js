const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const cors = require('cors')

const app = express()

const schema = buildSchema(`
  type Query {
    language: String
  }
`)

const rootValue = {
    language: () => 'GraphQL'
}


app.use(cors())

app.use('/graphql', graphqlHTTP({
    rootValue, schema, graphiql: true
}))

app.listen(4000, () => console.log('Listening on 4000'))