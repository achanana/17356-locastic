import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import React from "react";

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
}))

export default function NavBar() {
    const classes = useStyles();
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>       
                <Typography className={classes.title}>
                    Loctastic
                </Typography>
                <Button component={ Link } to="/">Home</Button>
                <Button component={ Link } to="/cart">Cart</Button>
            </Toolbar>
        </AppBar>
    )
}