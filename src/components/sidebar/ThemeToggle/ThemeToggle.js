import { useContext } from "react";
import ThemeContext from "../../../context/theme-context/theme-context";
import classes from "./ThemeToggle.module.css";
import lightModeLight from "../../../assets/light-mode-light.svg";
import lightModeDark from "../../../assets/light-mode-dark.svg";
import darkModeLight from "../../../assets/dark-mode-light.svg";
import darkModeDark from "../../../assets/dark-mode-dark.svg";

const ThemeToggle = (props) => {

   const themeContext = useContext(ThemeContext);

   let themeToggleClasses = `${classes["theme-toggle"]} `;
   let themeButtonClasses = `${classes["theme-button"]} `;
   let lightModeSrc;
   let darkModeSrc;

   if (themeContext.theme === "light") {
      themeToggleClasses += `${classes.light}`;
      themeButtonClasses += `${classes.light}`;
      lightModeSrc = lightModeLight;
      darkModeSrc = darkModeLight;
   } else if (themeContext.theme === "dark") {
      themeToggleClasses += `${classes.dark}`;
      themeButtonClasses += `${classes.dark}`;
      lightModeSrc = lightModeDark;
      darkModeSrc = darkModeDark;
   }

   const changeThemeHandler = () => {
      themeContext.changeTheme();
   };

   const content = props.onlyShowButton ? (
      <button onClick={changeThemeHandler} className={themeButtonClasses}></button>
   ) : (
      <div className={themeToggleClasses}>
         <img src={lightModeSrc} alt="light mode" />
         <button onClick={changeThemeHandler} className={`${classes["toggle-switch"]}`}>
            <span className={classes.circle}></span>
         </button>
         <img src={darkModeSrc} alt="dark mode" />
      </div>
   );

   return content;
};

export default ThemeToggle;
