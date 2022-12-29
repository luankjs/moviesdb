import type { AppProps } from 'next/app'

import '../styles/main.scss'
import 'animate.css'
import { AuthProvider } from '../contexts/AuthContext'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
