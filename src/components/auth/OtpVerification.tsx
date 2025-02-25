"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "@/utils/auth";
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface OtpResponse {
  accessToken: string;
  refreshToken: string;
}

interface OtpVerificationResponse {
  success: boolean;
  message?: string;
  tokens?: OtpResponse;
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
  const router = useRouter();

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<OtpVerificationResponse>(
        "/api/verify-otp",
        { email, otp }
      );

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.tokens || {};
        if (!accessToken || !refreshToken) {
          throw new Error("Tokens are missing from the response");
        }
        setTokens(accessToken, refreshToken);
        toast.success("OTP verified successfully");
        onClose();
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "OTP verification failed");
      }
    // } catch (error: unknown) {
    //   if (axios.isAxiosError(error)) {
    //     const apiError = error.response?.data;
    //     toast.error(apiError?.message || "OTP verification failed");
    //   } else {
    //     console.error("OTP verification error:", error);
    //     toast.error("OTP verification failed");
    //   }
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

          <Card className="relative w-full max-w-md bg-white shadow-xl rounded-2xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-semibold mt-3">
                Verify OTP
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="h-12 pl-10 bg-gray-100 border-0"
                    required
                  />
                </div>
                <Separator className="my-4" />
                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-500">
                <span>Didn&apos;t receive the OTP? </span>
                <button
                  onClick={onClose}
                  className="text-blue-500 hover:underline"
                >
                  Resend
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default OtpVerification;
