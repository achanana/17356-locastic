import {
  Button,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as yup from 'yup'
import { processPayment } from '../api_util/payments_api'
import { LoctasticContext } from '../contexts/LoctasticContext'
import { us_states } from '../static_data/us_states'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(1),
    width: '120ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

export default function Checkout() {
  const classes = useStyles()
  const { customerCart } = useContext(LoctasticContext)

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setFormState({ ...formState, [event.target.name]: event.target.value })
  // }

  // const handleSelectChange = (event: ChangeEvent<{ name?: string, value: unknown }>) => {
  //     const name = event.target.name as keyof typeof formState;
  //     setFormState({ ...formState, [name]: event.target.value })
  // }

  // interface formValues {
  //   firstName: string
  //   lastName: string
  //   email: string
  //   firstLine: string
  //   secondLine: string
  //   city: string
  // }

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('First name is required')
      .min(1, 'First name should not be empty')
      .max(50, 'First name should not have more than 50 characters'),
    lastName: yup
      .string()
      .required('Last name is required')
      .min(1, 'Last name should not be empty')
      .max(50, 'Last ame should not have more than 50 characters'),
    email: yup
      .string()
      .required('Email ID is required')
      .email('Please enter a valid email'),
    firstLine: yup
      .string()
      .required('Address first line is required')
      .min(1, 'Address Line 1 should not be empty')
      .max(50, 'Address Line 1 should not have more than 50 characters'),
    secondLine: yup
      .string()
      .max(50, 'Address Line 2 should not have more than 50 characters'),
    city: yup
      .string()
      .min(1, 'City should have at least one character')
      .max(50, 'City should not have more than 50 characters'),
    state: yup.string().oneOf(Object.keys(us_states)),
    zip: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(5, 'Zip Code must be 5 digits')
      .max(5, 'Zip Code must be 5 digits'),
  })

  async function submitOrder() {
    const transId = await processPayment(customerCart.cartTotal())
    if (transId !== null) {
      window.open(
        'http://credit.17-356.isri.cmu.edu/?transaction_id=' + transId,
        '_blank',
      )
    } else {
      alert('Payment cannot be processed at this time.')
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      firstLine: '',
      secondLine: '',
      city: '',
      state: '',
      zip: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      submitOrder()
    },
  })

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5">
          Place your order for ${customerCart.cartTotal()}
        </Typography>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item>
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item>
            <TextField
              id="email"
              name="email"
              label="Email ID"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Delivery Address</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="firstLine"
              name="firstLine"
              label="Address Line 1"
              value={formik.values.firstLine}
              onChange={formik.handleChange}
              error={
                formik.touched.firstLine && Boolean(formik.errors.firstLine)
              }
              helperText={formik.touched.firstLine && formik.errors.firstLine}
            />
          </Grid>
          <Grid item>
            <TextField
              id="secondLine"
              name="secondLine"
              label="Address Line 2"
              value={formik.values.secondLine}
              onChange={formik.handleChange}
              error={
                formik.touched.secondLine && Boolean(formik.errors.secondLine)
              }
              helperText={formik.touched.secondLine && formik.errors.secondLine}
            />
          </Grid>
          <Grid item>
            <TextField
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item>
            <InputLabel htmlFor="">State</InputLabel>
            <Select
              native
              id="state"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              inputProps={{
                name: 'state',
                id: 'state',
              }}
              error={formik.touched.state && Boolean(formik.errors.state)}
            >
              <option aria-label="None" value="" />
              {Object.keys(us_states).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <TextField
              id="zip"
              name="zip"
              label="Zip Code"
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Proceed to payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
