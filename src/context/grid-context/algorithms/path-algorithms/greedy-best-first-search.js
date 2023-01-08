import PointType from "../../../../enums/PointType";

export const greedyBestFirstSearch = (grid, width, height, startX, startY, targetX, targetY) => {
   const opened = [{ x: startX, y: startY, dist: h(grid, startX, startY, targetX, targetY) }];
   const closed = [[startX, startY]];
   const visited = new Array(height);
   for (let i = 0; i < visited.length; i++) visited[i] = new Array(width);
   visited[startY][startX] = true;
   const parentMap = new ParentMap();
   const shortestPath = [];
   while (opened.length > 0) {
      const point = opened.pop();
      if(!visited[point.y][point.x]) {
         closed.push([point.x, point.y]);
         visited[point.y][point.x] = true;
      }
      if (point.x === targetX && point.y === targetY) {
         let parent = [point.x, point.y];
         while (parent) {
            shortestPath.push(parent);
            parent = parentMap.get(parent);
         }
         break;
      }
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
         parentMap.set(neighbour, [point.x, point.y]);
         opened.push({x: col, y: row, f: h(grid, col, row, targetX, targetY)});
      }
      opened.sort(descendingOrder);
   }
   return [closed, shortestPath.reverse()];
};

const h = (grid, x1, y1, x2, y2) => {
   const weight = grid[y1][x1].weight;
   return Math.abs(x1 - x2) + Math.abs(y1 - y2) + weight;
};

const getNeighbours = (point) => {
   const x = point.x;
   const y = point.y;
   return [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
   ];
};

const descendingOrder = (p1, p2) => {
   return p2.f - p1.f;
}

class ParentMap extends Map {
   set(key, value) {
      super.set(key.toString(), value);
   }

   get(key) {
      return super.get(key.toString());
   }
}
