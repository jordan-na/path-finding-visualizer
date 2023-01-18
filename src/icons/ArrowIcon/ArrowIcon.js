import { useContext } from "react";
import ThemeContext from "../../context/theme-context/theme-context";
import classes from "./ArrowIcon.module.css";

const ArrowIcon = (props) => {

   const themeContext = useContext(ThemeContext);

   return (
      <svg
         version="1.1"
         x="0px"
         y="0px"
         width="21.875px"
         height="21.875px"
         viewBox="0 0 21.875 21.875"
         enable-background="new 0 0 21.875 21.875"
         className={`${props.className} ${classes[themeContext.theme]}`}
      >
         <g id="Layer_4"></g>
         <g id="Layer_2">
            <g>
               <rect
                  x="3.778"
                  y="11.427"
                  transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 28.6357 16.3531)"
                  fill="#420863"
                  width="14.306"
                  height="5.361"
               />

               <rect
                  x="3.792"
                  y="5.088"
                  transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 13.1915 20.9994)"
                  fill="#420863"
                  width="14.305"
                  height="5.361"
               />
            </g>
         </g>
      </svg>
   );
};





export default ArrowIcon;
