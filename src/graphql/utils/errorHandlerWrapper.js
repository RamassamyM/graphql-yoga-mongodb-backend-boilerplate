import { FatalError } from './errors/FatalError'

const errorHandlerWrapper = (resolver) => async (...args) => {
  try {
    //
    // Try to execute the actual resolver and return
    // the result immediately.
    //
    return await resolver(...args)
  } catch (err) {
    if (err.path) {
      throw new FatalError({ data: { message: err.message } })
    } else {
      throw err
    }
  }
}

export { errorHandlerWrapper }
