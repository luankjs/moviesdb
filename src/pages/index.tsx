import Head from 'next/head'

import Layout from '../domain/Layout'

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <title>Movies DB | Filmes</title>
      </Head>
      <h1>Welcome to MoviesDB!</h1>
    </Layout>
  )
}

export default HomePage
