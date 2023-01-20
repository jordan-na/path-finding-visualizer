import { mazeDivision } from "./helper/maze-division";
import MazeType from "../../../../enums/MazeType";

export const horizontalSkewDivisionMaze = (width, height, startX, startY, targetX, targetY) => {
   return mazeDivision(MazeType.HORIZONTAL_SKEW_DIVISION, width, height, startX, startY, targetX, targetY);
}
