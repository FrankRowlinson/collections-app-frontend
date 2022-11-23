import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.REACT_APP_HOST

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
