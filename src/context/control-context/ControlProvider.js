import { useEffect, useState } from "react";
import Storage from "../../utils/Storage";
import ControlContext from "./control-context";
import AlgorithmType from "../../enums/AlgorithmType";
import PointType from "../../enums/PointType";
import SpeedType from "../../enums/SpeedType";
import { toast } from "react-toastify";

const selectedAlgorithm = Storage.getValue("pfv__selected-algorithm");
const selectedSpeed = Storage.getValue("pfv__selected-speed");

let selected = false;

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

   useEffect(() => {
      if (selected) {
         let selectedAlgorithm;
         switch (selectedControls.selectedAlgorithm) {
            case AlgorithmType.DIJKSTRAS_ALGORITHM:
               selectedAlgorithm = "Dijkstra's Algorithm";
               break;
            case AlgorithmType.A_STAR_SEARCH:
               selectedAlgorithm = "A* Search";
               break;
            case AlgorithmType.GREEDY_BEST_FIRST:
               selectedAlgorithm = "Greedy Best-first Search";
               break;
            case AlgorithmType.BREADTH_FIRST:
               selectedAlgorithm = "Breadth-first Search";
               break;
            case AlgorithmType.DEPTH_FIRST:
               selectedAlgorithm = "Depth-first Search";
               break;
            default:
               console.error("Unrecognized algorithm selected");
         }
         toast("Algorithm set to " + selectedAlgorithm, { type: "info" });
      }
   }, [selectedControls.selectedAlgorithm]);

   useEffect(() => {
      if (selected) {
         let selectedPoint;
         switch (selectedControls.selectedPoint) {
            case PointType.WALL:
               selectedPoint = "Wall";
               break;
            case PointType.WEIGHT:
               selectedPoint = "Weight";
               break;
            default:
               console.error("Unrecognized point selected");
         }
         toast("Point set to " + selectedPoint, { type: "info" });
      }
   }, [selectedControls.selectedPoint]);

   useEffect(() => {
      if (selected) {
         let selectedSpeed;
         switch (selectedControls.selectedSpeed) {
            case SpeedType.VERY_FAST:
               selectedSpeed = "Very Fast";
               break;
            case SpeedType.FAST:
               selectedSpeed = "Fast";
               break;
            case SpeedType.MEDIUM:
               selectedSpeed = "Medium";
               break;
            case SpeedType.SLOW:
               selectedSpeed = "Slow";
               break;
            case SpeedType.VERY_SLOW:
               selectedSpeed = "Very Slow";
               break;
            default:
               console.error("Unrecognized speed selected");
         }
         toast("Speed set to " + selectedSpeed, { type: "info" });
      }
   }, [selectedControls.selectedSpeed]);

   const setSelectedAlgorithm = (algorithm) => {
      setSelectedControls((prev) => {
         selected = true;
         return {
            ...prev,
            selectedAlgorithm: algorithm,
         };
      });
   };

   const setSelectedPoint = (point) => {
      setSelectedControls((prev) => {
         selected = true;
         return {
            ...prev,
            selectedPoint: point,
         };
      });
   };

   const setSelectedSpeed = (speed) => {
      setSelectedControls((prev) => {
         selected = true;
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
      setSelectedSpeed: setSelectedSpeed,
   };

   return <ControlContext.Provider value={context}>{props.children}</ControlContext.Provider>;
};

export default ControlProvider;
