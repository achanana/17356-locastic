import { useAuth0 } from '@auth0/auth0-react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from '../hooks'
import { itemCategories, menuItem } from '../model'
import MenuItem from './MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(1),
    width: '120ch',
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: '5em',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '2ch',
  },
}))

export default function Home() {
  const { isAuthenticated, user } = useAuth0()
  const classes = useStyles()
  const menuItems = useStoreState((state) => state.menuItems)
  const fetchMenuItems = useStoreActions((actions) => actions.fetchMenuItems)

  useEffect(() => {
    fetchMenuItems()
  }, [fetchMenuItems])

  return (
    <div className={classes.root}>
      {isAuthenticated && user && (
        <div className={classes.root}>
          <h2>Welcome, {user.name}!</h2>
        </div>
      )}
      <h3>Bakery items</h3>
      <Grid container spacing={1}>
        {menuItems
          ? menuItems
              .filter(
                (menuItem) => menuItem.category === itemCategories.BakeryItem,
              )
              .map((menuItem: menuItem) => (
                <MenuItem key={menuItem.id} menuItem={menuItem} />
              ))
          : null}
      </Grid>
      <h3>Gift Baskets</h3>
      <Grid container spacing={1}>
        {menuItems
          ? menuItems
              .filter(
                (menuItem) => menuItem.category === itemCategories.GiftBasket,
              )
              .map((menuItem: menuItem) => (
                <MenuItem key={menuItem.id} menuItem={menuItem} />
              ))
          : null}
      </Grid>
    </div>
  )
}
