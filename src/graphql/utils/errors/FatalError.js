import { createError } from 'apollo-errors'

const FatalError = ({ data }) => createError('FatalError', data)

export { FatalError }
