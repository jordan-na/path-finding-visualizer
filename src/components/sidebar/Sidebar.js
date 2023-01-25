import classes from "./Sidebar.module.css";
import Hamburger from "./Hamburger/Hamburger";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import AlgorithmsIcon from "../../icons/AlgorithmsIcon/AlgorithmsIcon";
import MazeIcon from "../../icons/MazeIcon/MazeIcon";
import PointIcon from "../../icons/PointIcon/PointIcon";
import ClearIcon from "../../icons/ClearIcon/ClearIcon";
import SpeedIcon from "../../icons/SpeedIcon/SpeedIcon";
import { useContext, useEffect, useState } from "react";
import ControlContext from "../../context/control-context/control-context";
import SidebarControl from "./SidebarControl/SidebarControl";
import ThemeContext from "../../context/theme-context/theme-context";
import Storage from "../../utils/Storage";
import GridContext from "../../context/grid-context/grid-context";
import WeightToggle from "./WeightToggle/WeightToggle";

const sidebarOpened = Storage.getValue("pfv__sidebar-opened");

const algorithmControls = [
   "Dijkstra's Algorithm",
   "A* Search",
   "Greedy Best-first Search",
   "Breadth-first Search",
   "Depth-first Search",
];

const patternControls = [
   "Recursive Division",
   "Recursive Division (vertical skew)",
   "Recursive Division (horizontal skew)",
   "Basic Random Maze",
   "Basic Weight Maze",
   "Simple Stair Pattern",
];

const pointControls = ["Wall", "Weight"];

const clearControls = ["Clear Board", "Clear Walls", "Clear Weights", "Clear Visited", "Clear Path"];

const speedControls = ["Very Fast", "Fast", "Medium", "Slow", "Very Slow"];

const Sidebar = () => {
   const themeContext = useContext(ThemeContext);
   const controlContext = useContext(ControlContext);
   const gridContext = useContext(GridContext);

   const [open, setOpen] = useState(sidebarOpened != null ? sidebarOpened : true);

   const toggleSidebar = () => {
      setOpen((open) => !open);
   };

   const clearBoardHandler = (type) => {
         gridContext.clearNodes(type, true);
   }

   useEffect(() => {
      Storage.setValue("pfv__sidebar-opened", open);
   }, [open]);

   const visualizeMazeHandler = (pattern) => {
      gridContext.visualizeMaze(pattern);
   }

   return (
      <div className={`${classes.sidebar} ${open ? classes.open : ""} ${classes[themeContext.theme]}`}>
         <div>
            <h2 className={classes.title}>Path Finder</h2>
            <Hamburger open={open} onClick={toggleSidebar} />
         </div>
         <nav className={classes.controls}>
            <SidebarControl
               control="Algorithms"
               subControls={algorithmControls}
               selectedControl={controlContext.selectedAlgorithm}
               controlIcon={<AlgorithmsIcon className={`${classes["control-icon"]}`} />}
               onControlChange={controlContext.setSelectedAlgorithm}
               sidebarOpened={open}
            />
            <SidebarControl
               control="Mazes & Patterns"
               subControls={patternControls}
               controlIcon={<MazeIcon className={`${classes["control-icon"]}`} />}
               onControlChange={visualizeMazeHandler}
               sidebarOpened={open}
            />
            <SidebarControl
               control="Selected Point"
               subControls={pointControls}
               selectedControl={controlContext.selectedPoint - 1}
               modifyIndex={true}
               controlIcon={<PointIcon className={`${classes["control-icon"]} ${classes.point}`} />}
               onControlChange={controlContext.setSelectedPoint}
               sidebarOpened={open}
            />
            <SidebarControl
               control="Clear"
               subControls={clearControls}
               controlIcon={<ClearIcon className={`${classes["control-icon"]}`} />}
               onControlChange={clearBoardHandler}
               sidebarOpened={open}
            />
            <SidebarControl
               control="Speed"
               subControls={speedControls}
               selectedControl={controlContext.selectedSpeed}
               controlIcon={<SpeedIcon className={`${classes["control-icon"]}`} />}
               onControlChange={controlContext.setSelectedSpeed}
               sidebarOpened={open}
            />
            <WeightToggle onlyShowButton={!open} />
         </nav>
         <ThemeToggle onlyShowButton={!open} />
      </div>
   );
};

export default Sidebar;
