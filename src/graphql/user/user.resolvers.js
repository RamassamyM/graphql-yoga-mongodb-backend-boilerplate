// import { GraphQLScalarType } from 'graphql'
// import moment from 'moment'
import User from '../../models/user.model'
import { WrongCredentialsError, EmailError, DeleteError, EditUser } from './user.errors'
import getRandomAvatarColor from '../utils/getRandomAvatarColor'
import { authenticated } from '../utils/authenticated'

export default {
  Query: {
    users: authenticated((root, args, context) => User.find({}, '_id email firstname lastname avatarColor')),
    user: authenticated((root, args, context) => User.findOne({ _id: args._id }, '_id firstname lastname avatarColor email')),
    me: authenticated((root, args, context) => context.currentUser),
  },
  Mutation: {
    captureEmail: async (root, { email }, context) => {
      try {
        const userWithSameEmailInDB = await User.findOne({ email })
        if (userWithSameEmailInDB) {
          throw new EmailError()
        }
        return User.create({ email })
      } catch (err) {
        throw err
      }
    },
    signup: async (root, { _id, firstname, lastname, password }, context) => {
      try {
        const avatarColor = await getRandomAvatarColor()
        return User.signup(_id, firstname, lastname, password, avatarColor)
      } catch (err) {
        throw err
      }
    },
    login: async (root, { email, password }, context) => {
      const { token, user } = await User.authenticate(email, password)
      if (!token || !user) {
        throw new WrongCredentialsError()
      }
      return { token, user }
    },
    editUser: authenticated(async (root, args, context) => {
      try {
        const options = { new: true, runValidators: true }
        const query = { _id: args._id }
        await delete args.__id
        return User.findOneAndUpdate(query, args, options)
      } catch (err) {
        console.log(err)
        throw new EditError('Error while trying to edit user.')
      }
    }),
    deleteUserWithPassword: authenticated(async (root, args, context) => {
      try {
        return User.deleteWithPassword(args)
      } catch (err) {
        console.log(err)
        throw new DeleteError('Error while deleting')
      }
    }),
    deleteUser: authenticated(async function (root, args, context) {
      const user = await User.findByIdAndRemove(args)
      if (!user) {
        throw new DeleteError('Error while deleting')
      }
      return user
    }),
  },
}
