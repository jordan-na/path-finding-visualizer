import { useContext } from "react";
import ThemeContext from "../../../context/theme-context/theme-context";
import classes from "./WeightToggle.module.css";
import WeightIcon from "../../../icons/WeightIcon/WeightIcon";
import GridContext from "../../../context/grid-context/grid-context";
import { useState } from "react";
import { toast } from "react-toastify";

const WeightToggle = (props) => {
   const [weightHoverColor, setWeightHoverColor] = useState(null);

   const themeContext = useContext(ThemeContext);
   const gridContext = useContext(GridContext);

   let weightToggleClasses = `${classes["weight-toggle"]} `;
   let weightButtonClasses = `${classes["weight-button"]} `;
   let weightColor;

   if (themeContext.theme === "light") {
      weightToggleClasses += `${classes.light}`;
      weightButtonClasses += `${classes.light}`;
      weightColor = "#c3c8ce";
   } else if (themeContext.theme === "dark") {
      weightToggleClasses += `${classes.dark}`;
      weightButtonClasses += `${classes.dark}`;
      weightColor = "#6b6b77";
   }

   if(gridContext.showWeights) {
      weightToggleClasses += ` ${classes.weights}`;
      weightButtonClasses += ` ${classes.weights}`;
   } else {
      weightToggleClasses += ` ${classes["no-weights"]}`;
      weightButtonClasses += ` ${classes["no-weights"]}`;
   }

   const toggleWeightsHandler = () => {
      toast(!gridContext.showWeights ? "Showing Weights" : "Hiding Weights", {type: "info"});
      gridContext.setShowWeights((prev) => !prev);
   };

   const hoverWeightButtonHandler = () => {
      setWeightHoverColor("#fff");
   };

   const unhoverWeightButtonHandler = () => {
      setWeightHoverColor(null);
   }

   const content = props.onlyShowButton ? (
      <button
         onClick={toggleWeightsHandler}
         onMouseOver={hoverWeightButtonHandler}
         onMouseLeave={unhoverWeightButtonHandler}
         className={weightButtonClasses}
      >
         {!gridContext.showWeights &&  <div className={classes.cross}></div>}
         <WeightIcon color={weightHoverColor || weightColor} className={classes.weight} />
      </button>
   ) : (
      <div className={weightToggleClasses}>
         <div className={classes.container}>
            <div className={classes.cross}></div>
            <WeightIcon color={weightColor} />
         </div>
         <button onClick={toggleWeightsHandler} className={`${classes["toggle-switch"]}`}>
            <span className={classes.circle}></span>
         </button>
         <WeightIcon color={weightColor} />
      </div>
   );

   return content;
};

export default WeightToggle;
