import classes from "./Hamburger.module.css";

const Hamburger = (props) => {

   return (
      <button className={`${classes.hamburger} ${props.open ? classes.open : ""}`} onClick={props.onClick}>
         <div className={`${classes.line} ${classes.one}`}></div>
         <div className={`${classes.line} ${classes.two}`}></div>
         <div className={`${classes.line} ${classes.three}`}></div>
         <div className={`${classes.line} ${classes.four}`}></div>
      </button>
   );
};

export default Hamburger;