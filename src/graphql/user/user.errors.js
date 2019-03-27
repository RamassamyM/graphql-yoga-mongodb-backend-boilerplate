import { ApolloError } from 'apollo-server-errors'

export class WrongCredentialsError extends ApolloError {
  constructor() {
    super('WrongCredentialsError', 'CREDENTIALS_ERROR',
          { message: 'The provided credentials are invalid.' }
    )
  }
}

export class EmailError extends ApolloError {
  constructor() {
    super('EmailError', "EMAIL_ERROR",
          { message: 'There was a problem with your email.' }
    )
  }
}
