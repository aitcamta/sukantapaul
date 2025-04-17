"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Store";
import { Button } from "../../components/ui/moving-border";
import Loader from "../../components/design/Loader";

export default function editProfile() {
  const router = useRouter();
  const { USER, userLogged } = useGlobalContext();
  const [user, setUser] = useState({
    id: USER.id,
    name: USER.name,
    phone: USER.phone,
    email: USER.email,
    gp: USER.gp,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/updateProfile", user);
      if (response.data.success) {
        setLoading(false);
        toast.success("Profile Updated Successfully and Verification Email Sent");
        router.push("/logout");
      } else {
        toast.error("Something Went wrong");
        setLoading(false);
      }
    } catch (error) {
      console.log("SignUp error: " + error);
      toast.error(error.message);
    }
  };
  function ValidateEmail(mail) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return true;
    }
    // alert("You have entered an invalid email address!");
    return false;
  }
  useEffect(() => {
    if (
      ValidateEmail(user.email) &&
      user.phone.length === 10 &&
      user.name.length > 0 &&
      user.gp.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  useEffect(() => {
    if (!userLogged) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mt-40 lg:mt-20 md:mt-20">
      <h1 className="text-3xl mb-4">
        {loading ? "Processing" : "Update Your Profile"}
      </h1>
      <hr />

      <label htmlFor="name">Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="name"
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Enter Name"
        required
      />
      <label htmlFor="mobile">Mobile Number</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="mobile"
        type="number"
        value={user.phone}
        onChange={(e) => {
          if (e.target.value.length <= 10) {
            setUser({ ...user, phone: e.target.value });
          } else {
            toast.error("Mobile Number should be 10 digits");
            setUser({ ...user, phone: e.target.value.slice(0, 10) });
          }
        }}
        placeholder="Enter Mobile Number"
        required
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter Email"
        required
      />
      <label htmlFor="gp">GP</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="gp"
        type="text"
        value={user.gp}
        onChange={(e) => setUser({ ...user, gp: e.target.value })}
        placeholder="Enter GP"
      />

      <Button
        borderRadius="1.75rem"
        className=" dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
        onClick={() => {
          if (buttonDisabled) {
            toast.error("Please Enter Correct Details");
          } else {
            updateProfile();
          }
        }}
      >
        Update
      </Button>
      <div className="mt-4">
        <Button
          borderRadius="1.75rem"
          className=" dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={() => router.push("/profile")}
        >
          Cancel
        </Button>
      </div>
      {loading && <Loader />}
    </div>
  );
}
