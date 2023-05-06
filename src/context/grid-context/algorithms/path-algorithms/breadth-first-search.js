import PointType from "../../../../enums/PointType";

export const breadthFirstSearch = (grid, width, height, startX, startY, targetX, targetY) => {
   const visited = new Array(height);
   for (let i = 0; i < visited.length; i++) visited[i] = new Array(width);
   visited[startY][startX] = true;
   const l = [[startX, startY]];
   const parentMap = new ParentMap();
   const shortestPath = [];
   const orderOfVisitedNodes = [[startX, startY]];
   let currentList = l;
   let foundTarget = false;
   while (currentList.length !== 0 && !foundTarget) {
      const lNew = [];
      for (const point of currentList) {
         for (const neighbour of getNeighbours(point)) {
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
            visited[row][col] = true;
            parentMap.set(neighbour, point);
            orderOfVisitedNodes.push([col, row]);
            lNew.push([col, row]);
            if(col === targetX && row === targetY) {
               foundTarget = true;
               let parent = neighbour;
               while (parent) {
                  shortestPath.push(parent);
                  parent = parentMap.get(parent);
               }
               break;
            }
         }
         if(foundTarget) {
            break;
         }
      }
      currentList = lNew;
   }
   return [orderOfVisitedNodes, shortestPath.reverse()];
};

const getNeighbours = (point) => {
   const x = point[0];
   const y = point[1];
   return [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
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
