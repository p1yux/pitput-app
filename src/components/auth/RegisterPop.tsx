"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerification from "./OtpVerification";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { motion } from "framer-motion";
import { ApiError } from "@/types/error";
import { Mail } from "lucide-react";

interface RegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({
  isOpen,
  onClose,
  setIsLoginOpen,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const formData = { email, password };

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/users/{id}`,
        formData
      );

      toast.success("Registration successful");
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/send-otp`, {
        email,
      });
      setIsOtpStep(true);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
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
              <PersonAddIcon className="text-primary text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Account
            </h2>
            <button
              onClick={() => {
                onClose();
                setIsLoginOpen(true);
              }}
              className="text-gray-500 text-sm mt-1"
            >
              Sign up to get started
            </button>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegisterPopup;
