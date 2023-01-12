import SpeedType from "../../../../enums/SpeedType";
import { breadthFirstSearch } from "../../algorithms/path-algorithms/breadth-first-search";
import { depthFirstSearch } from "../../algorithms/path-algorithms/depth-first-search";
import AlgorithmType from "../../../../enums/AlgorithmType";
import { dijkstrasAlgorithm } from "../../algorithms/path-algorithms/dijkstras-algorithm";
import PathType from "../../../../enums/PathType";
import { greedyBestFirstSearch } from "../../algorithms/path-algorithms/greedy-best-first-search";
import { aStarSearch } from "../../algorithms/path-algorithms/a-star-search";

let intervalId;

export const visualizeDijkstras = (grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed) => {
   visualize(AlgorithmType.DIJKSTRAS_ALGORITHM, grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
};

export const visualizeAStarSearch = (grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed) => {
   visualize(AlgorithmType.A_STAR_SEARCH, grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
};

export const visualizeGreedy = (grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed) => {
   visualize(AlgorithmType.GREEDY_BEST_FIRST, grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
};

export const visualizeBfs = (grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed) => {
   visualize(AlgorithmType.BREADTH_FIRST, grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
}

export const visualizeDfs = (grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed) => {
   visualize(AlgorithmType.DEPTH_FIRST, grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
};

const visualize = (type, grid, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed) => {
   clearInterval(intervalId);
   let counter = 0;
   let searchAlgorithm;
   switch(type) {
      case AlgorithmType.DIJKSTRAS_ALGORITHM:
         searchAlgorithm = dijkstrasAlgorithm;
         break;
      case AlgorithmType.A_STAR_SEARCH:
         searchAlgorithm = aStarSearch;
         break;
      case AlgorithmType.GREEDY_BEST_FIRST:
         searchAlgorithm = greedyBestFirstSearch;
         break;
      case AlgorithmType.BREADTH_FIRST:
         searchAlgorithm = breadthFirstSearch;
         break;
      case AlgorithmType.DEPTH_FIRST:
         searchAlgorithm = depthFirstSearch;
         break;
      default:
         throw new Error("Invalid search algorithm: " + type);
   }
   const [visitedNodes, shortestPath] = searchAlgorithm(
      grid,
      dimensionsContext.width,
      dimensionsContext.height,
      startCoord.x,
      startCoord.y,
      targetCoord.x,
      targetCoord.y
   );
   console.log(visitedNodes);
   intervalId = setInterval(() => {
      if (counter >= visitedNodes.length) {
         clearInterval(intervalId);
         counter = 0;
         intervalId = setInterval(() => {
            if (counter >= shortestPath.length) {
               clearInterval(intervalId);
            } else {
               const coordinates1 = shortestPath[counter++];
               const col1 = coordinates1[0];
               const row1 = coordinates1[1];
               // let coordinates2;
               // let col2;
               // let row2;
               // if (
               //    controlContext.selectedSpeed === SpeedType.FAST ||
               //    controlContext.selectedSpeed === SpeedType.VERY_FAST
               // ) {
               //    coordinates2 = counter < shortestPath.length && shortestPath[counter++];
               //    col2 = coordinates2 && coordinates2[0];
               //    row2 = coordinates2 && coordinates2[1];
               // }
               setGrid((grid) => {
                  const updatedGrid = [...grid];
                  updatedGrid[row1][col1].path = PathType.PATH;
                  // if (coordinates2) {
                  //    updatedGrid[row2][col2].path = PathType.PATH;
                  // }
                  return updatedGrid;
               });
            }
         }, speed);
      } else {
         const coordinates1 = visitedNodes[counter++];
         const col1 = coordinates1[0];
         const row1 = coordinates1[1];
         let coordinates2;
         let col2;
         let row2;
         if (controlContext.selectedSpeed === SpeedType.FAST || controlContext.selectedSpeed === SpeedType.VERY_FAST) {
            coordinates2 = counter < visitedNodes.length && visitedNodes[counter++];
            col2 = coordinates2 && coordinates2[0];
            row2 = coordinates2 && coordinates2[1];
         }
         setGrid((grid) => {
            const updatedGrid = [...grid];
            updatedGrid[row1][col1].path = PathType.VISITED;
            if (coordinates2) {
               updatedGrid[row2][col2].path = PathType.VISITED;
            }
            return updatedGrid;
         });
      }
   }, speed);
};