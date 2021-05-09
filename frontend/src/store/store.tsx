import { createStore, action, thunk, persist } from 'easy-peasy'
import { StoreModel, menuItem } from "../model"
import axios from 'axios'

const store = createStore<StoreModel>(persist({
    menuItems: [],
    setMenuItems: action((state, payload) => {
        state.menuItems = payload
    }),
    fetchMenuItems: thunk(async actions => {
        let menuItems: menuItem[] = []
        try {
            const { data } = await axios.get('/homepage_items')
            menuItems = data.menu_items
            actions.setMenuItems(menuItems);
        } catch (error) {
            console.log(error)
        }
    }), 
}))

export default store;