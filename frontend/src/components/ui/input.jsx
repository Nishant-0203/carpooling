// src/components/ui/input.jsx
import React from "react";

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-2 rounded-md border bg-transparent outline-none text-white placeholder:text-gray-400 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
