import { menuItem } from "./App";
import { CartItem } from "./CartItem";

interface cartItemDict {
  [id: number]: CartItem;
}

export default class Cart {
  cartItems: cartItemDict = {};
  incrementQty(item: menuItem) {
    if (item.id in this.cartItems) {
      this.cartItems[item.id].incrementQty();
    } else {
      this.cartItems[item.id] = new CartItem(item, 1);
    }
  }
  decrementQty(item: menuItem) {
    if (item.id in this.cartItems) {
      if (this.cartItems[item.id].getQty() == 1) {
        delete this.cartItems[item.id];
      } else {
        this.cartItems[item.id].decrementQty();
      }
    }
  }
  clearCart() {
    this.cartItems = {};
  }
  getQty(item: menuItem) {
    if (item.id in this.cartItems) {
      return this.cartItems[item.id].getQty();
    } else {
      return 0;
    }
  }
}
