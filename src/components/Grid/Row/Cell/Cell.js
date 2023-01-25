import classes from "./Cell.module.css";
import ThemeContext from "../../../../context/theme-context/theme-context";
import { useContext, useRef } from "react";
import PointType from "../../../../enums/PointType";
import GridContext from "../../../../context/grid-context/grid-context";
import WeightIcon from "../../../../icons/WeightIcon/WeightIcon";
import PointIcon from "../../../../icons/PointIcon/PointIcon";
import ArrowIcon from "../../../../icons/ArrowIcon/ArrowIcon";
import PathType from "../../../../enums/PathType";
import { useState } from "react";
import Menu from "./Menu/Menu";

const Cell = ({ rowNum, columnNum, borderRight }) => {
   const [showWeight, setShowWeight] = useState(false);
   const [menu, setMenu] = useState({
      show: false,
      location: {
         left: "default",
         bottom: "default",
      },
   });

   const wrapperRef = useRef();

   const themeContext = useContext(ThemeContext);
   const gridContext = useContext(GridContext);

   let classList = `${classes.cell} ${classes[themeContext.theme]} ${borderRight ? classes["border-right"] : ""}`;

   const point = gridContext.grid[rowNum][columnNum].point;
   const path = gridContext.grid[rowNum][columnNum].path;
   const weight = gridContext.grid[rowNum][columnNum].weight;

   let isEmpty = false;
   let isWall = false;
   let isWeight = false;
   let isStart = columnNum === gridContext.startCoord.x && rowNum === gridContext.startCoord.y;
   let isTarget = columnNum === gridContext.targetCoord.x && rowNum === gridContext.targetCoord.y;

   if ((isStart || isTarget) && !gridContext.visualizing) {
      classList += ` ${classes.cursor}`;
   }

   if(menu.show) {
      classList += ` ${classes.focus}`;
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
      if(path === PathType.PATH || path === PathType.VISITED) return;
      gridContext.setEnablePointerEvents(false);
      let x;
      let y;
      const rect = wrapperRef.current.getBoundingClientRect();
      const right = window.innerWidth - rect.left;
      const bottom = window.innerHeight - rect.top;
      if (right > 220) {
         x = 20;
      } else {
         x = -20;
      }
      if(bottom < 220) {
         y = 1;
      } else {
         y = -1
      }
      setMenu(() => {
         return {
            show: true,
            location: {
               left: x,
               bottom: y
            },
         };
      });
   };

   const releaseNodesHandler = () => {
      gridContext.setMovingStart(false);
      gridContext.setMovingTarget(false);
      gridContext.setPlacingPoints(false);
   };

   switch (point) {
      case PointType.EMPTY:
         isEmpty = true;
         break;
      case PointType.WALL:
         isWall = true;
         classList += ` ${classes.wall} ${classes.block}`;
         break;
      case PointType.WEIGHT:
         isWeight = true;
         break;
      default:
         throw new Error("INVALID POINT TYPE: " + point);
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

   let menuStyles = {};
   if(menu.location.left < 0) {
      menuStyles.right = `calc(100% + ${menu.location.left * -1}px)`;
   } else {
      menuStyles.left = `calc(100% + ${menu.location.left}px)`;
   }
   if(menu.location.bottom < 0) {
      menuStyles.top = "0px";
   } else {
      menuStyles.bottom = "0px";
   }

   return (
      <div
         className={classList}
         onMouseDown={fillCellHandler}
         onMouseUp={releaseNodesHandler}
         onMouseOver={fillCellHandler}
         onContextMenu={rightClickHandler}
         ref={wrapperRef}
      >
         {isWeight && <WeightIcon className={classes.icon} />}
         {isStart && <ArrowIcon className={classes.icon} />}
         {isTarget && <PointIcon className={classes.icon} />}
         {(gridContext.showWeights || showWeight) && <span className={classes.weight}>{weight}</span>}
         {menu.show &&
            <Menu
               style={menuStyles}
               row={rowNum}
               col={columnNum}
               setShowWeight={setShowWeight}
               weight={weight}
               setMenu={setMenu}
               cellData={{
                  isEmpty: isEmpty,
                  isWall: isWall,
                  isWeight: isWeight,
                  isStart: isStart,
                  isTarget: isTarget
               }}
            />
         }
      </div>
   );
};

export default Cell;
