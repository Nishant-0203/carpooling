// src/components/ui/button.jsx
import React from "react";

const Button = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
