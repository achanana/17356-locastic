import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { checkPaymentStatus } from '../api_util/payments_api'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(1),
    width: '120ch',
  },
}))

export default function PaymentProcessing() {
  const classes = useStyles()
  const params = useParams()
  const id = (params as any)?.id
  const history = useHistory()
  const orderStatus = setInterval(
    () =>
      checkPaymentStatus(id).then((value) => {
        if (value === 'denied') {
          clearInterval(orderStatus)
          history.push('/')
          alert('Payment denied')
        } else if (value === 'approved') {
          clearInterval(orderStatus)
          history.push('/')
          alert('Payment successful, order has been placed')
        }
      }),
    3000,
  )

  return (
    <div className={classes.root}>
      <h5>Payment is processing...</h5>
    </div>
  )
}
