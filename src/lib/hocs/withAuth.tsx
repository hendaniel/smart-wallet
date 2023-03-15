import { getSession } from 'next-auth/react'
import { Component } from 'react'
import type { NextPage, NextPageContext } from 'next'

const withAuth = (Page: NextPage) => {
  class ProtectedPage extends Component {
    static async getInitialProps(context: NextPageContext) {
      if (!context.res) return {}
      const session = await getSession({ req: context.req })
      if (!session) context.res.writeHead(301, { Location: '/auth/signin' }).end()
      return {}
    }

    render() {
      return <Page {...this.props} />
    }
  }
  return ProtectedPage
}

export default withAuth
