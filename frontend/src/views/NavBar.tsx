import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useContext } from "react";
import { LoctasticContext } from "../contexts/LoctasticContext";
import Logo from '../images/locastic-logo.svg'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: '2ch',
        overflow: 'hidden',
    },
    navBar: {
        backgroundColor: '#f6f3e7',
    },
    logo: {
        margin: '-125px -100px -125px -100px',
        height: '350px',
    },
}))

export default function NavBar() {
    const classes = useStyles();
    const { customerCart } = useContext(LoctasticContext);
    return (
        <Box mb={4}>
        <AppBar position="static" color="transparent" className={classes.navBar}>
            <Toolbar>       
                <Typography className={classes.title}>
                    <Link component={RouterLink} color='inherit' to='/'>
                        <img src={Logo} alt="Locastic" className={classes.logo} />
                    </Link>
                </Typography>
                <Button component={RouterLink} to="/cart">
                    <Badge badgeContent={customerCart.getTotalQty()} color="primary">
                        <ShoppingCartIcon/>
                    </Badge>
                </Button>
            </Toolbar>
        </AppBar>
        </Box>
    )
}