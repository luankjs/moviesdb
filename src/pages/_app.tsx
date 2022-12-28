import type { AppProps } from 'next/app'

import Layout from '../domain/Layout'

import '../styles/main.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
