import Cell from "./Cell/Cell";
import classes from "./Row.module.css";
import { v4 as uuid } from "uuid";
import ThemeContext from "../../../context/theme-context/theme-context";
import { useContext } from "react";

const Row = (props) => {
   const themeContext = useContext(ThemeContext);

   const cells = [];
   for (let i = 0; i < props.numCells; i++) {
      const borderRight = i !== props.numCells - 1;
      cells.push(
         <Cell
            rowNum={props.rowNum}
            columnNum={i}
            key={uuid()}
            borderRight={borderRight}
            bottomBorder={props.bottomBorder}
         />
      );
   }

   return (
      <div
         className={`${classes.row} ${classes[themeContext.theme]} ${
            props.bottomBorder ? classes["border-bottom"] : ""
         }`}
      >
         {cells}
      </div>
   );
};

export default Row;
