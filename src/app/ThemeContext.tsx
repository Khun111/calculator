import { ReactNode, createContext, useContext, useState } from "react";

type contextType = {
    activeTheme: number;
    handleToggle: (prevTheme: number) => void
}
const contextDefault: contextType = {
    activeTheme: 1,
    handleToggle: () => {},
}
const ThemeContext = createContext<contextType>(contextDefault);
export function useTheme() {
    return useContext(ThemeContext);
}
export const ThemeProvider = ({children}: {children: ReactNode}) => {
    'use client'
    const [activeTheme, setActiveTheme] = useState<number>(1);
    const handleToggle = (prevTheme: number) => {
        prevTheme === 3 ? setActiveTheme(1) : setActiveTheme(prevTheme + 1)
      }
    return (
        <ThemeContext.Provider value={{activeTheme, handleToggle}}>
        {children}
        </ThemeContext.Provider>
    )
}