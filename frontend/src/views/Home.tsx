
import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoctasticContext } from '../contexts/LoctasticContext';
import MenuItem from './MenuItem';
import { itemCategories, menuItem } from '../App';

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
    }
}))

export default function Home() {
    const classes = useStyles();
    const { menuItems } = useContext(LoctasticContext);
    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>       
                    <Typography className={classes.title}>
                        Loctastic
                    </Typography>
                    <Button>Home</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <h2>Welcome, John Doe!</h2>
            </div>
            <h3>Bakery items</h3>
            <Grid container spacing={1}>
                {menuItems.filter(menuItem => menuItem.category === itemCategories.BakeryItem).map((menuItem: menuItem) => <div key={menuItem.id}> <MenuItem menuItem={menuItem} /></div>)}
            </Grid>
            <h3>Gift Baskets</h3>
            <Grid container spacing={1}>
            {menuItems.filter(menuItem => menuItem.category === itemCategories.GiftBasket).map((menuItem: menuItem) => <div key={menuItem.id}><MenuItem menuItem={menuItem} /></div>)}
            </Grid>
        </div>
    )
}