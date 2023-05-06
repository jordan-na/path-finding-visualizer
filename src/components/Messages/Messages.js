import { useEffect } from "react";
import classes from "./Messages.module.css";
import React from "react";
import NotificationsIcon from "../../icons/NotificationsIcon/NotificationsIcon";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Storage from "../../utils/Storage";

const Messages = () => {

   const[showMessages, setShowMessages] = useState(Storage.getValue("pfv__show-messages") || false);

   useEffect(() => {
      Storage.setValue("pfv__show-messages", showMessages);
   }, [showMessages]);

   const toggleMessagesHandler = () => {
      setShowMessages(prevState => !prevState);
   }

   return (
      <React.Fragment>
         <button className={classes["notifications-button"]} onClick={toggleMessagesHandler}>
            <NotificationsIcon disabled={!showMessages}></NotificationsIcon>
         </button>
         {showMessages && <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="colored"
            limit={5}
            style={{transform: "translate(-15px, -15px)"}}
         />}
      </React.Fragment>
   );
};

export default Messages;