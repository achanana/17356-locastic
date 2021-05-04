import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React, { useContext } from "react";
import { CartItem } from "../CartItem";
import { LoctasticContext } from "../contexts/LoctasticContext";

interface CartItemProps {
    cartItem: CartItem;
}

export default function CartItemView(props : CartItemProps) {
    const { removeItemFromCart, addItemToCart } = useContext(LoctasticContext)

    return (
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={props.cartItem.menuItem.image}/>
                  </ListItemAvatar>
                <ListItemText primary={props.cartItem.menuItem.name} 
                    secondary={
                        <div>
                        <IconButton color="secondary" onClick={()=>{removeItemFromCart(props.cartItem.menuItem)}}>-</IconButton>
                        {props.cartItem.getQty()}
                        <IconButton color="secondary" onClick={()=>{addItemToCart(props.cartItem.menuItem)}}>+</IconButton>
                        </div>
                    } />
                ${props.cartItem.menuItem.price * props.cartItem.getQty()}
            </ListItem>
            <Divider />
        </div>
    );
}