import { mazeDivision } from "./helper/maze-division";
import MazeType from "../../../../enums/MazeType";

export const recursiveDivisionMaze = (width, height, startX, startY, targetX, targetY) => {
   return mazeDivision(MazeType.RECURSIVE_DIVISION, width, height, startX, startY, targetX, targetY);
}
