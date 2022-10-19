import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import getToken from './services/getToken'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.REACT_APP_HOST
axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
