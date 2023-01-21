import { useEffect, useState } from "react";
import Storage from "../../utils/Storage";
import ControlContext from "./control-context";
import AlgorithmType from "../../enums/AlgorithmType";
import PointType from "../../enums/PointType";
import SpeedType from "../../enums/SpeedType";

const selectedAlgorithm = Storage.getValue("pfv__selected-algorithm");
const selectedSpeed = Storage.getValue("pfv__selected-speed");

const ControlProvider = (props) => {
   const [selectedControls, setSelectedControls] = useState({
      selectedAlgorithm: selectedAlgorithm || AlgorithmType.DIJKSTRAS_ALGORITHM,
      selectedPoint: PointType.WALL,
      selectedSpeed: selectedSpeed || SpeedType.VERY_FAST,
   });

   useEffect(() => {
      Storage.setValue("pfv__selected-algorithm", selectedControls.selectedAlgorithm);
      Storage.setValue("pfv__selected-speed", selectedControls.selectedSpeed);
   }, [selectedControls]);

   const setSelectedAlgorithm = (algorithm) => {
      setSelectedControls((prev) => {
         return {
            ...prev,
            selectedAlgorithm: algorithm,
         };
      });
   };

   const setSelectedPoint = (point) => {
      setSelectedControls((prev) => {
         return {
            ...prev,
            selectedPoint: point,
         };
      });
   };

   const setSelectedSpeed = (speed) => {
      setSelectedControls((prev) => {
         return {
            ...prev,
            selectedSpeed: speed,
         };
      });
   };

   const context = {
      selectedAlgorithm: selectedControls.selectedAlgorithm,
      setSelectedAlgorithm: setSelectedAlgorithm,
      selectedPoint: selectedControls.selectedPoint,
      setSelectedPoint: setSelectedPoint,
      selectedSpeed: selectedControls.selectedSpeed,
      setSelectedSpeed: setSelectedSpeed
   };

   return <ControlContext.Provider value={context}>{props.children}</ControlContext.Provider>;
};

export default ControlProvider;
