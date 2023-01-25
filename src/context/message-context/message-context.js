import React from "react"

const MessageContext = React.createContext({
   messages: [],
   createMessage: (messageType, message) => {},
   fadeMessage: (messageId) => {},
   removeMessage: (messageId) => {},
   clearMessages: () => {}
});

export default MessageContext;
