"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useTokenRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getToken();
      if (!token) {
        router.push("/");
      }
    }
  }, [router]);
};

export const useTokenRedirectReverse = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getToken();
      if (token) {
        router.push("/");
      }
    }
  }, [router]);
};

const getToken = () => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"));

  return cookies ? cookies.split("=")[1] : null;
};
