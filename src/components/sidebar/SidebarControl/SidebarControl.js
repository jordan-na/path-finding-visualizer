import classes from "./SidebarControl.module.css";
import ArrowRight from "../../../icons/ArrowIcon/ArrowIcon";
import ThemeContext from "../../../context/theme-context/theme-context";
import { v4 as uuid } from "uuid";
import { useContext } from "react";

const SidebarControl = (props) => {

   const themeContext = useContext(ThemeContext);

   const controlChangeHandler = (i) => {
      props.onControlChange(i);
   }

   const subControls = props.subControls.map((control, i) => {
      return (
         <li key={uuid()}>
            <button
               className={`${i === props.selectedControl ? classes.selected : ""}`}
               onClick={controlChangeHandler.bind(null, props.modifyIndex ? i + 1 : i)}
            >
               {control}
            </button>
         </li>
      );
   });

   return (
      <div className={`${classes["control-container"]} ${classes[themeContext.theme]} ${props.sidebarOpened ? classes.open : ""}`}>
         <div className={classes["hover-background"]}></div>
         <div className={classes.control}>
            <span>
               {props.controlIcon}
               <span>{props.control}</span>
            </span>
            <ArrowRight className={classes.arrow} />
            <div className={classes["sub-controls-container"]}>
               <ul className={classes["sub-controls"]}>{subControls}</ul>
            </div>
         </div>
      </div>
   );
};

export default SidebarControl;
