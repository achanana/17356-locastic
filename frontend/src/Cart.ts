import { menuItem } from './App';
import { CartItem } from './CartItem';

interface cartItemDict {
    [id: number]: CartItem;
}

export default class Cart {
    cartItems: cartItemDict = {};
    addToCart(item: menuItem, qty: number) {
        this.cartItems[item.id] = new CartItem(qty);
    }
    incrementQty(item: menuItem) {
        if (item.id in this.cartItems) {
            this.cartItems[item.id].incrementQty();
        } else {
            this.cartItems[item.id] = new CartItem(item, 1);
        }
    }
    decrementQty(item: menuItem) {
        if (item.id in this.cartItems) {
            this.cartItems[item.id].decrementQty();
        }
    }
    clearCart() {
        this.cartItems = {};
    }
}