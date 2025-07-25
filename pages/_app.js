import '../styles/globals.css'
import Layout from '../components/Layout'
import { ThemeProvider } from '../context/ThemeContext'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
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

      {/* Tanpa session provider */}
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
