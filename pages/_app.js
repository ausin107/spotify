import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/globals.css'
import { store } from '../store'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
}

export default MyApp
