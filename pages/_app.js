import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/globals.css'
import Head from 'next/head'
import { store } from '../store'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return (
    <Provider store={store}>
      <Head>
        <title>Spotify - Home</title>
        <link rel='icon' href='/SpotifyLogo.png' />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )
}

export default MyApp
