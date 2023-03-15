import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import Button from '@mui/material/Button'
import { TextField, useTheme } from '@mui/material'
import { useRef } from 'react'

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const theme = useTheme()

  const name = useRef('')
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <form method="post" action="/api/auth/callback/credentials">
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField id="outlined-required" label="Username" />
            <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
          </div>
          <Button variant="contained" onClick={() => signIn('credentials', { username: 'daniel', password: 'pass' })}>
            Sign in with credentials
          </Button>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
  }
}
