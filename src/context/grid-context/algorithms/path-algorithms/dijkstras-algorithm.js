import PointType from "../../../../enums/PointType";

export const dijkstrasAlgorithm = (grid, width, height, startX, startY, targetX, targetY) => {
   const distances = new DistancesMap();
   distances.set([startX, startY], 0);
   const visited = new Array(height);
   for (let i = 0; i < visited.length; i++) visited[i] = new Array(width);
   visited[startY][startX] = true;
   let currentPoint = [startX, startY];
   let numVisited = 1;
   const parentMap = new DistancesMap();
   const shortestPath = [];
   const orderOfVisitedNodes = [[startX, startY]];
   while(numVisited < width * height) {
      if(currentPoint[0] === targetX && currentPoint[1] === targetY) {
         let parent = currentPoint;
         while (parent) {
            shortestPath.push(parent);
            parent = parentMap.get(parent);
         }
         break;
      }
      const distance = distances.get(currentPoint);
      for(const neighbour of getNeighbours(currentPoint)) {
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
         const distanceNeighbour = distances.get(neighbour);
         const weightNeigbour = grid[row][col].weight;
         if (!distanceNeighbour || distance + weightNeigbour < distanceNeighbour) {
            distances.set(neighbour, distance + weightNeigbour);
            parentMap.set(neighbour, currentPoint);
         }
      }
      currentPoint = getMinPoint(visited, distances);
      visited[currentPoint[1]][currentPoint[0]] = true;
      orderOfVisitedNodes.push(currentPoint);
      numVisited++;
   }
   return [orderOfVisitedNodes, shortestPath.reverse()];
}

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

const getMinPoint = (visited, distances) => {
   let minDistance;
   let minPoint;
   for(let i = 0; i < visited.length; i++) {
      for(let j = 0; j < visited[i].length; j++) {
         const distance = distances.get([j, i]);
         if(!visited[i][j] && distance) {
            if((!minPoint && !minDistance) || distance < minDistance) {
               minDistance = distance;
               minPoint = [j, i];
            }
         }
      }
   }
   return minPoint;
}

class DistancesMap extends Map {
   set(key, value) {
      super.set(key.toString(), value);
   }

   get(key) {
      return super.get(key.toString());
   }
}