import axios from 'axios'
import { menuItem } from '../model'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { Accept: 'application/json' },
})

export async function getHomepageItems() {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/homepage_items',
    )
    let menuItems: menuItem[] = data.menu_items
    return menuItems
  } catch (error) {
    console.log(error)
    return null
  }
}
export async function addSeller(values: {
  name: string
  email: string
  description: string
}) {
  try {
    const { data } = await backendInstance.post('/add_seller', {
      name: values.name,
      email: values.email,
      description: values.description,
    })
    return data.seller_id
  } catch (error) {
    alert(error)
  }
}
export async function addItem(
  values: {
    name: string
    description: string
    price: number
  },
  sellerId: number,
) {
  try {
    await backendInstance.post('/add_item/' + sellerId)
  } catch (error) {
    alert(error)
  }
}
