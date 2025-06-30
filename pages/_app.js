import '../styles/globals.css'
import Layout from '../components/Layout'
import { ThemeProvider } from '../context/ThemeContext'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      {/* Global <head> metadata */}
      <Head>
        <title key="title">RegenFit</title>
        <meta
          key="description"
          name="description"
          content="RegenFit – aplikasi latihan sehat untuk persiapan mendaki dan membentuk tubuh ideal"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/regenfit-logo.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {/* Wrapper untuk session auth dan tema */}
      <SessionProvider session={session}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}
