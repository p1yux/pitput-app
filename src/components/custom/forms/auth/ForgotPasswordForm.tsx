"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "./layout"; // Import the new layout

interface OtpResponse {
  accessToken: string;
  refreshToken: string;
}

interface OtpVerificationResponse {
  success: boolean;
  message?: string;
  tokens?: OtpResponse;
}

interface SendOtpResponse {
  success: boolean;
  message?: string;
}

const ForgotPasswordForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<SendOtpResponse>("/api/send-otp", {
        email,
      });
      if (response.data.success) {
        toast.success("OTP sent to your email.");
        setIsOtpSent(true);
      } else {
        toast.error(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred while sending the OTP.");
    } finally {
      setLoading(false);
    }
  };

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
        toast.success("OTP verified successfully. You are now logged in.");
        onClose();
        router.push("/"); // Redirect to home or dashboard
      } else {
        toast.error(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("An error occurred during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthLayout>
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-semibold mt-3">
            {isOtpSent ? "Verify OTP" : "Forgot Password"}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form
            onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
            className="space-y-4"
          >
            {!isOtpSent ? (
              <>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 pl-10 bg-gray-100 border-0"
                    required
                  />
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
            <Separator className="my-4" />
            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-lg"
              disabled={loading}
            >
              {loading
                ? isOtpSent
                  ? "Verifying..."
                  : "Sending..."
                : isOtpSent
                ? "Verify OTP"
                : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </AuthLayout>
    </>
  );
};

export default ForgotPasswordForm;
