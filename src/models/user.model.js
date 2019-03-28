import mongoose from 'mongoose'
import generateToken from './utils/generateToken'
import { hashPassword, comparePassword } from './utils/passwordLib'

const schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
  },
  password: String,
  avatarColor: String,
  role: {
    type: String,
    default: 'user',
  },
  roleAdmin: {
    type: Boolean,
    default: false,
  },
  isEmailValidated: {
    type: Boolean,
    default: false,
  },
  isSignedUp: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

schema.statics.signup = async (_id, firstname, lastname, password, avatarColor) => {
  try {
    const userPromise = new Promise(async function (resolve, reject) {
      const foundUser = await User.findById(_id)
      if (!foundUser) {
        reject(new Error('There was a problem whith the user'))
      } else {
        if (foundUser.isSignedUp) {
          reject(new Error('This user has already signed up.'))
        }
        resolve(foundUser)
      }
    })
    const passwordPromise = new Promise(async function (resolve, reject) {
      const hashed = await hashPassword(password)
      if (!hashed) {
        reject(new Error('There was a problem wih hashing password'))
      } else {
        resolve(hashed)
      }
    })
    const [user, hashedPassword] = await Promise.all([userPromise, passwordPromise])
    await user.set({ password: hashedPassword, avatarColor, firstname, lastname, isSignedUp: true })
    await user.save()
    const token = await generateToken({ _id: user._id })
    return { token, user }
  } catch (err) {
    throw err
  }
}

schema.statics.authenticate = async (email, password) => {
  try {
    // check if user exits
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('There was a problem with your email')
    }
    // if user, verify the user password with the password provided
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      throw new Error('There was a problem with your password')
    }
    // assign the user a token
    const token = await generateToken({ _id: user._id })
    return { token, user }
  } catch (err) {
    throw err
  }
}

schema.statics.deleteWithPassword = async ({ _id, password }) => {
  try {
    const userToDelete = await User.findOne({ _id })
    if (!userToDelete) {
      throw new Error('There was a problem with this user')
    }
    const isValidPassword = await comparePassword(password, userToDelete.password)
    if (!isValidPassword) {
      throw new Error('There was a problem while trying to delete the user')
    }
    const deletedUser = await User.deleteOne({ _id })
    if (!deletedUser) {
      throw new Error('Error while trying to delete the user')
    }
    return { user: userToDelete, confirmed: true }
  } catch (err) {
    throw err
  }
}

const User = mongoose.model('User', schema)

export default User
