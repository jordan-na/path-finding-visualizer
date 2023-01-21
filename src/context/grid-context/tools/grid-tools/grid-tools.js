import PathType from "../../../../enums/PathType";
import PointType from "../../../../enums/PointType";

const createGridArr = (width, height) => {
   const grid = [];
   for (let i = 0; i < height; i++) {
      grid.push([]);
      for (let j = 0; j < width; j++) {
         grid[i].push(
            {
               point: PointType.EMPTY,
               path: PathType.EMPTY,
               weight: 1
            }
         );
      }
   }
   return grid;
}

const clearPoints = (grid, type) => {
   if (type == null) return;
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
         if(type === "all") {
            grid[i][j].point = PointType.EMPTY;
            grid[i][j].path = PathType.EMPTY;
            grid[i][j].weight = 1;
         } else if (grid[i][j].point === type) {
            grid[i][j].point = PointType.EMPTY;
            if(type === PointType.WEIGHT) {
               grid[i][j].weight = 1;
            }
         } else if(grid[i][j].path === type) {
            grid[i][j].path = PathType.EMPTY;
         }
         // if (
         //    grid[i][j].point !== PointType.START &&
         //    grid[i][j].point !== PointType.TARGET &&
         //    (type === "all" || grid[i][j].point === type)
         // ) {
         //    if (grid[i][j].point === PointType.VISITED_START || grid[i][j].point === PointType.PATH_START) {
         //       grid[i][j].point = PointType.START;
         //    } else if (grid[i][j].point === PointType.VISITED_TARGET || grid[i][j].point === PointType.PATH_TARGET) {
         //       grid[i][j].point = PointType.TARGET;
         //    } else {
         //       grid[i][j].point = PointType.EMPTY;
         //    }
         // }
      }
   }
};


const GridTools = {
   createGridArr: createGridArr,
   clearPoints: clearPoints,
};

export default GridTools;
