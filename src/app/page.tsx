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
      <button
        onClick={() => (window.location.href = "/auth")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go to Auth Page
      </button>
    </div>
  );
}
