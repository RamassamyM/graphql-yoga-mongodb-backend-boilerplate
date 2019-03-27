require('dotenv').config()

// Explicit
export const MONGO_URI = process.env.MONGODB_URI

// Have Defaults
export const PORT = process.env.PORT || 5000
export const SECRET = process.env.SECRET
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8080'
export const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:5000'
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || undefined
export const COOKIE_NAME = process.env.COOKIE_NAME || 'api-graphql-cookie'
export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || '/graphql'
export const SUBSCRIPTION_ENDPOINT = process.env.SUBSCRIPTION_ENDPOINT || '/subscriptions'
export const PLAYGROUND_ENDPOINT = process.env.PLAYGROUND_ENDPOINT || '/playground'
export const DB_NAME = process.env.DB_NAME || 'appDB'
// Set these debug options to true to console log all graphql queries infos and mongoose database queries
export const DB_DEBUG = process.env.DB_DEBUG ? process.env.DB_DEBUG === 'true' : false
export const GRAPHQL_DEBUG = process.env.GRAPHQL_DEBUG ? process.env.GRAPHQL_DEBUG === 'true' : false
