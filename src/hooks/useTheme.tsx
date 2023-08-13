import { setTheme } from "store/slicers/theme";

export const useTheme = () => {
  const { theme } = { theme: {} }

  const toggleTheme = () => {
    if (Array.from(document.body.classList).includes("dark")) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("FibrousFinance", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("FibrousFinance", "dark");
    }
  };

  return { toggleTheme, theme };
};
