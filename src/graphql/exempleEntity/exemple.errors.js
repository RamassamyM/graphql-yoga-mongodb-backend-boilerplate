import { createError } from 'apollo-errors'

export default {
  EntityError: createError('ExempleEntityError', {
    message: 'This is an entity exception',
  }),
}
