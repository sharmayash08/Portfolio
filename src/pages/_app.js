/* eslint-disable @next/next/no-document-import-in-page */
  import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
  import { body } from 'next/document'

  import { Montserrat } from 'next/font/google'
  import Head from 'next/head'

  const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-mont',
  })

  export default function App({ Component, pageProps }) {
    const newLocal = <Component {...pageProps} />
    return (
        <>
          <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${montserrat.variable} font-mont bg-light w-full min-h-screen dark:bg-dark`}>
        <Navbar />
        {newLocal}
        <Footer />
      </main>
        </>
      
      )
  }
