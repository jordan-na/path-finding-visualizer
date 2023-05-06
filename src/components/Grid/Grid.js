import { useContext, useEffect } from "react";
import classes from "./Grid.module.css";
import ToolsCSS from "../../utils/ToolsCSS";
import { v4 as uuid } from "uuid";
import Row from "./Row/Row";
import ThemeContext from "../../context/theme-context/theme-context";
import DimensionsContext from "../../context/dimensions-context/dimensions-context";

const Grid = () => {
   const themeContext = useContext(ThemeContext);
   const dimensionsContext = useContext(DimensionsContext);

   useEffect(() => {
      ToolsCSS.setGlobalVariable("--grid-width", dimensionsContext.width);
      ToolsCSS.setGlobalVariable("--grid-height", dimensionsContext.height);
   }, [dimensionsContext.width, dimensionsContext.height]);

   const rows = [];
   for (let i = 0; i < dimensionsContext.height; i++) {
      const bottomBorder = i !== dimensionsContext.height - 1;
      rows.push(
         <Row
            rowNum={i}
            key={uuid()}
            numCells={dimensionsContext.width}
            bottomBorder={bottomBorder}
         />
      );
   }

   return (
      <div className={`${classes["grid-container"]} ${classes[themeContext.theme]}`}>
         <div className={classes.grid}>
            {rows}
         </div>
      </div>
   );
};

export default Grid;
