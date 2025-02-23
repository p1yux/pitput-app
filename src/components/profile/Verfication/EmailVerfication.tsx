"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getAccessToken } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const EmailVerification = () => {
  const [token, setToken] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canResendOtp, setCanResendOtp] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);

  const sendEmailOtp = useCallback(
    async (authToken?: string | null) => {
      const currentToken = authToken || token;
      if (!currentToken) {
        toast.error("Authentication token missing");
        return;
      }

      setIsLoading(true);
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/send-email-otp`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("OTP sent successfully");
        setCanResendOtp(false);
        setCountdown(60);
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      setToken(accessToken);
      sendEmailOtp(accessToken);
    }
  }, [sendEmailOtp]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResendOtp(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const verifyEmailOtp = async () => {
    if (!token) {
      toast.error("Authentication token missing");
      return;
    }

    if (!otp || otp.trim().length === 0) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/verify-email`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Email verified successfully!");
      // Handle successful verification (e.g., redirect or update state)
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (canResendOtp) {
      sendEmailOtp();
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Email Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Please enter the 6-digit OTP sent to your email
            </p>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="text-center tracking-[10px] text-2xl"
            />
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleResendOtp}
                disabled={!canResendOtp}
                className="text-blue-600 hover:text-blue-700"
              >
                {canResendOtp ? "Resend OTP" : `Resend in ${countdown}s`}
              </Button>
              <Button
                onClick={verifyEmailOtp}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
