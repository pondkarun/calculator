import { wrapper } from '../redux/store'
import 'antd/dist/antd.css';
// import 'react-notifications-component/dist/theme.css'
import '../styles/scss/main.scss'
import { useDispatch } from "react-redux";
// import ReactNotification from 'react-notifications-component'
import { useEffect } from 'react';
import { setUser } from '../redux/actions/userActions'



function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const lastUsers = JSON.parse(localStorage.getItem("lastUsers")) ?? []
    dispatch(setUser(lastUsers))
  }, [])


  return (
    <>
      {/* <ReactNotification /> */}
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
