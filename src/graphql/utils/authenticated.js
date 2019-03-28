import { AuthenticationError } from 'apollo-server-errors'

export const authenticated = next => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new AuthenticationError('You need to be authenticated to access the ressource.')
  }
  return next(root, args, context, info)
}
