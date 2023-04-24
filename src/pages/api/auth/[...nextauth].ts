import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any
        const users = {
          daniel: 'pandahermosa',
          sofia: 'cerdihermoso',
        } as any
        if (users[username] === password) {
          return { id: '1', name: 'User', email: 'danielmartinezdm@hotmail.com' }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
}

export default NextAuth(authOptions)
