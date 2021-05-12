import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'
import React from 'react'

export default function SellerLogin() {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button variant="contained" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  )
}
