import { useContext } from "react";
import MessageContext from "../../context/message-context/message-context";
import classes from "./Messages.module.css";
import Message from "./Message/Message";
import React from "react";
import NotificationsIcon from "../../icons/NotificationsIcon/NotificationsIcon";
import { useState } from "react";
import { useEffect } from "react";


const Messages = () => {

   const[showMessages, setShowMessages] = useState(false);

   const messageContext = useContext(MessageContext);

   useEffect(() => {
      if(!showMessages) {
         messageContext.clearMessages();
      }
   }, [showMessages]);

   const fadeMessageHandler = (id) => {
      messageContext.fadeMessage(id);
   };

   const removeMessageHandler = (id, animation) => {
      if(animation === "fade-out") {
         messageContext.removeMessage(id);
      }
   };

   const toggleMessagesHandler = () => {
      setShowMessages((show) => !show);
   };

   return (
      <React.Fragment>
         {showMessages && (
            <ul className={classes.messages}>
               {messageContext.messages.reverse().map((message) => {
                  return (
                     <Message
                        key={message.id}
                        message={message}
                        onClick={fadeMessageHandler}
                        onRemove={removeMessageHandler}
                     />
                  );
               })}
            </ul>
         )}
         <button className={classes["notifications-button"]} onClick={toggleMessagesHandler}>
            <NotificationsIcon disabled={!showMessages}></NotificationsIcon>
         </button>
      </React.Fragment>
   );
};

export default Messages;