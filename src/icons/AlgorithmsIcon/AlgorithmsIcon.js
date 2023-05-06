import { useContext } from "react";
import ThemeContext from "../../context/theme-context/theme-context";
import classes from "./AlgorithmsIcon.module.css";

const AlgorithmsIcon = (props) => {
   const themeContext = useContext(ThemeContext);

   return (
      <svg
         version="1.1"
         id="Layer_1"
         x="0px"
         y="0px"
         viewBox="0 0 122.88 101.57"
         className={`${props.className} ${classes[themeContext.theme]}`}
         fill="#D3D3D3"
      >
         <g>
            <path d="M44.97,12.84h-17.2L0,49.37L27.77,85.9h17.2L17.2,49.37L44.97,12.84L44.97,12.84z M77.91,12.84h17.2l27.77,36.53 L95.11,85.9h-17.2l27.77-36.53L77.91,12.84L77.91,12.84z M70.17,0.04l5.96,1.39c0.94,0.22,1.52,1.16,1.31,2.1l-22.5,96.69 c-0.22,0.93-1.16,1.52-2.1,1.31l-5.95-1.39c-0.94-0.22-1.52-1.16-1.31-2.1l22.5-96.69C68.3,0.42,69.24-0.17,70.17,0.04L70.17,0.04 L70.17,0.04z" />
         </g>
      </svg>
   );
};

export default AlgorithmsIcon;
