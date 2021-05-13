import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button } from '@material-ui/core'
import React from 'react'

export default function Footer() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()
  return (
    <Box mb={4}>
      {!isAuthenticated && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginWithRedirect()}
        >
          Seller Log In
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
    </Box>
  )
}
