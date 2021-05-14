import 'fontsource-roboto'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Cart from './Cart'
import LoctasticContextProvider from './contexts/LoctasticContext'
import { menuItem } from './model'
import {
  CartPageView,
  Checkout,
  Footer,
  ItemPage,
  NavBar,
  NewItemForm,
  PaymentProcessing,
  SellerSignUpForm,
} from './views'
import Home from './views/Home'

export default function App() {
  const [customerCart, setCustomerCart] = useState(new Cart())
  const addItemToCart = (menuItem: menuItem) => {
    const newCart = new Cart().setTo(customerCart).incrementQty(menuItem)
    setCustomerCart(newCart)
  }
  const removeItemFromCart = (menuItem: menuItem) => {
    const newCart = new Cart().setTo(customerCart).decrementQty(menuItem)
    setCustomerCart(newCart)
  }
  return (
    <LoctasticContextProvider
      value={{ customerCart, addItemToCart, removeItemFromCart }}
    >
      <div style={{ backgroundColor: '#f2e9da', height: '100%' }}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/cart">
              <CartPageView />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/item/:id">
              <ItemPage />
            </Route>
            <Route path="/seller-signup">
              <SellerSignUpForm />
            </Route>
            <Route path="/add-item">
              <NewItemForm />
            </Route>
            <Route path="/processing/:id">
              <PaymentProcessing />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    </LoctasticContextProvider>
  )
}
