"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "@/utils/auth";
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
import { motion } from "framer-motion";
import { ApiError } from "@/types/error";

interface OtpResponse {
  accessToken: string;
  refreshToken: string;
}

interface OtpVerificationProps {
  email: string;
  onClose: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  onClose,
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post<OtpResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify-email-otp`,
        { email, otp }
      );

      if (response.data.accessToken && response.data.refreshToken) {
        toast.success("OTP verified successfully");
        setTokens(response.data.accessToken, response.data.refreshToken);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        onClose();
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center mb-4">
            <span className="bg-primary-light/20 rounded-xl p-2 shadow-lg">
              <MailIcon className="text-4xl text-primary" />
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute text-2xl top-4 right-4 text-gray-600 hover:text-primary transition-colors"
          >
            <CloseIcon />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-4">
            Verify Your Email
          </h2>

          <div className="border-t border-gray-300 mx-8 my-2"></div>

          <p className="text-center text-gray-600 mb-8">
            Enter the OTP sent to your email:{" "}
            <span className="font-semibold">{email}</span>
          </p>

          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <MailIcon />
              </span>
              <input
                type="text"
                name="otp"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full pl-10 px-4 py-2 border shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter OTP"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white shadow-md font-semibold text-lg mt-4 mb-4 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default OtpVerification;
