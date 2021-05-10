import { createContext } from "react";
import { menuItem } from "../model";
import Cart from "../Cart";

const defaultMenuItems: menuItem[] = [];

interface LoctasticContextInterface {
  menuItems: menuItem[];
  customerCart: Cart;
  addItemToCart(menuItem: menuItem): void;
  removeItemFromCart(menuItem: menuItem): void;
}

export const LoctasticContext = createContext<LoctasticContextInterface>({
  menuItems: defaultMenuItems,
  customerCart: new Cart(),
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});
const LoctasticContextProvider = LoctasticContext.Provider;
export default LoctasticContextProvider;
