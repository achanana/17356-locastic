import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { menuItem } from '../App';

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
                </div>
                <CardMedia className={classes.cover} image={props.menuItem.image} title="Another menu item" />
            </Card>
        </Grid>
    )
}