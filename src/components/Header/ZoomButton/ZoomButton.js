import { useContext, useEffect, useState } from "react";
import DimensionsContext from "../../../context/dimensions-context/dimensions-context";
import ThemeContext from "../../../context/theme-context/theme-context";
import classes from "./ZoomButton.module.css";

const ZoomButton = () => {
   const themeContext = useContext(ThemeContext);
   const dimensionsContext = useContext(DimensionsContext);

   const [zoomData, setZoomData] = useState({
      zoom: 100,
      initialArea: dimensionsContext.width * dimensionsContext.height,
   });
   const [zoomLevel, setZoomLevel] = useState(0);

   useEffect(() => {
      setZoomData((prev) => {
         const newArea = dimensionsContext.width * dimensionsContext.height;
         const newZoom = Math.round(100 - ((newArea - prev.initialArea) / prev.initialArea) * 100);
         return {
            zoom: newZoom,
            initialArea: prev.initialArea,
         };
      });
   }, [dimensionsContext.height, dimensionsContext.width]);

   const zoomOut = () => {
      if(zoomLevel > -10) {
         dimensionsContext.setGridDimensions(dimensionsContext.width + 2, dimensionsContext.height + 1);
         setZoomLevel(zoomLevel => --zoomLevel);
      }
   };

   const zoomIn = () => {
      if(zoomLevel < 18) {
         dimensionsContext.setGridDimensions(dimensionsContext.width - 2, dimensionsContext.height - 1);
         setZoomLevel(zoomLevel => ++zoomLevel);
      }
   };

   return (
      <div className={`${classes["zoom-button-container"]} ${classes[themeContext.theme]}`}>
         <button className={classes["zoom-button"]} onClick={zoomOut}>
            -
         </button>
         <span className={classes["zoom-text"]}>{zoomData.zoom}%</span>
         <button className={classes["zoom-button"]} onClick={zoomIn}>
            +
         </button>
      </div>
   );
};

export default ZoomButton;
