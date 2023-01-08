import { useState } from "react";
import DimensionsContext from "./dimensions-context";

const DimensionsProvider = (props) => {
   const [dimensions, setDimensions] = useState({width: 50, height: 25});

   const setGridDimensions = (width, height) => {
      setDimensions({width: width, height: height});
   };

   const context = {
      width: dimensions.width,
      height: dimensions.height,
      setGridDimensions: setGridDimensions
   }

   return <DimensionsContext.Provider value={context}>{props.children}</DimensionsContext.Provider>
};

export default DimensionsProvider;