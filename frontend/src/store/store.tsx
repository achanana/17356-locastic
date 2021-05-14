import axios from 'axios'
import { action, createStore, persist, thunk } from 'easy-peasy'
import { menuItem, storeModel } from '../model'

const store = createStore<storeModel>(
  persist({
    menuItems: [],
    setMenuItems: action((state, payload) => {
      state.menuItems = payload
    }),
    fetchMenuItems: thunk(async (actions) => {
      let menuItems: menuItem[] = []
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BACKEND_URL + '/homepage_items',
        )
        menuItems = data.menu_items
        actions.setMenuItems(menuItems)
      } catch (error) {
        console.log(error)
      }
    }),
  }),
)

export default store
