import { wrapper } from '../redux/store'
import 'antd/dist/antd.css';
import 'react-notifications-component/dist/theme.css'
import '../styles/scss/main.scss'

import ReactNotification from 'react-notifications-component'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ReactNotification />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
