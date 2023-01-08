import React from "react";

const GridContext = React.createContext({
   grid: [],
   startCoord: {},
   targetCoord: {},
   fillCell: (row, col) => {},
   clearNodes: (type) => {},
   visualizeMaze: () => {},
   visualizeAlgorithm: () => {}
});

export default GridContext;
