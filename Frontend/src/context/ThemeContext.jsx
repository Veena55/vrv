import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const darkTheme = () => setTheme('dark');
    const lightTheme = () => setTheme('light');

    return (
        <ThemeContext.Provider value={{ theme, darkTheme, lightTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}