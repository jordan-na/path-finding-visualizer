import { useEffect, useState } from "react";
import ThemeContext from "./theme-context";
import Storage from "../../utils/Storage";
import { toast } from "react-toastify";

const storedTheme = Storage.getValue("pfv__theme");
let changedTheme = false;

const ThemeProvider = (props) => {
   const [theme, setTheme] = useState(storedTheme || "dark");

   const changeTheme = () => {
      setTheme(prevTheme => {
         let newTheme;
         if (prevTheme === "dark") newTheme = "light";
         else if (prevTheme === "light") newTheme = "dark";
         changedTheme = true;
         return newTheme;
      });
   };

   useEffect(() => {
      Storage.setValue("pfv__theme", theme);
      if(changedTheme) {
         toast("Theme changed to " + theme + " mode", { type: "info" });
      }
   }, [theme]);

   const context = {
      theme: theme,
      changeTheme: changeTheme
   }

   return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>
};

export default ThemeProvider;