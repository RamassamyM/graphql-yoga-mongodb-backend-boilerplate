import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
// import ConstraintDirective from 'graphql-constraint-directive'

const logger = { log: e => console.log(e) }

const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.js'), { recursive: true })
const resolvers = mergeResolvers(resolversArray)

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'), { recursive: true })
const typeDefs = mergeTypes(typesArray, { all: true })

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
  // schemaDirectives: { constraint: ConstraintDirective },
})

export default schema

// Note on makeExecutableSchema options : see the doc :
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers, // optional
//   logger, // optional
//   allowUndefinedInResolve = false, // optional
//   resolverValidationOptions = {}, // optional
//   directiveResolvers = null, // optional
//   schemaDirectives = null,  // optional
//   parseOptions = {},  // optional
//   inheritResolversFromInterfaces = false  // optional
// });
