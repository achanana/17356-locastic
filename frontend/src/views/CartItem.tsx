import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { CartItem } from "../CartItem";

interface CartItemProps {
    cartItem: CartItem;
}

export default function CartItemView(props : CartItemProps) {
    return (
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={props.cartItem.menuItem.image}/>
                  </ListItemAvatar>
                <ListItemText primary={props.cartItem.menuItem.name} secondary={`Quantity: ${props.cartItem.getQty()}`} />
                ${props.cartItem.menuItem.price * props.cartItem.getQty()}
            </ListItem>
            <Divider />
        </div>
    );
}