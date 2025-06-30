import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const validEmail = process.env.CREDENTIAL_USER
        const validPassword = process.env.CREDENTIAL_PASS

        console.log('Login attempt:', credentials)

        if (
          credentials.email === validEmail &&
          credentials.password === validPassword
        ) {
          return {
            id: '1',
            name: 'Afiq',
            email: validEmail
          }
        }

        // Return null jika login gagal
        return null
      }
    })
  ],
  pages: {
    signIn: '/login', // custom login page
    error: '/login'   // tetap di halaman login kalau error
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
})
