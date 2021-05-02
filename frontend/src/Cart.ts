import { menuItem } from "./App";
import { CartItem } from "./CartItem";

interface cartItemDict {
  [id: number]: CartItem;
}

export default class Cart {
  cartItems: cartItemDict = {};

  setTo(anotherCart: Cart) {
    this.cartItems = anotherCart.cartItems;
    return this;
  }

  incrementQty(item: menuItem) {
    if (item.id in this.cartItems) {
      this.cartItems[item.id].incrementQty();
    } else {
      this.cartItems[item.id] = new CartItem(item, 1);
    }
    return this;
  }
  decrementQty(item: menuItem) {
    if (item.id in this.cartItems) {
      if (this.cartItems[item.id].getQty() == 1) {
        delete this.cartItems[item.id];
      } else {
        this.cartItems[item.id].decrementQty();
      }
    }
    return this;
  }
  clearCart() {
    this.cartItems = {};
    return this;
  }
  getQty(item: menuItem) {
    if (item.id in this.cartItems) {
      return this.cartItems[item.id].getQty();
    } else {
      return 0;
    }
  }
  getCartItems() {
    return this.cartItems;
  }
}
