import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { LoctasticContext } from '../contexts/LoctasticContext';
import NavBar from './NavBar';
import React from "react";
import CartItemView from './CartItem';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        margin: theme.spacing(1),
        width: '120ch',
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: '2ch',
    },
}))

export default function CartPageView() {
    const classes = useStyles();
    const { customerCart } = useContext(LoctasticContext);
    const cartItems = customerCart.getCartItems();
    return (
        <div className={classes.root}>
            <NavBar />
            {Object.keys(cartItems).map((key) => Number(key)).map((key) => <CartItemView key={cartItems[key].menuItem.id} cartItem={cartItems[key]} />)}
        </div>
    )
}