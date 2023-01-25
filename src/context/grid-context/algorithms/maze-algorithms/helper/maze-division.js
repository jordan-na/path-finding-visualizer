// import GridTools from "../../../tools/grid-tools/grid-tools";
import MazeType from ".././../../../../enums/MazeType";

export const mazeDivision = (divisionType, width, height, startX, startY, targetX, targetY) => {
   const grid = new Array(height);
   for(let i = 0 ; i < width; i++) grid[i] = new Array(width);
   const wallNodesInOrder = [];
   for (let i = 0; i < width; i++) {
      wallNodesInOrder.push([i, 0]);
      wallNodesInOrder.push([i, height - 1]);
   }
   for (let i = 0; i < height; i++) {
      wallNodesInOrder.push([0, i]);
      wallNodesInOrder.push([width - 1, i]);
   }
   const divide = (x, y, width, height, orientation) => {
      if (width < 5 || height < 5) return;
      const horizontal = orientation === "HORIZONTAL";
      let wx = x + (horizontal ? 1 : randomInt(2, width - 3));
      let wy = y + (horizontal ? randomInt(2, height - 3) : 1);
      let noWall = false;
      let rightOfGap = isRightOfGap(grid, wx, wy, horizontal);
      let leftOfGap = isLeftOfGap(grid, wx, wy, width, horizontal);
      let belowGap = isBelowGap(grid, wx, wy, horizontal);
      let aboveGap = isAboveGap(grid, wx, wy, height, horizontal);
      const badPatternHorizontal1 =
         rightOfGap &&
         (isLeftOfGap(grid, wx, wy - 1, width, horizontal) || isLeftOfGap(grid, wx, wy + 1, width, horizontal));
      const badPatternHorizontal2 =
         leftOfGap && (isRightOfGap(grid, wx, wy - 1, horizontal) || isRightOfGap(grid, wx, wy + 1, horizontal));
      const badPatternVertical3 =
         belowGap &&
         (isAboveGap(grid, wx - 1, wy, height, horizontal) || isAboveGap(grid, wx + 1, wy, height, horizontal));
      const badPatternVertical4 =
         aboveGap && (isBelowGap(grid, wx - 1, wy, horizontal) || isBelowGap(grid, wx + 1, wy, horizontal));
      if (horizontal) {
         if (height === 5 && (rightOfGap || leftOfGap)) {
            noWall = true;
         } else if (height === 6 && (badPatternHorizontal1 || badPatternHorizontal2)) {
            noWall = true;
         } else {
            while (isRightOfGap(grid, wx, wy, horizontal) || isLeftOfGap(grid, wx, wy, width, horizontal)) {
               wy = y + randomInt(2, height - 3);
            }
         }
      } else {
         if (width === 5 && (belowGap || aboveGap)) {
            noWall = true;
         } else if (width === 6 && (badPatternVertical3 || badPatternVertical4)) {
            noWall = true;
         } else {
            while (isBelowGap(grid, wx, wy, horizontal) || isAboveGap(grid, wx, wy, height, horizontal)) {
               wx = x + randomInt(2, width - 3);
            }
         }
      }
      const px = wx + (horizontal ? randomInt(0, width - 3) : 0);
      const py = wy + (horizontal ? 0 : randomInt(0, height - 3));
      const dx = horizontal ? 1 : 0;
      const dy = horizontal ? 0 : 1;
      const length = horizontal ? width - 2 : height - 2;
      if (!noWall) {
         for (let i = 0; i < length; i++) {
            if (wx !== px || wy !== py) {
               if ((wx !== startX || wy !== startY) && (wx !== targetX || wy !== targetY)) {
                  wallNodesInOrder.push([wx, wy]);
               }
            } else {
               grid[py][px] = "GAP";
            }
            wx += dx;
            wy += dy;
         }
      }
      let [w, h] = horizontal ? [width, wy - y + 1] : [wx - x + 1, height];
      divide(x, y, w, h, chooseOrientation(divisionType, w, h));

      const [nx, ny] = horizontal ? [x, wy] : [wx, y];
      [w, h] = horizontal ? [width, y + height - wy] : [x + width - wx, height];
      divide(nx, ny, w, h, chooseOrientation(divisionType, w, h));
   };

   divide(0, 0, width, height, chooseOrientation(divisionType, width, height));
   return wallNodesInOrder;
};

const chooseOrientation = (divisionType, width, height) => {
   switch (divisionType) {
      case MazeType.RECURSIVE_DIVISION:
         if (width < height) {
            return "HORIZONTAL";
         } else if (height < width) {
            return "VERTICAL";
         } else {
            return randomInt(0, 1) === 0 ? "HORIZONTAL" : "VERTICAL";
         }
      case MazeType.VERTICAL_SKEW_DIVISION:
         return randomInt(1, 10) < 4 ? "HORIZONTAL" : "VERTICAL";
      case MazeType.HORIZONTAL_SKEW_DIVISION:
         return randomInt(1, 10) < 7 ? "HORIZONTAL" : "VERTICAL";
      default:
         throw new Error("Invalid division type: " + divisionType);
   }
};

const isRightOfGap = (grid, wx, wy, horizontal) => {
   if (!horizontal) return false;
   return wx > 0 && grid[wy][wx - 1] === "GAP";
};

const isLeftOfGap = (grid, wx, wy, width, horizontal) => {
   if (!horizontal) return false;
   return grid[wy][wx + width - 2] === "GAP";
};

const isBelowGap = (grid, wx, wy, horizontal) => {
   if (horizontal) return false;
   return wy > 0 && grid[wy - 1][wx] === "GAP";
};

const isAboveGap = (grid, wx, wy, height, horizontal) => {
   if (horizontal) return false;
   return grid[wy + height - 2][wx] === "GAP";
};

const randomInt = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};
