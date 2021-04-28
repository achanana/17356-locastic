import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { menuItem } from '../App';
import { LoctasticContext } from '../contexts/LoctasticContext';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      margin: theme.spacing(2),
      minHeight: 180
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
      alignItems: 'right',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
}));

interface Props {
    menuItem: menuItem
}

export default function MenuItem(props : Props) {
    const classes = useStyles();
    const { customerCart } = useContext(LoctasticContext);

    return (
        <Grid item xs={4}>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {props.menuItem.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            ${props.menuItem.price} / unit
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                      {props.menuItem.quantity == null && <IconButton aria-label="previous" color="secondary" variant="contained" onClick={()=>{decrement(props.menuItem.id)}}>-</IconButton>}
                      {props.menuItem.quantity ? props.quantity : cart[props.donut.id]}s
                      {props.menuItem.quantity == null && <IconButton aria-label="previous" color="secondary" variant="contained" onClick={()=>{customerCart.incrementQty(props.menuItem)}}>+</IconButton>}
                    </div>
                </div>
                <CardMedia className={classes.cover} image={props.menuItem.image} title="Another menu item" />
            </Card>
        </Grid>
    )
}