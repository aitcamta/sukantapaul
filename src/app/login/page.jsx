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
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("Login status", response.data);
      if (response.data.success) {
        toast.success("Login success");
        setUSER(response.data.user);
        setUserLogged(true);
        router.push("/profile");
      } else {
        setLoading(false);
        toast.error(response.data.message);
        if(response.data.message === "Please Verify Your Email or Password") {
          toast.error("Please Check Your Spam Folder for Verification Email");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Login failed", error.message);
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
  const getUserDetails = async () => {
    const res = await axios.post("/api/me");
    const userData = res.data
    if (userData.success) {
      const userDetails = userData.data._id;
      if (userDetails) {
        setUserLogged(true);
        setUSER(userData.data);
        router.push("/profile");
        console.log("userLogged");
      } else {
        setUserLogged(false);
        console.log("userNotLogged");
      }
    } else {
      setUserLogged(false);
      console.log("userNotLogged");
    }
  };
  useEffect(() => {
    if (ValidateEmail(user.email) && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  useEffect(() => {
    if (userLogged) {
      router.push("/profile");
    }else {
      getUserDetails();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div suppressHydrationWarning>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl mb-4">Login</h1>
          <hr />

          <label htmlFor="email">email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            required
          />
          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            required
          />

          <Button
            borderRadius="1.75rem"
            className="dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={onLogin}
            disabled={buttonDisabled}
          >
            Login here
          </Button>
          <div className="mt-4">
            <Button
              borderRadius="1.75rem"
              className="dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={() => router.push("/forgotPassword")}
            >
              Forgot Password
            </Button>
          </div>
          <div className="mt-4">
            <Button
              borderRadius="1.75rem"
              className="dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={() => router.push("/signup")}
            >
              Visit Signup page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
