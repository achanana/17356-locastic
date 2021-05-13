import 'fontsource-roboto'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Cart from './Cart'
import LoctasticContextProvider from './contexts/LoctasticContext'
import blueberryMuffin from './images/blueberryMuffin.jpg'
import cookieGiftBasket from './images/cookieGiftBasket.jpg'
import croissant from './images/croissant.jpg'
import redVelvetCake from './images/redVelvetCake.jpg'
import { itemCategories, menuItem } from './model'
import {
  CartPageView,
  Checkout,
  Footer,
  ItemPage,
  NavBar,
  SellerSignUpForm,
} from './views'
import Home from './views/Home'

const defaultDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, mi nec interdum blandit, justo lacus suscipit arcu, at porta magna metus sed lacus. Nullam in nunc vitae turpis ullamcorper tempor at eget leo. Curabitur condimentum ipsum id velit porta consectetur. Aliquam eget velit non ipsum dapibus suscipit id sed nisi. Ut viverra velit eu mi placerat, in consequat leo blandit. Suspendisse tristique quam id odio mattis elementum. Cras elementum tellus at volutpat pulvinar. Fusce vehicula sollicitudin tempus. Suspendisse potenti. Quisque rhoncus iaculis neque eget vestibulum. Quisque tempus pretium ligula non euismod.'

export const menuItems: menuItem[] = [
  {
    id: 0,
    name: 'Red Velvet Cake',
    image: redVelvetCake,
    price: 15,
    category: itemCategories.BakeryItem,
    seller: 'Jonathan Wang',
    description: defaultDescription,
  },
  {
    id: 1,
    name: 'Blueberry Muffin',
    image: blueberryMuffin,
    price: 6,
    category: itemCategories.BakeryItem,
    seller: 'Marie Smith',
    description: defaultDescription,
  },
  {
    id: 2,
    name: 'Croissant',
    image: croissant,
    price: 4,
    category: itemCategories.BakeryItem,
    seller: 'Panna Julia',
    description: defaultDescription,
  },
  {
    id: 3,
    name: 'Cookie Gift Basket',
    image: cookieGiftBasket,
    price: 30,
    category: itemCategories.GiftBasket,
    seller: 'Roger Ralph',
    description: defaultDescription,
  },
]

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
      value={{ menuItems, customerCart, addItemToCart, removeItemFromCart }}
    >
      <div style={{ backgroundColor: '#f2e9da' }}>
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
