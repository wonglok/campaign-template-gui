// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import clientPromise from 'database/mongo'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const PREFIX = `PASSWORD_`

export let authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (process.env[PREFIX + credentials.username] === credentials.password) {
          return {
            id: credentials.username,
            name: credentials.username,
            username: credentials.username,
          }
        } else {
          return null
        }
      },
    }),
  ],
}
export default NextAuth(authOptions)
