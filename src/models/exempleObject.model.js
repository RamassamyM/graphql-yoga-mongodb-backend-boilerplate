import mongoose from 'mongoose'
// import moment from 'moment'
// const ObjectId = Schema.Types.ObjectId

const schema = {
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}

const ExempleObject = mongoose.model('ExempleObject', new mongoose.Schema(schema, { timestamps: true }))

export default ExempleObject
