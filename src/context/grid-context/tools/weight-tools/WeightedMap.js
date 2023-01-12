import PointType from "../../../../enums/PointType";

class WeightedMap extends Map {
   constructor(width, height) {
      super();
      this.width = height;
      this.height = height;
      this.reset();
   }

   reset() {
      for (let i = 0; i < this.height; i++) {
         for (let j = 0; j < this.width; j++) {
            this.set([j, i], this.#createWeightedNeighbours(j, i));
         }
      }
   }

   #createWeightedNeighbours(x, y) {
      const neighbours = [];
      if (x === 0) {
         neighbours.push([1, [x + 1, y]]);
      } else if (x === this.width - 1) {
         neighbours.push([1, [x - 1, y]]);
      } else {
         neighbours.push([1, [x + 1, y]]);
         neighbours.push([1, [x - 1, y]]);
      }
      if (y === 0) {
         neighbours.push([1, [x, y + 1]]);
      } else if (y === this.height - 1) {
         neighbours.push([1, [x, y - 1]]);
      } else {
         neighbours.push([1, [x, y + 1]]);
         neighbours.push([1, [x, y - 1]]);
      }
      return neighbours;
   }

   set(key, value) {
      const hashCode = key.toString();
      super.set(hashCode, value);
   }

   get(key) {
      const hashCode = key.toString();
      return super.get(hashCode);
   }

   addWeight(x, y) {
      const neighbours = this.get([x, y]);
      for (const neighbour of neighbours) {
         const weightedNeighbours = this.get(neighbour[1]);
         const indexUpdatedNeighbour = weightedNeighbours.findIndex((n) => {
            const coordinate = n[1];
            return coordinate[0] === x && coordinate[1] === y;
         });
         weightedNeighbours[indexUpdatedNeighbour] = [2, [x, y]];
         this.set(neighbour, weightedNeighbours);
      }
   }

   addWall(x, y) {
      const neighbours = this.get([x, y]);
      for (const neighbour of neighbours) {
         const weightedNeighbours = this.get(neighbour[1]);
         const indexWallNeighbour = weightedNeighbours.findIndex((n) => {
            const coordinate = n[1];
            return coordinate[0] === x && coordinate[1] === y;
         });
         weightedNeighbours.splice(indexWallNeighbour, 1);
         this.set(neighbour, weightedNeighbours);
      }
   }

   removeWalls(grid) {
      for(let i = 0; i < grid.length; i++) {
         for(let j = 0; j < grid[i].length; j++) {
            this.removeWall(j, i);
         }
      }
   }

   removeWall(x, y) {
      this.set([x,y], this.#createWeightedNeighbours(x, y));
   }
}

export default WeightedMap;
