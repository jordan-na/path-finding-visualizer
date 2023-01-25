import { useEffect, useState } from "react";
import ThemeContext from "./theme-context";
import Storage from "../../utils/Storage";
import MessageContext from "../message-context/message-context";
import MessageType from "../../enums/MessageType";
import { useContext } from "react";

const storedTheme = Storage.getValue("pfv__theme");
let changedTheme = false;

const ThemeProvider = (props) => {
   const [theme, setTheme] = useState(storedTheme || "dark");

   const messageContext = useContext(MessageContext);

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
         messageContext.createMessage(`Theme changed to ${theme}`, MessageType.PURPLE, 3000);
      }
   }, [theme]);

   const context = {
      theme: theme,
      changeTheme: changeTheme
   }

   return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>
};

export default ThemeProvider;