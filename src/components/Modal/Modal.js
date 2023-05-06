import classes from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import ThemeContext from "../../context/theme-context/theme-context";
import { useContext } from "react";

const Backdrop = (props) => {
   return <div onClick={props.onClick} className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
   const themeContext = useContext(ThemeContext);

   return (
      <div className={`${classes.modal} ${classes[themeContext.theme]}`}>
         {props.children}
      </div>
   );
};

const portalElement = document.querySelector("#overlays");

const Modal = (props) => {
   return (
      <React.Fragment>
         {/* <Backdrop onClick={props.onCloseModal} />
         <ModalOverlay>{props.children}</ModalOverlay> */}
         {ReactDOM.createPortal(<Backdrop onClick={props.onCloseModal} />, portalElement)}
         {ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            portalElement
         )}
      </React.Fragment>
   );
};

export default Modal;
