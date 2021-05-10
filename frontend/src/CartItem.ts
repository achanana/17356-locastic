import { menuItem } from "./model";

export class CartItem {
  quantity: number;
  menuItem: menuItem;
  constructor(menuItem: menuItem, qty: number) {
    this.quantity = qty;
    this.menuItem = menuItem;
  }
  changeQuantity(newQty: number) {
    this.quantity = newQty;
  }
  incrementQty() {
    this.quantity += 1;
  }
  decrementQty() {
    this.quantity -= 1;
    this.quantity = Math.max(0, this.quantity);
  }
  getQty() {
    return this.quantity;
  }
}
