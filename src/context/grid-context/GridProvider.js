import { useContext, useState } from "react";
import GridTools from "./tools/grid-tools/grid-tools";
import GridContext from "./grid-context";
import ControlContext from "../control-context/control-context";
import DimensionsContext from "../dimensions-context/dimensions-context";
import ClearType from "../../enums/ClearType";
import PointType from "../../enums/PointType";
import AlgorithmType from "../../enums/AlgorithmType";
import MazeType from "../../enums/MazeType";
import {
   visualizeAStarSearch,
   visualizeBfs,
   visualizeDfs,
   visualizeDijkstras,
   visualizeGreedy,
} from "./visualizers/algorithm-visualizer/algorithm-visualizer";
import {
   visualizeHorizontalSkewDivision,
   visualizeRandomMaze,
   visualizeRecursiveDivision,
   visualizeVerticalSkewDivision,
   visualizeWeightMaze,
   visualizeStairPattern,
} from "./visualizers/maze-visualizer/maze-visualizer";
import PathType from "../../enums/PathType";
import MessageType from "../../enums/MessageType";
import { toast } from "react-toastify";

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
   const [placingPoints, setPlacingPoints] = useState(false);
   const [enablePointerEvents, setEnablePointerEvents] = useState(true);

   const controlContext = useContext(ControlContext);
   const dimensionsContext = useContext(DimensionsContext);

   const speed = controlContext.selectedSpeed * 60 + 1;

   const fillCell = (row, col, type) => {
      setGrid((grid) => {
         const updatedGrid = [...grid];
         if (type !== undefined) {
            updatedGrid[row][col].point = type;
            if (type === PointType.WEIGHT) {
               updatedGrid[row][col].weight = 10;
            }
         } else {
            updatedGrid[row][col].point = controlContext.selectedPoint;
            if (controlContext.selectedPoint === PointType.WEIGHT) {
               updatedGrid[row][col].weight = 10;
            }
         }
         return updatedGrid;
      });
   };

   const removePoint = (row, col) => {
      setGrid((grid) => {
         const updatedGrid = [...grid];
         if ((updatedGrid[row][col].point = PointType.WEIGHT)) {
            updatedGrid[row][col].weight = 1;
         }
         updatedGrid[row][col].point = PointType.EMPTY;
         return updatedGrid;
      });
   };

   const setWeight = (row, col, weight) => {
      setGrid((grid) => {
         const updatedGrid = [...grid];
         updatedGrid[row][col].weight = weight;
         return updatedGrid;
      });
   };

   const clearNodes = (type, actionedByUser) => {
      setGrid((grid) => {
         const updatedGrid = [...grid];
         let pointType;
         let pointTypeText;
         switch (type) {
            case ClearType.BOARD:
               pointType = "all";
               pointTypeText = "Board"
               break;
            case ClearType.WALLS:
               pointType = PointType.WALL;
               pointTypeText = "Walls";
               break;
            case ClearType.WEIGHTS:
               pointType = PointType.WEIGHT;
               pointTypeText = "Weights";
               break;
            case ClearType.VISITED:
               pointType = PathType.VISITED;
               pointTypeText = "Visited Nodes";
               break;
            case ClearType.PATH:
               pointType = PathType.PATH;
               pointTypeText = "Path Nodes";
               break;
            default:
               throw new Error("Unable to clear points with type: " + type);
         }
         GridTools.clearPoints(updatedGrid, pointType);
         if(actionedByUser) {
            toast("Cleared " + pointTypeText, {type: "success"});
         }
         return updatedGrid;
      });
   };

   const visualizeMaze = async (maze) => {
      clearNodes(ClearType.BOARD);
      let algorithm;
      let mazeText;
      switch (maze) {
         case MazeType.RECURSIVE_DIVISION:
            algorithm = visualizeRecursiveDivision;
            mazeText = "Recursive Division";
            break;
         case MazeType.VERTICAL_SKEW_DIVISION:
            algorithm = visualizeVerticalSkewDivision;
            mazeText = "Vertical Skew Division";
            break;
         case MazeType.HORIZONTAL_SKEW_DIVISION:
            algorithm = visualizeHorizontalSkewDivision;
            mazeText = "Horizontal Skew Division";
            break;
         case MazeType.RANDOM_MAZE:
            algorithm = visualizeRandomMaze;
            mazeText = "Random Maze";
            break;
         case MazeType.WEIGHT_MAZE:
            algorithm = visualizeWeightMaze;
            mazeText = "Weight Maze";
            break;
         case MazeType.STAIR_PATTERN:
            algorithm = visualizeStairPattern;
            mazeText = "Stair Pattern";
            break;
         default:
            throw new Error("Ivalid algorithm: " + maze);
      }
      setVisualizing(true);
      const start = Date.now();
      toast("Visualizing " + mazeText, {type: "info"});
      await algorithm(dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
      const end = Date.now();
      const timeElapsed = (end - start) / 1000;
      toast(`Finished visualizing ${mazeText} (${timeElapsed.toFixed(2)}s)`, {type: "success"})
      setVisualizing(false);
   };

   const visualizeAlgorithm = async () => {
      clearNodes(ClearType.PATH);
      clearNodes(ClearType.VISITED);
      let algorithm;
      let algorithmText;
      switch (controlContext.selectedAlgorithm) {
         case AlgorithmType.DIJKSTRAS_ALGORITHM:
            algorithm = visualizeDijkstras;
            algorithmText = "Dijkstra's Algorithm";
            break;
         case AlgorithmType.A_STAR_SEARCH:
            algorithm = visualizeAStarSearch;
            algorithmText = "A* Search";
            break;
         case AlgorithmType.GREEDY_BEST_FIRST:
            algorithm = visualizeGreedy;
            algorithmText = "Greedy Best-first Search";
            break;
         case AlgorithmType.BREADTH_FIRST:
            algorithm = visualizeBfs;
            algorithmText = "Breadth-first Search";
            break;
         case AlgorithmType.DEPTH_FIRST:
            algorithm = visualizeDfs;
            algorithmText = "Depth-first Search";
            break;
         default:
            throw new Error("Ivalid algorithm: " + controlContext.selectedAlgorithm);
      }
      setVisualizing(true);
      const start = Date.now();
      toast("Visualizing " + algorithmText, {type: "info"});
      await algorithm(grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
      const end = Date.now();
      const timeElapsed = (end - start) / 1000;
      toast(`Finished visualizing ${algorithmText} (${timeElapsed.toFixed(2)}s)`, {type: "success"})
      setVisualizing(false);
   };

   const context = {
      grid: grid,
      startCoord: startCoord,
      setStartCoord: setStartCoord,
      targetCoord: targetCoord,
      setTargetCoord: setTargetCoord,
      setWeight: setWeight,
      fillCell: fillCell,
      removePoint: removePoint,
      clearNodes: clearNodes,
      visualizeMaze: visualizeMaze,
      visualizeAlgorithm: visualizeAlgorithm,
      visualizing: visualizing,
      setMovingStart: setMovingStart,
      movingStart: movingStart,
      setMovingTarget: setMovingTarget,
      movingTarget: movingTarget,
      setShowWeights: setShowWeights,
      showWeights: showWeights,
      placingPoints: placingPoints,
      setPlacingPoints: setPlacingPoints,
      enablePointerEvents: enablePointerEvents,
      setEnablePointerEvents: setEnablePointerEvents,
   };

   return <GridContext.Provider value={context}>{props.children}</GridContext.Provider>;
};

export default GridProvider;
