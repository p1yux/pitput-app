"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "@/utils/auth";
import AuthLayout from "./layout"; // Import the new layout

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Lucide icons
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import { Github, Linkedin } from "lucide-react";

interface RegisterResponse {
  success: boolean;
  message?: string;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

interface RegisterPopProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPop: React.FC<RegisterPopProps> = ({
  onClose,
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<RegisterResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.tokens || {};
        if (!accessToken || !refreshToken) {
          throw new Error("Tokens are missing from the response");
        }
        setTokens(accessToken, refreshToken);
        toast.success("Registration successful");
        onClose();
        router.push("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <CardHeader className="text-center pb-2">
        <div className="bg-gray-100 p-2 rounded-full inline-flex items-center justify-center mx-auto">
          <LogIn className="h-5 w-5 text-gray-700" />
        </div>
        <CardTitle className="text-xl font-semibold mt-3">
          Create an account
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Make a new doc to bring your words, data, and team together. For free
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
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
          <Separator className="my-4" />
          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Get Started"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <span>Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:underline"
          >
            Sign in
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <span>Or sign up with</span>
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
      </CardContent>
    </AuthLayout>
  );
};

export default RegisterPop;
