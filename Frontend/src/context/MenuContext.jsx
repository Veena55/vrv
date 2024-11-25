import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {

    const [menu, setMenu] = useState("users");

    const handleMenu = (menuVal) => setMenu(menuVal);

    return (
        <MenuContext.Provider value={{ menu, handleMenu }}>
            {children}
        </MenuContext.Provider>

    )
}


