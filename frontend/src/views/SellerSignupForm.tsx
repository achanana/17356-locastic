import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { addSeller } from '../api_util/backend_apis'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(1),
    width: '120ch',
  },
}))

const auth0Instance = axios.create({
  baseURL: 'https://dev-p49lhvph.us.auth0.com',
})

export default function SellerSignup() {
  const classes = useStyles()
  const history = useHistory()

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(1, 'Name should not be empty')
      .max(50, 'Name should not have more than 50 characters'),
    email: yup
      .string()
      .required('Email ID is required')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters'),
    description: yup
      .string()
      .max(150, 'Description should not have more than 150 characters'),
  })

  async function createAccount(values: {
    name: string
    email: string
    password: string
    description: string
  }) {
    try {
      addSeller(values)
      await auth0Instance.post('/dbconnections/signup', {
        client_id: 'MsfplCFtHA4fi8lJbx3tY1XLkIdoJqkC',
        email: values.email,
        password: values.password,
        connection: 'Username-Password-Authentication',
      })
    } catch (error) {
      alert(error)
    }
    history.push('/')
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createAccount(values)
    },
  })

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
          <Grid item>
            <TextField
              id="description"
              name="description"
              label="Seller description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
