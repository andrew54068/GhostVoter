import { useEffect } from "react";
import { setTheme } from "store/slicers/theme";

export const useInitialTheme = () => {

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("CashmereTheme");
    if (localStorageTheme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, []);
};
