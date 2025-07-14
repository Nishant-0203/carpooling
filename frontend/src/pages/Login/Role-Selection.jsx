"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Or your button component

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "admin") {
      navigate("/admin-register");
    } else if (role === "user") {
      navigate("/Register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100">
      <h1 className="text-3xl font-semibold">Are you a User or an Admin?</h1>
      <div className="flex gap-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          onClick={() => handleRoleSelect("user")}
        >
          User
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          onClick={() => handleRoleSelect("admin")}
        >
          Admin
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;
