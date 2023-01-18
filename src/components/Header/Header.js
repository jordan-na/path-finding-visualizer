import classes from "./Header.module.css";
import ThemeContext from "../../context/theme-context/theme-context";
import { useContext } from "react";
import ZoomButton from "./ZoomButton/ZoomButton";
import ArrowIcon from "../../icons/ArrowIcon/ArrowIcon";
import PointIcon from "../../icons/PointIcon/PointIcon";
import PitstopIcon from "../../icons/PitstopIcon/PitstopIcon";
import WeightIcon from "../../icons/WeightIcon/WeightIcon";
import GridContext from "../../context/grid-context/grid-context";
import { useState, useRef } from "react";
import { useEffect } from "react";

const Header = () => {
   const [numDots, setNumDots] = useState(0);

   const themeContext = useContext(ThemeContext);
   const gridContext = useContext(GridContext);

   const intervalRef = useRef();

   const visualizeAlgorithm = () => {
      if(!gridContext.visualizing) {
         gridContext.visualizeAlgorithm();
      }
   }

   useEffect(() => {
      if(gridContext.visualizing) {
         intervalRef.current = setInterval(() => {
            setNumDots((numDots) => {
               if(numDots > 2) {
                  numDots = 0;
               } else {
                  numDots++;
               }
               return numDots;
            });
         }, 300);
      } else {
         clearInterval(intervalRef.current);
         setNumDots(0);
      }
   }, [gridContext.visualizing]);

   let buttonString;
   let buttonClasses = classes["visualize-button"];
   if(gridContext.visualizing) {
      buttonString = "Visualizing";
      buttonClasses += " " + classes["visualizing"];
   } else {
      buttonString = "Visualize";
   }
   let dotsString = "";
   for(let i = 0; i < numDots; i++) {
      dotsString += ".";
   }

   return (
      <header className={`${classes.header} ${classes[themeContext.theme]}`}>
         <button className={buttonClasses} onClick={visualizeAlgorithm}>{buttonString}{dotsString}</button>
         <ZoomButton />
         <div className={classes["node-label"]}>
            <ArrowIcon className={`${classes.icon}`} />
            <span className={classes.label}>Start</span>
         </div>
         <div className={classes["node-label"]}>
            <PointIcon className={`${classes.icon} ${classes.target}`} />
            <span className={classes.label}>Target</span>
         </div>
         <div className={classes["node-label"]}>
            <PitstopIcon className={`${classes.icon}`} />
            <span className={classes.label}>Pitstop</span>
         </div>
         <div className={classes["node-label"]}>
            <WeightIcon className={`${classes.icon}`} />
            <span className={classes.label}>Weight</span>
         </div>
         <div className={classes["node-label"]}>
            <div className={`${classes.icon} ${classes.unvisited}`}></div>
            <span className={classes.label}>Unvisited</span>
         </div>
         <div className={classes["node-label"]}>
            <div className={`${classes.icon} ${classes.wall}`}></div>
            <span className={classes.label}>Wall</span>
         </div>
         <div className={classes["node-label"]}>
            <div className={`${classes.icon} ${classes.visited}`}></div>
            <span className={classes.label}>Visited</span>
         </div>
         <div className={classes["node-label"]}>
            <div className={`${classes.icon} ${classes.path}`}></div>
            <span className={classes.label}>Path</span>
         </div>
      </header>
   );
};

export default Header;
