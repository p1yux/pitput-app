"use client";
import { getAccessToken } from "@/utils/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken() || null;
    setToken(accessToken);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {token}
    </div>
  );
}
