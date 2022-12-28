import type { AppProps } from 'next/app'

import '../styles/main.scss'
import 'animate.css';

const App = ({ Component, pageProps }: AppProps) => {
  return(
    <Component {...pageProps} />
  )
}

export default App
