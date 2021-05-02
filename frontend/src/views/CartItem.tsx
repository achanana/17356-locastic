import React from "react";
import { CartItem } from "../CartItem";

interface CartItemProps {
    cartItem: CartItem;
}

export default function CartItemView(props : CartItemProps) {
    return (
        <div>
            Name: {props.cartItem.menuItem.name}
            Quantity: {props.cartItem.getQty()}
            Price: {props.cartItem.menuItem.price * props.cartItem.getQty()}
        </div>
    );
}