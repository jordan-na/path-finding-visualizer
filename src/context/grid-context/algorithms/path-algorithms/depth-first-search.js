import PointType from "../../../../enums/PointType";

export const depthFirstSearch = (grid, width, height, startX, startY, targetX, targetY) => {
   const visited = new Array(height);
   for (let i = 0; i < visited.length; i++) visited[i] = new Array(width);
   const stack = [[startX, startY]];
   const parentMap = new ParentMap();
   const orderOfVisitedNodes = [];
   const shortestPath = [];

   while (stack.length > 0) {
      const point = stack.pop();
      const [col, row] = point;
      if(!visited[row][col]) {
         visited[row][col] = true;
         orderOfVisitedNodes.push([col, row]);
      }
      if (col === targetX && row === targetY) {
         let parent = point;
         while(parent) {
            shortestPath.push(parent);
            parent = parentMap.get(parent);
         }
         break;
      }
      for (const neighbour of getNeighbours(col, row)) {
         const [col, row] = neighbour;
         if (
            row < 0 ||
            col < 0 ||
            row >= height ||
            col >= width ||
            visited[row][col] ||
            grid[row][col].point === PointType.WALL
         ) {
            continue;
         }
         stack.push(neighbour);
         parentMap.set(neighbour, point);
      }
      // stack.push([col - 1, row]);
      // stack.push([col + 1 , row]);
      // stack.push([col, row + 1]);
      // stack.push([col ,row - 1]);
   }
   // return orderOfVisitedNodes;
   return [orderOfVisitedNodes, shortestPath.reverse()];
};

const getNeighbours = (x, y) => {
   return [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
   ];
};

class ParentMap extends Map {
   set(key, value) {
      super.set(key.toString(), value);
   }

   get(key) {
      return super.get(key.toString());
   }
}
