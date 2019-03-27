import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const logger = { log: e => console.log(e) }

const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.js'), { recursive: true })
const resolvers = mergeResolvers(resolversArray)

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'), { recursive: true })
const typeDefs = mergeTypes(typesArray, { all: true })

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
})

export default schema
