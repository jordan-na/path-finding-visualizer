import SpeedType from "../../../../enums/SpeedType";
import PointType from "../../../../enums/PointType";
import { recursiveDivisionMaze } from "../../algorithms/maze-algorithms/recursive-division";
import { verticalSkewDivisionMaze } from "../../algorithms/maze-algorithms/vertical-skew-division";
import { horizontalSkewDivisionMaze } from "../../algorithms/maze-algorithms/horizontal-skew-division";
import MazeType from "../../../../enums/MazeType";
import { randomMaze } from "../../algorithms/maze-algorithms/random-maze";
import { stairPattern } from "../../algorithms/maze-algorithms/stair-pattern";

let intervalId;

export const visualizeRecursiveDivision = async (
   dimensionsContext,
   startCoord,
   targetCoord,
   controlContext,
   setGrid,
   speed
) => {
   await visualize(
      MazeType.RECURSIVE_DIVISION,
      dimensionsContext,
      startCoord,
      targetCoord,
      controlContext,
      setGrid,
      speed
   );
};

export const visualizeVerticalSkewDivision = async (
   dimensionsContext,
   startCoord,
   targetCoord,
   controlContext,
   setGrid,
   speed
) => {
   await visualize(
      MazeType.VERTICAL_SKEW_DIVISION,
      dimensionsContext,
      startCoord,
      targetCoord,
      controlContext,
      setGrid,
      speed
   );
};

export const visualizeHorizontalSkewDivision = async (
   dimensionsContext,
   startCoord,
   targetCoord,
   controlContext,
   setGrid,
   speed
) => {
   await visualize(
      MazeType.HORIZONTAL_SKEW_DIVISION,
      dimensionsContext,
      startCoord,
      targetCoord,
      controlContext,
      setGrid,
      speed
   );
};

export const visualizeRandomMaze = async (
   dimensionsContext,
   startCoord,
   targetCoord,
   controlContext,
   setGrid,
   speed
) => {
   await visualize(MazeType.RANDOM_MAZE, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
};

export const visualizeWeightMaze = async (
   dimensionsContext,
   startCoord,
   targetCoord,
   controlContext,
   setGrid,
   speed
) => {
   await visualize(MazeType.WEIGHT_MAZE, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
};

export const visualizeStairPattern = async (
   dimensionsContext,
   startCoord,
   targetCoord,
   controlContext,
   setGrid,
   speed
) => {
   await visualize(MazeType.STAIR_PATTERN, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed);
};

const visualize = (type, dimensionsContext, startCoord, targetCoord, controlContext, setGrid, speed) => {
   return new Promise((resolve, reject) => {
      clearInterval(intervalId);
      let counter = 0;
      let mazeAlgorithm;
      let isRandomMaze = false;
      let isWeightMaze = false;
      switch (type) {
         case MazeType.RECURSIVE_DIVISION:
            mazeAlgorithm = recursiveDivisionMaze;
            break;
         case MazeType.VERTICAL_SKEW_DIVISION:
            mazeAlgorithm = verticalSkewDivisionMaze;
            break;
         case MazeType.HORIZONTAL_SKEW_DIVISION:
            mazeAlgorithm = horizontalSkewDivisionMaze;
            break;
         case MazeType.RANDOM_MAZE:
            mazeAlgorithm = randomMaze;
            isRandomMaze = true;
            break;
         case MazeType.WEIGHT_MAZE:
            mazeAlgorithm = randomMaze;
            isRandomMaze = true;
            isWeightMaze = true;
            break;
         case MazeType.STAIR_PATTERN:
            mazeAlgorithm = stairPattern;
            break;
         default:
            throw new Error("Invalid maze algorithm: " + type);
      }
      const wallNodes = mazeAlgorithm(
         dimensionsContext.width,
         dimensionsContext.height,
         startCoord.x,
         startCoord.y,
         targetCoord.x,
         targetCoord.y,
         isWeightMaze
      );
      if (isRandomMaze) {
         setGrid((grid) => {
            const updatedGrid = [...grid];
            for (let i = 0; i < wallNodes.length; i++) {
               const coordinates1 = wallNodes[i];
               const col1 = coordinates1[0];
               const row1 = coordinates1[1];
               if (isWeightMaze) {
                  grid[row1][col1].point = PointType.WEIGHT;
                  grid[row1][col1].weight = 10;
               } else {
                  grid[row1][col1].point = PointType.WALL;
               }
            }
            resolve();
            return updatedGrid;
         });
      } else {
         intervalId = setInterval(() => {
            if (counter >= wallNodes.length) {
               clearInterval(intervalId);
               resolve();
            } else {
               const coordinates1 = wallNodes[counter++];
               const col1 = coordinates1[0];
               const row1 = coordinates1[1];
               let coordinates2;
               let col2;
               let row2;
               if (
                  controlContext.selectedSpeed === SpeedType.FAST ||
                  controlContext.selectedSpeed === SpeedType.VERY_FAST
               ) {
                  coordinates2 = counter < wallNodes.length && wallNodes[counter++];
                  col2 = coordinates2 && coordinates2[0];
                  row2 = coordinates2 && coordinates2[1];
               }
               setGrid((grid) => {
                  const updatedGrid = [...grid];
                  updatedGrid[row1][col1].point = PointType.WALL;
                  if (coordinates2) {
                     updatedGrid[row2][col2].point = PointType.WALL;
                  }
                  return updatedGrid;
               });
            }
         }, speed);
      }
   });
};
