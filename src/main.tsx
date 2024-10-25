import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Routes from './route'

import 'react-toastify/dist/ReactToastify.css';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
    <ToastContainer theme='colored' position='top-center' />
  </StrictMode>,
)
