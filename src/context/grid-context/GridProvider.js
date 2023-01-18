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
import { useEffect } from "react";

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
   const [visualizing, setVisualizing] = useState(false);
   const [movingStart, setMovingStart] = useState(false);
   const [movingTarget, setMovingTarget] = useState(false);
   const [showWeights, setShowWeights] = useState(false);

   const controlContext = useContext(ControlContext);
   const dimensionsContext = useContext(DimensionsContext);

   const speed = controlContext.selectedSpeed * 60 + 1;

   useEffect(() => {
      console.log(visualizing);
   }, [visualizing]);

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

   const visualizeMaze = async (maze) => {
      clearNodes(ClearType.BOARD);
      let algorithm;
      switch (maze) {
         case MazeType.RECURSIVE_DIVISION:
            algorithm = visualizeRecursiveDivision;
            break;
         case MazeType.VERTICAL_SKEW_DIVISION:
            algorithm = visualizeVerticalSkewDivision;
            break;
         case MazeType.HORIZONTAL_SKEW_DIVISION:
            algorithm = visualizeHorizontalSkewDivision;
            break;
         case MazeType.RANDOM_MAZE:
            algorithm = visualizeRandomMaze;
            break;
         case MazeType.WEIGHT_MAZE:
           algorithm = visualizeWeightMaze;
            break;
         case MazeType.STAIR_PATTERN:
            algorithm = visualizeStairPattern;
            break;
         default:
            throw new Error("Ivalid algorithm: " + maze);
      }
      setVisualizing(true);
      await algorithm(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
      setVisualizing(false);
   };

   const visualizeAlgorithm = async () => {
      clearNodes(ClearType.PATH);
      clearNodes(ClearType.VISITED);
      let algorithm;
      switch (controlContext.selectedAlgorithm) {
         case AlgorithmType.DIJKSTRAS_ALGORITHM:
            algorithm = visualizeDijkstras;
            break;
         case AlgorithmType.A_STAR_SEARCH:
            algorithm = visualizeAStarSearch;
            break;
         case AlgorithmType.GREEDY_BEST_FIRST:
            algorithm = visualizeGreedy;
            break;
         case AlgorithmType.BREADTH_FIRST:
            algorithm = visualizeBfs;
            break;
         case AlgorithmType.DEPTH_FIRST:
            algorithm = visualizeDfs;
            break;
         default:
            throw new Error("Ivalid algorithm: " + controlContext.selectedAlgorithm);
      }
      setVisualizing(true);
      await algorithm(grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
      setVisualizing(false);
   };

   const context = {
      grid: grid,
      startCoord: startCoord,
      setStartCoord: setStartCoord,
      targetCoord: targetCoord,
      setTargetCoord: setTargetCoord,
      fillCell: fillCell,
      clearNodes: clearNodes,
      visualizeMaze: visualizeMaze,
      visualizeAlgorithm: visualizeAlgorithm,
      visualizing: visualizing,
      setMovingStart: setMovingStart,
      movingStart: movingStart,
      setMovingTarget: setMovingTarget,
      movingTarget: movingTarget,
      setShowWeights: setShowWeights,
      showWeights: showWeights
   };

   return <GridContext.Provider value={context}>{props.children}</GridContext.Provider>;
};

export default GridProvider;
