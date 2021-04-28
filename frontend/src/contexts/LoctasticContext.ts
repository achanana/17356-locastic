import { createContext } from "react";
import { menuItem } from "../App";
import Cart from "../Cart";

const defaultMenuItems: menuItem[] = [];
export const LoctasticContext = createContext({ menuItems: defaultMenuItems, customerCart: new Cart() });
const LoctasticContextProvider = LoctasticContext.Provider;
export default LoctasticContextProvider;
