const setGlobalVariable = (variable, value) => {
   document.documentElement.style.setProperty(variable, value);
};

const ToolsCSS = {
   setGlobalVariable: setGlobalVariable
};

export default ToolsCSS;