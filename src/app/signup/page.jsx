"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/moving-border";
import { toast } from "react-toastify";
import Loader from "../../components/design/Loader";
const page = () => {
  const id = uuid();
  const [user, setUser] = useState({
    id: id,
    name: "",
    phone: "",
    email: "",
    gp: "",
    password: "",
    confirmPassword: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      if (response.data.success) {
        setLoading(false);
        toast.success("Sign Up Success");
        router.push("/login");
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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
      user.gp.length > 0 &&
      user.password.length > 0 &&
      user.password === user.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mt-40 lg:mt-20 md:mt-20">
      <h1 className="text-3xl mb-4">{loading ? "Processing" : "Signup"}</h1>
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
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        required
      />
      <label htmlFor="cpassword">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="cpassword"
        type="text"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        placeholder="Confirm Password"
        required
      />

      <Button
        borderRadius="1.75rem"
        className="dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
        onClick={() => {
          if (buttonDisabled) {
            toast.error("Please Enter Correct Details");
          } else {
            onSignUp();
          }
        }}
      >
        Sign Up
      </Button>
      <div className="mt-4">
        <Button
          borderRadius="1.75rem"
          className="dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </Button>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default page;
