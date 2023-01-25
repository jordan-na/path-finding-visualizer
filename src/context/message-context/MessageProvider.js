import { useState } from "react";
import MessageContext from "./message-context";
import { v4 as uuuid } from "uuid";
import MessageType from "../../enums/MessageType";

const MAX_MESSAGES = 3;

const MessageProvider = (props) => {
   const [messages, setMessages] = useState([
      // {
      //    id: uuuid(),
      //    type: MessageType.PURPLE,
      //    message: "Welcome to the app!",
      //    animation: "fade-in",
      //    timeout: 8000,
      // },
   ]);

   const createMessage = (message, messageType, timeout) => {
      // setMessages((messages) => {
      //    const updatedMessages = [...messages];
      //    for (let i = 0; i < updatedMessages.length; i++) {
      //       updatedMessages[i].animation = null;
      //    }
      //    if (messages.length >= MAX_MESSAGES) {
      //       const numToRemove = messages.length - MAX_MESSAGES + 1;
      //       for(let i = 0; i < numToRemove; i++)
      //          updatedMessages[i].animation = "fade-out";
      //    }
      //    updatedMessages.push({
      //       id: uuuid(),
      //       type: messageType,
      //       message: message,
      //       animation: "fade-in",
      //       timeout: timeout
      //    });
      //    return updatedMessages;
      // });
   };

   const fadeMessage = (messageId) => {
      // setMessages((messages) => {
      //    const updatedMessages = [...messages];
      //    for (let i = 0; i < updatedMessages.length; i++) {
      //       updatedMessages[i].animation = null;
      //    }
      //    const messageIndex = updatedMessages.findIndex((message) => message.id === messageId);
      //    if(messageIndex !== -1) {
      //       updatedMessages[messageIndex].animation = "fade-out";
      //    }
      //    return updatedMessages;
      // });
   };

   const removeMessage = (messageId) => {
      // setMessages((messages) => {
      //    const updatedMessages = [...messages];
      //    for (let i = 0; i < updatedMessages.length; i++) {
      //       updatedMessages[i].animation = null;
      //    }
      //    const messageIndex = updatedMessages.findIndex((message) => message.id === messageId);
      //    updatedMessages.splice(messageIndex, 1);
      //    return updatedMessages;
      // });
   };

   const clearMessages = () => {
      // setMessages([]);
   };

   const context = {
      messages: messages,
      createMessage: createMessage,
      fadeMessage: fadeMessage,
      removeMessage: removeMessage,
      clearMessages: clearMessages
   };

   return <MessageContext.Provider value={context}>{props.children}</MessageContext.Provider>;
};

export default MessageProvider;
