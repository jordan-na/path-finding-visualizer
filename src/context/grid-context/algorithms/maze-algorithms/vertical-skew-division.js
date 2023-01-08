import { mazeDivision } from "./helper/maze-division";
import MazeType from "../../../../enums/MazeType";

export const verticalSkewDivisionMaze = (width, height, startX, startY, targetX, targetY) => {
   return mazeDivision(MazeType.VERTICAL_SKEW_DIVISION, width, height, startX, startY, targetX, targetY);
};
