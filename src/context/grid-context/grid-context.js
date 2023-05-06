import React from "react";

const GridContext = React.createContext({
   grid: [],
   startCoord: {},
   setStartCoord: () => {},
   targetCoord: {},
   setTargetCoord: () => {},
   fillCell: (row, col, type) => {},
   removePoint: (row, col) => {},
   setWeight: (row, col, weight) => {},
   clearNodes: (type) => {},
   visualizeMaze: () => {},
   visualizeAlgorithm: async () => {},
   visualizing: false,
   setMovingStart: () => {},
   movingStart: false,
   setMovingTarget: () => {},
   movingTarget: false,
   setShowWeights: () => {},
   showWeights: false,
   placingPoints: false,
   setPlacingPoints: () => {},
   enablePointerEvents: true,
   setEnablePointerEvents: () => {},
});

export default GridContext;
