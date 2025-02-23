"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "@/utils/auth";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import { ApiError } from "@/types/error";
import OtpVerification from "./OtpVerification";
import { Mail } from "lucide-react";

// Define an interface for the API response
interface LoginResponse {
  success: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setIsRegisterOpen: (value: boolean) => void;
}

const LoginPopup = ({
  isOpen,
  onClose,
  setIsRegisterOpen,
}: LoginPopupProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);

  // Validate Email Format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isForgotPassword && !password) {
      toast.error("Password is required");
      return;
    }

    if (!isForgotPassword) {
      try {
        setLoading(true);
        console.log("Logging in with:", { email, password });

        const response = await axios.post<LoginResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/users/{id}`,
          { email, password }
        );

        console.log("API Response:", response.data);

        if (response.data?.success) {
          toast.success("Login successful");
          setTokens(
            response.data.tokens.accessToken,
            response.data.tokens.refreshToken
          );
          setTimeout(() => window.location.reload(), 1000);
          onClose();
          router.push("/");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.response?.data?.message) {
          toast.error(apiError.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setIsOtpStep(true);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <ToastContainer />
      {isOtpStep ? (
        <OtpVerification email={email} onClose={onClose} />
      ) : (
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
          >
            <CloseIcon />
          </button>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-primary-light/20 p-3 rounded-full mb-4">
              <LoginIcon className="text-primary text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </h2>
            <button
              onClick={() => {
                onClose();
                setIsRegisterOpen(true);
              }}
              className="text-gray-500 text-sm mt-1"
            >
              Sign in to continue
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Email"
              />
            </div>

            {!isForgotPassword && (
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Password"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>
                    {isForgotPassword ? "Sending OTP..." : "Signing in..."}
                  </span>
                </div>
              ) : (
                <span>{isForgotPassword ? "Send OTP" : "Sign In"}</span>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsForgotPassword(true)}
              className="text-gray-500 text-sm hover:text-primary transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoginPopup;
