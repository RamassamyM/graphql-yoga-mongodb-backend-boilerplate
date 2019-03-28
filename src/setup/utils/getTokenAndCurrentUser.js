import jwt from 'jsonwebtoken'
import { SECRET } from '../../config'
import { AuthenticationError } from 'apollo-server-errors'
import User from '../../models/user.model'
import mongoose from 'mongoose'

async function tradeTokenForUserId (authToken) {
  const { _id } = jwt.verify(authToken, SECRET)
  if (_id) {
    return _id
  }
  throw new AuthenticationError('Authentication failed while checking validity token')
}

async function getTokenFromRequest (request) {
  const authorization = await request.headers['authorization']
  if (authorization) {
    const authToken = await authorization.replace('Bearer ', '')
    return authToken
  }
  throw new AuthenticationError('Authentication failed while searching token')
}

export default async function getTokenAndCurrentUser (request) {
  let authToken = null
  let currentUser = null
  try {
    authToken = await getTokenFromRequest(request)
    if (authToken) {
      const _id = await tradeTokenForUserId(authToken)
      currentUser = await User.findById(_id)
    }
  } catch (err) {
    console.warn(err.message)
    console.warn(`Unable to authenticate using auth token: ${authToken}`)
  }
  return {
    authToken,
    currentUser,
  }
}
