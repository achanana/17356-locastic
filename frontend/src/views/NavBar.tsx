import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useContext } from "react";
import { LoctasticContext } from "../contexts/LoctasticContext";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: '2ch',
    },
    navBar: {
    }
}))

export default function NavBar() {
    const classes = useStyles();
    const { customerCart } = useContext(LoctasticContext);
    return (
        <Box mb={4}>
        <AppBar position="static" color="transparent" className={classes.navBar}>
            <Toolbar>       
                <Typography className={classes.title}>
                    Loctastic
                </Typography>
                <Button component={ Link } to="/">Home</Button>
                <Button component={ Link } to="/cart">
                    <Badge badgeContent={customerCart.getTotalQty()} color="primary">
                        <ShoppingCartIcon/>
                    </Badge>
                </Button>
            </Toolbar>
        </AppBar>
        </Box>
    )
}