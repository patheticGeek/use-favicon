import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import '@utils/twindSetup'
import 'twind/shim'

import '@styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next App Boilerplate</title>
        <meta name="description" content="Next App Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
