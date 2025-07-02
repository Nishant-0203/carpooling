// src/components/ui/card.jsx
import React from "react";

const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-xl bg-white/5 p-6 shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h2 className={`text-xl font-bold ${className}`} {...props}>
    {children}
  </h2>
);

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
