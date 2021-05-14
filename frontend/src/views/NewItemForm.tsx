import { useAuth0 } from '@auth0/auth0-react'
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router'
import * as yup from 'yup'
import { addItem } from '../api_util/backend_apis'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(1),
    width: '120ch',
  },
}))

export default function NewItemForm() {
  const classes = useStyles()
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0()
  const history = useHistory()
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(1, 'Name should not be empty')
      .max(20, 'Name should not have more than 20 characters'),
    description: yup.string().required('Item description is required'),
    price: yup
      .number()
      .required('Price is required')
      .positive('Price must be positive'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (user) {
        addItem(
          values,
          (await getIdTokenClaims())[
            'https://unique-namespace.com/user_metadata'
          ].sellerId,
        )
        history.push('/')
      }
    },
  })
  let form: JSX.Element
  if (isAuthenticated) {
    form = (
      <div className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <Grid>
            <Grid item>
              <Typography variant="h5">Add a new item</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="name"
                name="name"
                label="Item Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item>
              <TextField
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item>
              <TextField
                id="price"
                name="price"
                label="Price/unit"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
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
  } else {
    form = (
      <Typography variant="h5" className={classes.root}>
        Seller not logged in
      </Typography>
    )
  }

  return form
}
