export const randomMaze = (width, height, startX, startY, targetX, targetY, isWeightMaze) => {
   const wallNodesInOrder = [];
   const randVal = isWeightMaze ? 2 : 4;
   for(let i = 0; i < height; i++) {
      for(let j = 0; j < width; j++) {
         const isStart = j === startX & i === startY;
         const isTarget = j === targetX & i === targetY;
         if(randomInt(1, 10) < randVal && !isStart && !isTarget) {
            wallNodesInOrder.push([j, i]);
         }
      }
   }
   return wallNodesInOrder;
}

const randomInt = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};