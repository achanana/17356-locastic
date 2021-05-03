import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { LoctasticContext } from '../contexts/LoctasticContext';
import NavBar from './NavBar';
import React from "react";
import CartItemView from './CartItem';
import { Button, Grid, List, Typography } from '@material-ui/core';

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
    cartList: {
        backgroundColor: '#eeeeee',
        minHeight: '500px'
    }
}))

export default function CartPageView() {
    const classes = useStyles();
    const { customerCart } = useContext(LoctasticContext);
    const cartItems = customerCart.getCartItems();
    return (
        <div className={classes.root}>
            <NavBar />
            <Grid container spacing={10}>
                <Grid item xs={6}>
                    <List className={classes.cartList}>
                        {Object.keys(cartItems).map((key) => Number(key)).map((key) => <CartItemView key={cartItems[key].menuItem.id} cartItem={cartItems[key]} />)}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">
                    Total: ${customerCart.cartTotal()}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Check out
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}