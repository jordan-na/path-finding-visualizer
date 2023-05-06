import { useContext } from "react";
import ThemeContext from "../../context/theme-context/theme-context";

const colors = {
   light: "#333",
   dark: "#D3D3D3",
};

const WeightIcon = (props) => {
   const themeContext = useContext(ThemeContext);

   const color = props.color || colors[themeContext.theme];

   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         x="0px"
         y="0px"
         width="21.875px"
         height="21.875px"
         viewBox="0 0 21.875 21.875"
         enableBackground="new 0 0 21.875 21.875"
         xmlSpace="preserve"
         className={props.className}
      >
         <g id="Layer_4" display="none">
            <image
               display="inline"
               overflow="visible"
               width={18}
               height={24}
               xlinkHref="../Downloads/yoooo/glyphicons-673-kettlebell.png"
               transform="matrix(0.8497 0 0 0.8497 3.4233 1.0347)"
            />
         </g>
         <g id="Layer_3">
            <g>
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <line fill={color} x1={14.587} y1={21.873} x2={14.587} y2={21.873} />
               <path
                  fill={color}
                  d="M6.531,21.38c-1.805-1.345-2.973-3.494-2.973-5.917c0-2.421,1.167-4.569,2.969-5.915"
               />
               <line fill={colors[themeContext.theme]} x1={7.287} y1={21.875} x2={7.282} y2={21.872} />
               <polyline
                  fill={color}
                  points="15.345,21.376 6.527,21.376 6.527,9.549 15.345,9.549 15.345,21.376  "
               />
               <circle
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeMiterlimit={10}
                  cx={11.012}
                  cy={6.914}
                  r={5.512}
               />
               <path
                  fill={color}
                  d="M15.345,21.378c1.806-1.345,2.974-3.494,2.973-5.917c0-2.421-1.167-4.569-2.968-5.915"
               />
            </g>
         </g>
         <g id="Layer_2" display="none">
            <g display="inline">
               <rect
                  x={3.778}
                  y={11.427}
                  transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 28.6357 16.3531)"
                  fill={color}
                  width={14.306}
                  height={5.361}
               />
               <rect
                  x={3.792}
                  y={5.088}
                  transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 13.1915 20.9994)"
                  fill={color}
                  width={14.305}
                  height={5.361}
               />
            </g>
         </g>
      </svg>
   );
};

export default WeightIcon;
