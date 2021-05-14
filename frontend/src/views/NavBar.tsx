import { useAuth0 } from '@auth0/auth0-react'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { LoctasticContext } from '../contexts/LoctasticContext'
import Logo from '../images/locastic-logo.svg'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: '5em',
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
  const classes = useStyles()
  const { customerCart } = useContext(LoctasticContext)
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()
  return (
    <Box mb={4}>
      <AppBar position="static" color="transparent" className={classes.navBar}>
        <Toolbar>
          {!isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => loginWithRedirect()}
            >
              Seller Log In
            </Button>
          )}
          &nbsp;
          {!isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/seller-signup"
            >
              Seller Sign Up
            </Button>
          )}
          {isAuthenticated && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </Button>
          )}
          <Typography className={classes.title}>
            <Link component={RouterLink} color="inherit" to="/">
              <img src={Logo} alt="Locastic" className={classes.logo} />
            </Link>
          </Typography>
          {isAuthenticated && (
            <Typography>
              <Link component={RouterLink} color="inherit" to="/add-item">
                Add item
              </Link>
            </Typography>
          )}
          <Button component={RouterLink} to="/cart">
            <Badge badgeContent={customerCart.getTotalQty()} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
