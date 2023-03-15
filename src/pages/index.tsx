import ResponsiveAppBar from '@/lib/components/AppBar'
import withAuth from '@/lib/hocs/withAuth'
import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Smart Wallet</title>
        <meta name="description" content="Easy your life with this virtual wallet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <ResponsiveAppBar></ResponsiveAppBar>
      </main>
    </>
  )
}
export default withAuth(Home)
