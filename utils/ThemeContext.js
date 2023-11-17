import React, {createContext, useContext, useEffect, useState} from 'react';
import {getItem, setItem} from './Storage';

const ThemeContext = createContext();

export function ThemeProvider({children, setGlobalTheme}) {
  const [theme, setTheme] = useState('light'); // Default theme is light

  useEffect(() => {
    async function getTheme() {
      const theme = await getItem('theme');
      setTheme(theme);
    }

    getTheme();
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      setItem('theme', newTheme);
      setGlobalTheme(newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
