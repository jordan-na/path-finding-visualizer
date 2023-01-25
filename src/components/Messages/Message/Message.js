import classes from "./Message.module.css";
import xIcon from "../../../assets/x-icon.svg";
import { useEffect } from "react";
import MessageType from "../../../enums/MessageType";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useRef } from "react";

const Message = ({ message, onClick, onRemove }) => {
   const [duration, setDuration] = useState(0);

   const {animation} = message;

   let classList = `${classes.message} ${animation ? classes[animation] : ""}`;

   switch (message.type) {
      case MessageType.PURPLE:
         classList += ` ${classes.purple}`;
         break;
      case MessageType.TURQUOISE:
         classList += ` ${classes.turquoise}`;
         break;
      case MessageType.GREEN:
         classList += ` ${classes.green}`;
         break;
      default:
         classList += ` ${classes.purple}`;
   }

   useEffect(() => {
      let interval;
      if(message.timeout) {
         interval = setInterval(() => {
            setDuration((duration) => duration + 1);
         }, message.timeout / 100);
      }
      return () => {
         clearInterval(interval);
      }
   }, [message.timeout]);

   useEffect(() => {
      if(duration >= 100) {
         onClick( message.id);
      }
   }, [duration]);

   return (
      <li
         className={classList}
         onClick={onClick.bind(null, message.id)}
         onAnimationEnd={onRemove.bind(null, message.id, message.animation)}
      >
         <div className={classes["close-button"]}>
            <CircularProgressbarWithChildren
               value={duration}
               strokeWidth={10}
               styles={buildStyles({
                  pathColor: "#fff",
                  textColor: "#f88",
                  trailColor: "none",
                  backgroundColor: "none",
                  pathTransition: "none"
               })}
            >
               <img src={xIcon} alt="close notification button" />
            </CircularProgressbarWithChildren>
         </div>

         {message.message}
      </li>
   );
};

export default Message;
