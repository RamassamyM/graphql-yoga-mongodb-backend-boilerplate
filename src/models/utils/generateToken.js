import jwt from 'jsonwebtoken'
import { SECRET } from '../../config'

export default function (dataObject) {
  try {
    return jwt.sign(
      dataObject,
      SECRET,
      { expiresIn: '2d' }
    )
  } catch (err) {
    throw err
  }
}
