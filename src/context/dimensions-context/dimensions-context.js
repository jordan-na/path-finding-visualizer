import React from "react";

const DimensionsContext = React.createContext({
   width: 50,
   height: 25,
   setGridDimensions: (width, height) => {}
});

export default DimensionsContext;
