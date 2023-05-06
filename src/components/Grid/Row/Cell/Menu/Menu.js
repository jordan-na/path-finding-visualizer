import { useContext, useState } from "react";
import GridContext from "../../../../../context/grid-context/grid-context";
import ThemeContext from "../../../../../context/theme-context/theme-context";
import PointType from "../../../../../enums/PointType";
import classes from "./Menu.module.css";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { useRef } from "react";
import React from "react";
import Modal from "../../../../Modal/Modal";

const Menu = (props) => {

   const [showModal, setShowModal] = useState(false);
   const [validInput, setValidInput] = useState(true);

   const themeContext = useContext(ThemeContext);
   const gridContext = useContext(GridContext);

   const wrapperRef = useRef();
   const inputRef = useRef();

   useEffect(() => {
      const handleClickOutside = (event) => {
         const overlays = document.querySelector("#overlays");
         if (wrapperRef.current && !wrapperRef.current.contains(event.target) && !overlays.contains(event.target)) {
            gridContext.setEnablePointerEvents(true);
            props.setMenu((menu) => {
               return {
                  show: false,
                  location: menu.location,
               };
            });
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [wrapperRef]);

   const menuData = {
      isEmpty: [
         {
            name: "Add Wall",
            onClick: () => gridContext.fillCell(props.row, props.col, PointType.WALL),
         },
         {
            name: "Add Weight",
            onClick: () => gridContext.fillCell(props.row, props.col, PointType.WEIGHT),
         },
         {
            name: "Move Start Here",
            onClick: () => gridContext.setStartCoord({ x: props.col, y: props.row }),
         },
         {
            name: "Move Target Here",
            onClick: () => gridContext.setTargetCoord({ x: props.col, y: props.row }),
         },
      ],
      isWall: [
         {
            name: "Remove Wall",
            onClick: () => gridContext.removePoint(props.row, props.col),
         },
         {
            name: "Change to Weight",
            onClick: () => gridContext.fillCell(props.row, props.col, PointType.WEIGHT),
         },
      ],
      isWeight: [
         {
            name: "Remove Weight",
            onClick: () => gridContext.removePoint(props.row, props.col),
         },
         {
            name: "Change to Wall",
            onClick: () => gridContext.fillCell(props.row, props.col, PointType.WALL),
         },
         {
            name: "Change Weight Value",
            onClick: () => setShowModal(true),
         },
      ],
      isStart: [
         {
            name: "Move Start Node",
         },
      ],
      isTarget: [
         {
            name: "Move Target Node",
         },
      ],
   };

   if(!gridContext.showWeights) {
      menuData.isWeight.push({
         name: "View Weight",
         mouseOver: () => props.setShowWeight(true),
         mouseOut: () => props.setShowWeight(false),
      });
   }

   let menu;
   if (props.cellData.isStart) {
      menu = menuData.isStart;
   } else if (props.cellData.isTarget) {
      menu = menuData.isTarget;
   } else if(props.cellData.isEmpty) {
      menu = menuData.isEmpty;
   } else if (props.cellData.isWall) {
      menu = menuData.isWall;
   } else if (props.cellData.isWeight) {
      menu = menuData.isWeight;
   }

   const clickHandler = (el) => {
      el.onClick();
      if (el.name !== "Change Weight Value")
         props.setMenu((menu) => {
            return {
               show: false,
               location: menu.location,
            };
         });
      gridContext.setEnablePointerEvents(true);
   };

   const closeModalHandler = () => {
      setShowModal(false);
      gridContext.setEnablePointerEvents(false);
   };

   const focusInput = () => {
      inputRef.current.focus();
   };

   const validateInput = () => {
      setValidInput(inputRef.current.value.match("^0*(?:[1-9][0-9]?|100)$"));
   };

   const setWeightHandler = () => {
      const weight = parseInt(inputRef.current.value);
      gridContext.setWeight(props.row, props.col, weight);
      setShowModal(false);
      gridContext.setEnablePointerEvents(true);
      props.setMenu((menu) => {
         return {
            show: false,
            location: menu.location,
         };
      });
   };

   const checkForEnter = (evt) => {
      if(evt.which === 13 && validInput) {
         setWeightHandler();
      }
   }

   return (
      <React.Fragment>
         <div ref={wrapperRef} className={`${classes.menu} ${classes[themeContext.theme]}`} style={props.style}>
            <ul>
               {menu.map((el) => {
                  return (
                     <li key={uuid()}>
                        <button
                           className={classes["menu-item"]}
                           onClick={clickHandler.bind(null, el)}
                           onMouseOver={el.mouseOver}
                           onMouseOut={el.mouseOut}
                        >
                           {el.name}
                        </button>
                     </li>
                  );
               })}
            </ul>
         </div>
         {showModal && (
            <Modal onCloseModal={closeModalHandler}>
               <div className={`${classes.modal} ${classes[themeContext.theme]}`}>
                  <h2 className={`${classes.header}`}>Change Weight Value</h2>
                  <div className={classes["input-container"]}>
                     <label className={`${classes.label}`} htmlFor="weight-input">
                        Weight
                     </label>
                     <input
                        defaultValue={props.weight}
                        ref={inputRef}
                        id="weight-input"
                        type="text"
                        className={`${classes.input}`}
                        onClick={focusInput}
                        onChange={validateInput}
                        onKeyDown={checkForEnter}
                     />
                     {!validInput && (
                        <label className={classes["error-mssg"]}>Please enter a whole number between 1 and 100</label>
                     )}
                  </div>
                  <button
                     className={`${classes.button} ${validInput ? "" : classes.invalid}`}
                     onClick={setWeightHandler}
                  >
                     Set Weight
                  </button>
               </div>
            </Modal>
         )}
      </React.Fragment>
   );
};

export default Menu;