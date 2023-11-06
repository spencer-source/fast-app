import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

const useAppearance = () => {
  const { theme: appMode } = useContext(ThemeContext);
  const deviceMode = useColorScheme();
  const theme = appMode === 'light' ? deviceMode : appMode;
  const selectedTheme = Colors[theme || 'light'];
  return { ...selectedTheme, theme: theme || 'light', dark: theme === 'dark'}
};

export default useAppearance;