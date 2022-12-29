import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://kit.fontawesome.com/f0f1fd88a3.js"
          crossOrigin="anonymous"
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />

        <meta name="description" content="The Unofficial Database of Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
