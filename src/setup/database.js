import mongoose from 'mongoose'
import { MONGO_URI, DB_DEBUG } from '../config'

export default function () {
  mongoose.set('debug', DB_DEBUG)
  mongoose.set('useFindAndModify', false)
  mongoose
    .connect(
      MONGO_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
      }
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))
}
