import React from "react";

export type ThemeContextType = "light" | "dark";

export const ThemeContext = React.createContext<{
  theme: ThemeContextType;
  setTheme: (newScheme: ThemeContextType) => void;
}>({theme: 'light', setTheme: () => {} });