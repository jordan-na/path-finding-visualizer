import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import ThemeProvider from "./context/theme-context/ThemeProvider";
import ControlProvider from "./context/control-context/ControlProvider";
import GridProvider from './context/grid-context/GridProvider';
import DimensionsProvider from "./context/dimensions-context/DimensionsProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
         <ThemeProvider>
            <ControlProvider>
               <DimensionsProvider>
                  <GridProvider>
                     <App />
                  </GridProvider>
               </DimensionsProvider>
            </ControlProvider>
         </ThemeProvider>
   </React.StrictMode>
);
