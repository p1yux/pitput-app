import { getAccessToken } from "@/utils/auth";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type UpdateUserDetailsProps = {
  name?: string;
  email?: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  address?: string;
};

const UpdateUserDetails: React.FC<UpdateUserDetailsProps> = (props) => {
  const [formData, setFormData] = useState({
    name: props.name || "",
    email: props.email || "",
    dob: props.dob || "",
    gender: props.gender || "",
    address: props.address || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (formData.name.length > 24) {
      toast.error("Name must not exceed 24 characters.");
      return;
    }
    if (formData.email.length > 34) {
      toast.error("Email must not exceed 34 characters.");
      return;
    }

    setLoading(true);
    const token = getAccessToken()
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("User details updated successfully.");
      } else {
        toast.error("Failed to update user details.");
      }
    } catch (error) {
      toast.error("An error occurred while updating user details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Update User Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name 
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={24}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email 
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={34}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="dob">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          {loading ? "Updating..." : "Update Details"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserDetails;
