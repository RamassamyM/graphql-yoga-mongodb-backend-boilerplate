// import Client from '../../../models/Client'
//
// export default {
//   Query: {
//     clients: () => {},
//     client: () => {},
//   },
//   Mutation: {
//     addClient: () => {},
//   },
//   Product: {
//     products: () => {},
//   },
// }
import ExempleObject from '../../models/exempleObject.model'
// import errors from './exemple.errors'
// import mongoose from 'mongoose'

export default {
  Query: {
    test (_, args, context) {
      return 'Hello World!!'
    },
    async getExempleObjects (_, context) {
      return ExempleObject.find({}, '_id name status')
    },
  },
  Mutation: {
    async createExempleObject (_, { name, status }) {
      const objectStatus = status || 'Pending'
      return ExempleObject.create({
        name,
        status: objectStatus,
      })
    },
  },
}
