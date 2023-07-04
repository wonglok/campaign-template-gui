import { SessionProvider } from 'next-auth/react'
import '../src/css/global.css'

export default function Page({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps}></Component>
      </SessionProvider>
    </>
  )
}
