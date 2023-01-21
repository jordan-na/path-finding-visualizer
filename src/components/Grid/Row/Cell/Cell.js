import classes from "./Cell.module.css";
import ThemeContext from "../../../../context/theme-context/theme-context";
import { useContext, useRef } from "react";
import PointType from "../../../../enums/PointType";
import GridContext from "../../../../context/grid-context/grid-context";
import PitstopIcon from "../../../../icons/PitstopIcon/PitstopIcon";
import WeightIcon from "../../../../icons/WeightIcon/WeightIcon";
import PointIcon from "../../../../icons/PointIcon/PointIcon";
import ArrowIcon from "../../../../icons/ArrowIcon/ArrowIcon";
import PathType from "../../../../enums/PathType";
import { useState, useEffect } from "react";

const Cell = ({ rowNum, columnNum, borderRight }) => {
   const [menu, setMenu] = useState({
      show: false,
      location: {
         left: "default",
         bottom: "default",
      },
   });

   const wrapperRef = useRef();

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            gridContext.setEnablePointerEvents(true);
            setMenu(() => {
               return {
                  show: false,
                  location: menu.location,
               };
            });
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [wrapperRef]);


   const themeContext = useContext(ThemeContext);
   const gridContext = useContext(GridContext);

   let classList = `${classes.cell} ${classes[themeContext.theme]} ${borderRight ? classes["border-right"] : ""}`;

   const pointType = gridContext.grid[rowNum][columnNum].point;
   const path = gridContext.grid[rowNum][columnNum].path;
   const weight = gridContext.grid[rowNum][columnNum].weight;

   let isPitstop = false;
   let isWeight = false;
   let isStart = columnNum === gridContext.startCoord.x && rowNum === gridContext.startCoord.y;
   let isTarget = columnNum === gridContext.targetCoord.x && rowNum === gridContext.targetCoord.y;

   if ((isStart || isTarget) && !gridContext.visualizing) {
      classList += ` ${classes.cursor}`;
   }

   const fillCellHandler = (evt) => {
      evt.preventDefault();
      if (evt.buttons === 1 && !gridContext.visualizing && gridContext.enablePointerEvents) {
         if (isStart) {
            gridContext.setMovingStart(true);
         } else if (isTarget) {
            gridContext.setMovingTarget(true);
         } else if (gridContext.grid[rowNum][columnNum].point === PointType.EMPTY) {
            if (gridContext.movingStart && !gridContext.placingPoints) {
               gridContext.setStartCoord({ x: columnNum, y: rowNum });
            } else if (gridContext.movingTarget && !gridContext.placingPoints) {
               gridContext.setTargetCoord({ x: columnNum, y: rowNum });
            } else {
               gridContext.fillCell(rowNum, columnNum);
               gridContext.setPlacingPoints(true);
            }
         }
      }
   };

   const rightClickHandler = (evt) => {
      evt.preventDefault();
      gridContext.setEnablePointerEvents(false);
      let x;
      const rect = wrapperRef.current.getBoundingClientRect();
      const right = window.innerWidth - rect.left;
      if (right > 220) {
         x = 50;
      } else {
         x = -50;
      }
      setMenu(() => {
         return {
            show: true,
            location: {
               left: x,
               bottom: "default"
            },
         };
      });
   };

   const releaseNodesHandler = () => {
      gridContext.setMovingStart(false);
      gridContext.setMovingTarget(false);
      gridContext.setPlacingPoints(false);
   };

   switch (pointType) {
      case PointType.EMPTY:
         break;
      case PointType.WALL:
         classList += ` ${classes.wall} ${classes.block}`;
         break;
      case PointType.PITSTOP:
         isPitstop = true;
         break;
      case PointType.WEIGHT:
         isWeight = true;
         break;
      default:
         throw new Error("INVALID POINT TYPE: " + pointType);
   }

   switch (path) {
      case PathType.EMPTY:
         break;
      case PathType.PATH:
         classList += ` ${classes.path} ${classes.block}`;
         break;
      case PathType.VISITED:
         classList += ` ${classes.visited} ${classes.block}`;
         break;
      default:
         throw new Error("INVALID PATH TYPE: " + path);
   }

   let menuStyles;
   if(menu.location.left < 0) {
      menuStyles = {right: `${menu.location.left * -1}px`};
   } else {
      menuStyles = { left: `${menu.location.left}px` };
   }

   return (
      <div
         className={classList}
         onMouseDown={fillCellHandler}
         onMouseUp={releaseNodesHandler}
         onMouseOver={fillCellHandler}
         // onContextMenu={rightClickHandler}
         ref={wrapperRef}
      >
         {isPitstop && <PitstopIcon className={classes.icon} />}
         {isWeight && <WeightIcon className={classes.icon} />}
         {isStart && <ArrowIcon className={classes.icon} />}
         {isTarget && <PointIcon className={classes.icon} />}
         {gridContext.showWeights && <span className={classes.weight}>{weight}</span>}
         {menu.show && <div className={classes.menu} style={menuStyles}></div>}
      </div>
   );
};

export default Cell;
