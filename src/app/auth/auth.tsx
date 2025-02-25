"use client";

import React, { useState } from "react";
import LoginPop from "@/components/auth/LoginPop"; // Import your Login component
import RegisterPop from "@/components/auth/RegisterPop"; // Import your Register component

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showLogin ? (
        <LoginPop
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <RegisterPop
          onClose={() => setShowLogin(true)}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      )}
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="mt-4 text-blue-500"
      >
        {showLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthPage;
