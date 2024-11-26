import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('dark');

    const darkTheme = () => setTheme('dark');
    const lightTheme = () => setTheme('light');
    return (
        <ThemeContext.Provider value={{ theme, darkTheme, lightTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}