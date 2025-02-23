"use client";
import { useUser } from "@/actions/UserContext/UserContext";
import UpdateUserDetails from "@/components/profile/UpdateUserDetails";
import EmailVerification from "@/components/profile/Verfication/EmailVerfication";
import { useTokenRedirect } from "@/utils/FindToken";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { User } from "@/types/user";

const Page = () => {
  useTokenRedirect();

  const { user } = useUser();
  const [userData, setUserData] = useState<User | null>(null);

  // Set user data when the user object is available
  useEffect(() => {
    if (user) {
      // Ensure user has all required fields
      const userData: User = {
        id: user.id,
        name: user.name || "", 
        email: user.email || "",
        gender: user.gender,
        address: user.address,
      };
      setUserData(userData);
    }
  }, [user]);

  console.log(userData); // This will log the user data

  return (
    <div className="mt-5">
      {userData && (
        <>
          <h2>User Details</h2>
          <p>Name: {userData.name}</p>
          <p>Address: {userData.address}</p>
          <p>Email: {userData.email}</p>
          <p>Gender: {userData.gender}</p>

          {userData.address && userData.email && userData.gender && (
            <UpdateUserDetails
              name={userData.name}
              address={userData.address}
              email={userData.email}
              gender={userData.gender}
            />
          )}
        </>
      )}

      {userData && <EmailVerification />}

      <ToastContainer />
    </div>
  );
};

export default Page;
