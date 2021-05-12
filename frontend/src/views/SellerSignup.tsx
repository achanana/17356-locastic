import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(1),
    width: '120ch',
  },
}))

export default function SellerSignup() {
  const classes = useStyles()

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
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters'),
  })

  async function createAccount() {
    alert('Account has been created!')
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      createAccount()
    },
  })

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
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
            <TextField
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
