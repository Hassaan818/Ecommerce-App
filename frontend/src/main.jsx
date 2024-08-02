import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import { loader as productsLoader } from './pages/HomePage.jsx'
import { loader as productLoader } from './pages/ProductPage.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomePage />} loader={productsLoader} />
      <Route path='/product/:id' element={<ProductPage />} loader={productLoader} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
