"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getAccessToken, logout as removeTokens } from "../../utils/auth";
import axios  from "axios";

// Define a User type
interface User {
  id: string;
  name?: string;
  email?: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  address?: string;
  email_verification_status?: boolean;
}

// Define an interface for the API response
interface UserResponse {
  data: User;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const response = await axios.get<UserResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data?.data) {
        setUser(response.data.data);
      } else {
        console.warn("Invalid user data received:", response.data);
        setUser(null);
      }
    } catch (error) {
      if (error) {
        console.error(
          "Failed to fetch user:",
        );
      } else {
        console.error("Unexpected error:", (error as Error).message);
      }
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(() => {
    removeTokens();
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
