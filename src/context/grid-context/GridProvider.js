import { useContext, useState } from "react";
import GridTools from "./tools/grid-tools/grid-tools";
import GridContext from "./grid-context";
import ControlContext from "../control-context/control-context";
import DimensionsContext from "../dimensions-context/dimensions-context";
import ClearType from "../../enums/ClearType";
import PointType from "../../enums/PointType";
import AlgorithmType from "../../enums/AlgorithmType";
import MazeType from "../../enums/MazeType";
import { visualizeAStarSearch, visualizeBfs, visualizeDfs, visualizeDijkstras, visualizeGreedy } from "./visualizers/algorithm-visualizer/algorithm-visualizer";
import {
   visualizeHorizontalSkewDivision,
   visualizeRandomMaze,
   visualizeRecursiveDivision,
   visualizeVerticalSkewDivision,
   visualizeWeightMaze,
   visualizeStairPattern
} from "./visualizers/maze-visualizer/maze-visualizer";
import PathType from "../../enums/PathType";

const startX = 8;
const startY = 12;
const targetX = 41;
const targetY = 12;

const width = 70;
const height = 35;

const GridProvider = (props) => {
   const [startCoord, setStartCoord] = useState({ x: startX, y: startY });
   const [targetCoord, setTargetCoord] = useState({ x: targetX, y: targetY });
   const [grid, setGrid] = useState(GridTools.createGridArr(width, height));

   const controlContext = useContext(ControlContext);
   const dimensionsContext = useContext(DimensionsContext);

   const speed = controlContext.selectedSpeed * 60 + 1;

   const fillCell = (row, col) => {
      setGrid((grid) => {
         const updatedGrid = [...grid];
         updatedGrid[row][col].point = controlContext.selectedPoint;
         switch (controlContext.selectedPoint) {
            case PointType.WALL:
               break;
            case PointType.PITSTOP:
               break;
            case PointType.WEIGHT:
               updatedGrid[row][col].weight = 10;
               break;
            default:
               throw new Error("Invalid point type: " + controlContext.selectedPoint);
         }
         return updatedGrid;
      });
   };

   const clearNodes = (type) => {
      setGrid((grid) => {
         const updatedGrid = [...grid];
         let pointType;
         switch (type) {
            case ClearType.BOARD:
               pointType = "all";
               break;
            case ClearType.WALLS:
               pointType = PointType.WALL;
               break;
            case ClearType.PITSTOPS:
               pointType = PointType.PITSTOP;
               break;
            case ClearType.WEIGHTS:
               pointType = PointType.WEIGHT;
               break;
            case ClearType.VISITED:
               pointType = PathType.VISITED;
               break;
            case ClearType.PATH:
               pointType = PathType.PATH;
               break;
            default:
               throw new Error("Unable to clear points with type: " + type);
         }
         GridTools.clearPoints(updatedGrid, pointType);
         return updatedGrid;
      });
   };

   const visualizeMaze = (maze) => {
      clearNodes(ClearType.BOARD);
      switch (maze) {
         case MazeType.RECURSIVE_DIVISION:
            visualizeRecursiveDivision(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case MazeType.VERTICAL_SKEW_DIVISION:
            visualizeVerticalSkewDivision(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case MazeType.HORIZONTAL_SKEW_DIVISION:
            visualizeHorizontalSkewDivision(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case MazeType.RANDOM_MAZE:
            visualizeRandomMaze(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case MazeType.WEIGHT_MAZE:
            visualizeWeightMaze(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case MazeType.STAIR_PATTERN:
            visualizeStairPattern(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         default:
            throw new Error("Ivalid algorithm: " + maze);
      }
   };

   const visualizeAlgorithm = () => {
      switch (controlContext.selectedAlgorithm) {
         case AlgorithmType.DIJKSTRAS_ALGORITHM:
            visualizeDijkstras(grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case AlgorithmType.A_STAR_SEARCH:
            visualizeAStarSearch(grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case AlgorithmType.GREEDY_BEST_FIRST:
            visualizeGreedy(grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case AlgorithmType.BREADTH_FIRST:
            visualizeBfs(grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         case AlgorithmType.DEPTH_FIRST:
            visualizeDfs(grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
            break;
         default:
            throw new Error("Ivalid algorithm: " + controlContext.selectedAlgorithm);
      }
   };

   const context = {
      grid: grid,
      startCoord: startCoord,
      targetCoord: targetCoord,
      fillCell: fillCell,
      clearNodes: clearNodes,
      visualizeMaze: visualizeMaze,
      visualizeAlgorithm: visualizeAlgorithm,
   };

   return <GridContext.Provider value={context}>{props.children}</GridContext.Provider>;
};

export default GridProvider;
