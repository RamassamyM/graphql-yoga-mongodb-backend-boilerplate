import bcryptjs from 'bcryptjs'

export function hashPassword (passwordString) {
  return bcryptjs.hash(passwordString, 10)
}

export function comparePassword (password1, password2) {
  return bcryptjs.compare(password1, password2)
}
