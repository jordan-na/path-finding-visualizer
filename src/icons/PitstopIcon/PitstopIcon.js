import { useContext } from "react";
import ThemeContext from "../../context/theme-context/theme-context";
import classes from "./PitstopIcon.module.css";

const PitstopIcon = (props) => {

   const themeContext = useContext(ThemeContext);

   return (
  <svg width="400px" height="400px" viewBox="0 0 200 200"
       xmlns="http://www.w3.org/2000/svg" version="1.1" className={`${props.className} ${classes[themeContext.theme]}`} fill="#D3D3D3">
    <polygon
             points="136.737609507049,188.692435121084 63.2623904929514,188.692435121084 11.3075648789165,136.737609507049 11.3075648789165,63.2623904929514 63.2623904929513,11.3075648789165 136.737609507049,11.3075648789165 188.692435121084,63.2623904929513 188.692435121084,136.737609507049" />
</svg>

   );
};

export default PitstopIcon;