export const stairPattern = (width, height, startX, startY, targetX, targetY) => {
   const wallNodesInOrder = [];
   let originX = 0;
   let originY = 2;
   let stairX = originX;
   let stairY = originY;
   let fromBottom = false;
   let counter = 0;
   let drawHorizontal = true;
   let originXFromBottom;
   let counterFromBottom;
   let drawHorizontalFromBottom;
   while (stairX < width) {
      const newWalls = [];
      while (stairX < width && stairY >= 0) {
         const isStart = stairX === startX && stairY === startY;
         const isTarget = stairX === targetX && stairY === targetY;
         if(!containsPoint(newWalls, stairX, stairY) && !isStart && !isTarget) {
            newWalls.push([stairX, stairY]);
         }
         counter++;
         if (counter < 4) {
            if(drawHorizontal) {
               stairX++;
            } else {
               stairY--;
            }
         } else {
            drawHorizontal = !drawHorizontal
            counter = 0;
         }

      }
      const wallToRemove = randomInt(0, newWalls.length - 5);
      newWalls.splice(wallToRemove, 2);
      wallNodesInOrder.push(...newWalls);
      if (!fromBottom && originY + 6 > height - 1) {
         [originXFromBottom, counterFromBottom] = findOriginX(originY, height);
         originX = originXFromBottom - 6;
         drawHorizontalFromBottom = originY === height - 4;
         drawHorizontal = drawHorizontalFromBottom;
         counter = drawHorizontal ? 0 : counterFromBottom;
         originY = height - 1;
         fromBottom = true;
      } else if (fromBottom) {
         drawHorizontal = drawHorizontalFromBottom;
         counter = drawHorizontal ? 0 : counterFromBottom;
      } else {
         drawHorizontal = true;
         counter = 0;
      }
      if (fromBottom) {
         originX += 6;
      } else {
         originY += 6;
      }
      stairX = originX;
      stairY = originY;
   }
   return wallNodesInOrder;
};

const findOriginX = (originY, height) => {
   let newOriginY = originY + 6;
   let newOriginX = 0;
   let drawHorizontal = true;
   let counter = 0;
   while(newOriginY > height - 1) {
      if(drawHorizontal) {
         newOriginX += 3;
         drawHorizontal = false;
      } else if (counter < 3){
         newOriginY--;
         counter++;
      } else {
         counter = 0;
         drawHorizontal = true;
      }
   }
   return [newOriginX, counter];
}

const containsPoint = (arr, x, y) => {
   return arr.some((el) => {
            return el[0] === x & el[1] === y;
         });
}

const randomInt = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};
