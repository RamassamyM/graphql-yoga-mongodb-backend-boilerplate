import setupDatabase from './setup/database'
// import setupPassport from './setup/passport'
import setupGraphqlServer from './setup/graphqlserver'

async function main () {
  await setupDatabase()
  // await setupPassport()
  await setupGraphqlServer()
}

main()
