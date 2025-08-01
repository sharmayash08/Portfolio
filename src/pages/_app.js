/* eslint-disable @next/next/no-document-import-in-page */
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'
import Head from 'next/head'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  )
}
