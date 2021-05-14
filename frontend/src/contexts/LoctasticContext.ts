import { createContext } from 'react'
import Cart from '../Cart'
import { menuItem } from '../model'

interface LoctasticContextInterface {
  customerCart: Cart
  addItemToCart(menuItem: menuItem): void
  removeItemFromCart(menuItem: menuItem): void
}

export const LoctasticContext = createContext<LoctasticContextInterface>({
  customerCart: new Cart(),
  addItemToCart: () => {},
  removeItemFromCart: () => {},
})
const LoctasticContextProvider = LoctasticContext.Provider
export default LoctasticContextProvider
