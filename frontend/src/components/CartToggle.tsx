import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';

import { LoctasticContext } from '../contexts/LoctasticContext';
import { menuItem } from '../App';


const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
      },
}))

interface Props {
    menuItem: menuItem
}

const AddToCartToggle = (props: Props) => {
    const classes = useStyles();
    const { customerCart, addItemToCart, removeItemFromCart } = useContext(LoctasticContext);

    return (
        <div className={classes.controls}>
            <IconButton color="secondary" className={'qty_decrement'} onClick={()=>{removeItemFromCart(props.menuItem)}}>-</IconButton>
            <Typography>
                {customerCart.getQty(props.menuItem)}
            </Typography>
            <IconButton color="secondary" className={'qty_increment'} onClick={()=>{addItemToCart(props.menuItem)}}>+</IconButton>
        </div>
    )

}

export default AddToCartToggle