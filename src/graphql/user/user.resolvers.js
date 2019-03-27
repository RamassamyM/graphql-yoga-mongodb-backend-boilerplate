// import { GraphQLScalarType } from 'graphql'
// import moment from 'moment'
import User from '../../models/user.model'
import errors from './user.errors'
// import { errorHandlerWrapper } from '../utils/errorHandlerWrapper'
import getRandomAvatarColor from '../utils/getRandomAvatarColor'
import { ApolloError } from 'apollo-server-errors'

export default {
  Query: {
    async users (_, context) {
      return User.find({}, '_id email firstname lastname avatarColor')
    },
    async user (_, args) {
      return User.findOne({_id: args._id}, '_id firstname lastname avatarColor email')
    },
  },
  Mutation: {
    async captureEmail (_, { email }) {
      try {
        const userWithSameEmailInDB = await User.findOne({ email })
        if (userWithSameEmailInDB) {
          throw new errors.EmailError()
        }
        return User.create({ email })
      } catch (err) {
        throw err
      }
    },
    async signup (_, { _id, firstname, lastname, password }) {
      try {
        const avatarColor = await getRandomAvatarColor()
        return User.signup(_id, firstname, lastname, password, avatarColor)
      } catch (err) {
        throw err
      }
    },
    async login (_, { email, password }) {
      const { token, user } = await User.authenticate(email, password)
      if (!token || !user) { throw new errors.WrongCredentialsError() }
      return { token, user }
    },
    async editUser (_, params) {
      try {
        const options = { new: true, runValidators: true }
        const query = { _id: params._id }
        await delete params.__id
        return User.findOneAndUpdate(query, params, options)
      } catch (err) {
        throw err
      }
    },
    async deleteUser (_, params) {
      try {
        return User.delete(params)
      } catch (err) {
        throw err
      }
    }
  },
}
