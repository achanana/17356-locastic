import { createStore, action, thunk, persist } from 'easy-peasy'
import { storeModel, menuItem } from "../model"
import axios from 'axios'

const store = createStore<storeModel>(persist({
    menuItems: [],
    setMenuItems: action((state, payload) => {
        state.menuItems = payload
    }),
    fetchMenuItems: thunk(async actions => {
        let menuItems: menuItem[] = []
        try {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + '/homepage_items')
            menuItems = data.menu_items
            actions.setMenuItems(menuItems);
        } catch (error) {
            console.log(error)
        }
    }), 
}))

export default store;