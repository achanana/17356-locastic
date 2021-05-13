import { CartItem } from './CartItem'
import { menuItem } from './model'

interface cartItemDict {
  [id: number]: CartItem
}

export default class Cart {
  cartItems: cartItemDict = {}

  setTo(anotherCart: Cart) {
    this.cartItems = anotherCart.cartItems
    return this
  }

  incrementQty(item: menuItem) {
    if (item.id in this.cartItems) {
      this.cartItems[item.id].incrementQty()
    } else {
      this.cartItems[item.id] = new CartItem(item, 1)
    }
    return this
  }
  decrementQty(item: menuItem) {
    if (item.id in this.cartItems) {
      if (this.cartItems[item.id].getQty() == 1) {
        delete this.cartItems[item.id]
      } else {
        this.cartItems[item.id].decrementQty()
      }
    }
    return this
  }
  clearCart() {
    this.cartItems = {}
    return this
  }
  getQty(item: menuItem) {
    if (item.id in this.cartItems) {
      return this.cartItems[item.id].getQty()
    } else {
      return 0
    }
  }
  getCartItems() {
    return this.cartItems
  }
  getTotalQty() {
    return Object.keys(this.cartItems)
      .map((key) => Number(key))
      .map((key) => this.cartItems[key])
      .reduce((total, cartItem) => total + cartItem.getQty(), 0)
  }
  cartTotal() {
    return Object.keys(this.cartItems)
      .map((key) => Number(key))
      .map((key) => this.cartItems[key])
      .reduce(
        (total, cartItem) =>
          total + cartItem.getQty() * cartItem.menuItem.price,
        0,
      )
  }
}
