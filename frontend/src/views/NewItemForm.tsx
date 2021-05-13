import { Grid, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

export default function NewItemForm() {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(1, 'Name should not be empty')
      .max(50, 'Name should not have more than 50 characters'),
    description: yup
      .string()
      .required('Email ID is required')
      .email('Please enter a valid email'),
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
    onSubmit: (values) => {},
  })
  return (
    <Grid>
      <Grid item>
        <Typography variant="h5">Add a new item</Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  )
}
