import { createContext } from "react";
import { menuItem } from "../App";

const defaultMenuItems: menuItem[] = [];
export const LoctasticContext = createContext({ menuItems: defaultMenuItems });
const LoctasticContextProvider = LoctasticContext.Provider;
export default LoctasticContextProvider;
