"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "@/utils/auth";

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Lucide icons
import { LogIn, Eye, EyeOff, Mail, Lock, Github, Linkedin } from "lucide-react";

import GoogleIcon from "@mui/icons-material/Google";

interface LoginResponse {
  success: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

interface LoginPopProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginPop: React.FC<LoginPopProps> = ({ onClose, onSwitchToRegister }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Any client-side logic that might cause hydration issues
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        setTokens(
          response.data.tokens.accessToken,
          response.data.tokens.refreshToken
        );
        toast.success("Login successful");
        onClose();
        router.push("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <Card className="relative w-full max-w-md bg-white shadow-xl rounded-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="bg-gray-100 p-2 rounded-full inline-flex items-center justify-center mx-auto">
            <LogIn className="h-5 w-5 text-gray-700" />
          </div>
          <CardTitle className="text-xl font-semibold mt-3">
            Sign in with email
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Make a new doc to bring your words, data, and team together. For
            free
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="h-12 pl-10 bg-gray-100 border-0"
                required
              />
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-12 pl-10 pr-10 bg-gray-100 border-0"
                required
              />
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-gray-700">
                Forgot password?
              </a>
            </div>
            <Separator className="my-4" />
            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Get Started"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <span>Or sign in with</span>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button className="p-3 rounded-full border border-gray-200 flex items-center justify-center">
              <GoogleIcon className="h-6 w-6" />
            </button>
            <button className="p-3 rounded-full border border-gray-200 flex items-center justify-center">
              <Github className="h-6 w-6" />
            </button>
            <button className="p-3 rounded-full border border-gray-200 flex items-center justify-center">
              <Linkedin className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <span>Don&apos;t have an account? </span>
            <button
              onClick={onSwitchToRegister}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPop;
