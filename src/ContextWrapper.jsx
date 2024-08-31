import React from "react";
import ThemeProvider from "./context/ThemeContext";
import App from "./App";

const ContextWrapper = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default ContextWrapper;
