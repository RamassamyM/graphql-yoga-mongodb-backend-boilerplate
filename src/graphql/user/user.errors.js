export default {
  WrongCredentialsError: () => {
    new Error('WrongCredentialsError', {
      message: 'The provided credentials are invalid.',
    })
  },
  EmailError: () => {
    new Error('EmailError', {
      message: 'There was a problem with your email.',
    })
  },
}
