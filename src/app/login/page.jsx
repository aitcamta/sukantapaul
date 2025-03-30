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
  const [loading, setLoading] = React.useState(false);
  const [showVerifyBtn, setShowVerifyBtn] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("Login status", response.data);
      if (response.data.message === "Logged In Success") {
        toast.success("Login success");
        setUSER(response.data.user);
        setUserLogged(true);
        router.push("/profile");
      } else {
        toast.error(response.data.message);
        setShowVerifyBtn(true);
        setVerifyToken(response.data.verifyToken);
      }
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  useEffect(() => {
    if (userLogged) {
      router.push("/profile");
    }
  }, []);

  return (
    <div >
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl mb-4">Login</h1>
          <hr />

          <label htmlFor="email">email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            required
          />
          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            required
          />

          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={onLogin}
          >
            Login here
          </Button>
          {/* <div className="mt-4">
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={() => router.push("/signup")}
        >
          Visit Signup page
        </Button>
      </div> */}
          {showVerifyBtn && (
            <div className="mt-4">
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                onClick={() => router.push(`/verifyemail?token=${verifyToken}`)}
              >
                Verify your email
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
