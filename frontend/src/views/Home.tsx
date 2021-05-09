
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from './MenuItem';
import { itemCategories, menuItem } from '../model';
import { useStoreState, useStoreActions } from '../hooks'

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

export default function Home() {
    const classes = useStyles();
    const menuItems = useStoreState(state => state.menuItems)
    const fetchMenuItems = useStoreActions(actions => actions.fetchMenuItems)

    useEffect(() => {
        fetchMenuItems()
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.root}>
                <h2>Welcome, John Doe!</h2>
            </div>
            <h3>Bakery items</h3>
            <Grid container spacing={1}>
                { menuItems ? menuItems.filter(menuItem => menuItem.category === itemCategories.BakeryItem).map((menuItem: menuItem) => <MenuItem key={menuItem.id} menuItem={menuItem} />) : null }
            </Grid>
            <h3>Gift Baskets</h3>
            <Grid container spacing={1}>
                { menuItems ? menuItems.filter(menuItem => menuItem.category === itemCategories.GiftBasket).map((menuItem: menuItem) => <MenuItem key={menuItem.id} menuItem={menuItem} /> ) : null }
            </Grid>
        </div>
    )
}