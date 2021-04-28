import React from 'react';
import './App.css';
import Home from './views/Home';
import LoctasticContextProvider from './contexts/LoctasticContext';
import redVelvetCake from './images/redVelvetCake.jpg';
import blueberryMuffin from './images/blueberryMuffin.jpg';
import croissant from './images/croissant.jpg';
import cookieGiftBasket from './images/cookieGiftBasket.jpg';
import 'fontsource-roboto';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

export enum itemCategories {
  BakeryItem,
  GiftBasket,
}
export interface menuItem {
  id: number,
  name: string,
  price: number,
  image: string,
  seller: string,
  category: itemCategories,
};

export const menuItems : menuItem[] = [
  {
    id: 0,
    name: 'Red Velvet Cake',
    image: redVelvetCake,
    price: 15,
    category: itemCategories.BakeryItem,
    seller: "Jonathan Wang",
  },
  {
    id: 1,
    name: 'Blueberry Muffin',
    image: blueberryMuffin,
    price: 6,
    category: itemCategories.BakeryItem,
    seller: "Marie Smith",
  },
  {
    id: 2,
    name: 'Croissant',
    image: croissant,
    price: 4,
    category: itemCategories.BakeryItem,
    seller: "Panna Julia",
  },
  {
    id: 3,
    name: 'Cookie Gift Basket',
    image: cookieGiftBasket,
    price: 30,
    category: itemCategories.GiftBasket,
    seller: "Roger Ralph",
  }
]

export default function App() {
  return (
    <LoctasticContextProvider value={{ menuItems }}>
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
    </LoctasticContextProvider>
  );
}