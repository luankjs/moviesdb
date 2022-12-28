import Head from 'next/head'

import Layout from '../domain/Layout'

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <title>Movies DB</title>
        <meta name="description" content="The Unofficial Database of Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Welcome to MoviesDB!</h1>
    </Layout>
  )
}

export default HomePage
