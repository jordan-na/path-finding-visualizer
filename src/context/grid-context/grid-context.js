import React from "react";

const GridContext = React.createContext({
   grid: [],
   startCoord: {},
   setStartCoord: () => {},
   targetCoord: {},
   setTargetCoord: () => {},
   fillCell: (row, col) => {},
   clearNodes: (type) => {},
   visualizeMaze: () => {},
   visualizeAlgorithm: async () => {},
   visualizing: false,
   setMovingStart: () => {},
   movingStart: false,
   setMovingTarget: () => {},
   movingTarget: false,
   setShowWeights: () => {},
   showWeights: false
});

export default GridContext;
