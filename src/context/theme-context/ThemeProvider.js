import { useEffect, useState } from "react";
import ThemeContext from "./theme-context";
import Storage from "../../utils/Storage";

const storedTheme = Storage.getValue("pfv__theme");

const ThemeProvider = (props) => {
   const [theme, setTheme] = useState(storedTheme || "dark");

   const changeTheme = () => {
      setTheme(prevTheme => {
         if(prevTheme === "dark") return "light";
         else if (prevTheme === "light") return "dark";
      });
   }

   useEffect(() => {
      Storage.setValue("pfv__theme", theme);
   }, [theme]);

   const context = {
      theme: theme,
      changeTheme: changeTheme
   }

   return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>
};

export default ThemeProvider;