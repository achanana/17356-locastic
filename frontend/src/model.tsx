import { Action, Thunk } from 'easy-peasy'

export enum itemCategories {
  BakeryItem = 'BakeryItem',
  GiftBasket = 'GiftBasket',
}

export interface menuItem {
  id: number
  name: string
  price: number
  image: string
  seller: string
  category: itemCategories
  description?: string
  rating: number
}

export interface storeModel {
  menuItems: menuItem[]
  setMenuItems: Action<storeModel, menuItem[]>
  fetchMenuItems: Thunk<storeModel>
}
