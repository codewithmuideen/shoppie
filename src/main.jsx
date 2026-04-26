import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { UIProvider } from './context/UIContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <ProductProvider>
          <CartProvider>
            <UIProvider>
              <App />
            </UIProvider>
          </CartProvider>
        </ProductProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
)
