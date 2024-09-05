import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './components/ContextProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Log from './routes/Log.jsx'
import Post from './routes/Post.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/log',
    element: <Log />
  },
  {
    path: '/post/:post_id/read',
    element: <Post />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
