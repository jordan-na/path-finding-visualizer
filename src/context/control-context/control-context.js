import React from "react"

const ControlContext = React.createContext({
   selectedAlgorithm: "",
   setSelectedAlgorithm: (algorithm) => {},
   selectedPoint: "",
   setSelectedPoint: (point) => {},
   selectedSpeed: "",
   setSelectedSpeed: (speed) => {},
});

export default ControlContext;