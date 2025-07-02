// src/components/ui/label.jsx
import React from "react";

const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium leading-6 ${className}`}
    >
      {children}
    </label>
  );
};

export { Label };
