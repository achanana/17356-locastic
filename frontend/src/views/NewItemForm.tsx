import { useAuth0 } from '@auth0/auth0-react'
import {
  Button,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import * as yup from 'yup'
import { uploadFileToAWS } from '../api_util/aws_api'
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
  const [image, setImage] = useState<Blob>()
  const [imagePreviewURL, setImagePreviewURL] = useState<
    string | ArrayBuffer | null
  >()
  const classes = useStyles()
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0()
  const history = useHistory()

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    let reader = new FileReader()
    if (e.target.files) {
      let file = e.target.files[0]

      reader.onloadend = () => {
        setImage(file)
        setImagePreviewURL(reader.result)
        console.log(reader.result)
        console.log(imagePreviewURL)
      }

      reader.readAsDataURL(file)
    }
  }

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
    category: yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (user) {
        if (image) {
          const response = await uploadFileToAWS(
            image,
            user.name + '_' + values.name,
            {
              ext: 'img',
              mime: image.type,
            },
          )
          addItem(
            {
              name: values.name,
              description: values.description,
              price: values.price,
              image: response.Location,
              category: values.category,
            },
            (await getIdTokenClaims())['http://userid/user_metadata'].sellerId,
          )
        } else {
          alert('Image is null')
          addItem(
            values,
            (await getIdTokenClaims())['http://userid/user_metadata'].sellerId,
          )
        }
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
              <InputLabel htmlFor="">Item Category</InputLabel>
              <Select
                native
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                <option aria-label="None" value="" />
                <option value="BakeryItem">Bakery item</option>
                <option value="GiftBasket">Gift basket</option>
              </Select>
            </Grid>
            <Grid item>
              <Typography variant="h6">Add item image</Typography>
              <br />
              <input
                type="file"
                onChange={(e) => handleImageChange(e)}
                accept=".jpg, .jpeg, .png"
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
