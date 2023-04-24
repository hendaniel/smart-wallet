import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import Button from '@mui/material/Button'
import { TextField, useTheme } from '@mui/material'
import { useRef, useState } from 'react'

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (event: any) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }
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
            <TextField id="outlined-required" label="Username" onChange={handleUsername} />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
          </div>
          <Button variant="contained" onClick={() => signIn('credentials', { username, password })}>
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
