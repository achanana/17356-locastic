import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { CartToggle } from '../components'
import { menuItem } from '../model'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
    minHeight: 180,
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
  playIcon: {
    height: 38,
    width: 38,
  },
}))

interface Props {
  menuItem: menuItem
}

export default function MenuItem(props: Props) {
  const classes = useStyles()
  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              <Link
                component={RouterLink}
                color="inherit"
                to={`/item/${props.menuItem.id}`}
              >
                {props.menuItem.name}
              </Link>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              ${props.menuItem.price} / unit
            </Typography>
            <Rating value={props.menuItem.rating} readOnly />
          </CardContent>
          <CartToggle menuItem={props.menuItem} />
        </div>
        <CardMedia
          className={classes.cover}
          image={props.menuItem.image}
          title="Another menu item"
        />
      </Card>
    </Grid>
  )
}
