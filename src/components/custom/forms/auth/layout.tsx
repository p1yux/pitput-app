"use client";
import React from "react";
import { Card } from "@/components/ui/card";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <Card className="relative w-full max-w-md bg-white shadow-xl rounded-2xl border-0">
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
