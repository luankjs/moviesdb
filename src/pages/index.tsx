import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <>
      <Head>
        <title>Movies DB</title>
        <meta name="description" content="The Unofficial Database of Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Welcome to MoviesDB!</h1>
    </>
  )
}

export default Home
