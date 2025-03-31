"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/moving-border";
import { useGlobalContext } from "../../context/Store";
import Loader from "../../components/design/Loader";
const page = () => {
  const router = useRouter();
  const { USER, setUSER, userLogged, setUserLogged } = useGlobalContext();
  const [user, setUser] = React.useState({
    email: USER.email,
    password: "",
    confirmPassword: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const updatePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/updatePassword", user);
      console.log("Login status", response.data);
      if (response.data.success) {
        setLoading(false);
        toast.success("Password updated successfully");
        router.push("/logout");
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.password.length > 0 && user.password === user.confirmPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  useEffect(() => {
    if (!userLogged ) {
      router.push("/");
    }
  }, []);

  return (
    <div suppressHydrationWarning>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl mb-4">Change Password</h1>
          <hr />

          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="confirmPassword"
            type="text"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            placeholder="Confirm Password"
            required
          />
          <Button
            borderRadius="1.75rem"
            className=" dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={() => {
              if (buttonDisabled) {
                toast.error("Password and Confirm Password are different");
              } else {
                updatePassword();
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
      )}
    </div>
  );
};

export default page;
