"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/moving-border";
import Loader from "../../components/design/Loader";
const page = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const sendVerificationOTP = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/sendOTPMail", {
        email: user.email,
      });
      if (response.data.success) {
        setLoading(false);
        toast.success("OTP Sent to your email successfully");
        setOtpSent(true);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("OTP Sending failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const verifyOTP = async () => {
    if (user.otp.length === 6) {
      try {
        setLoading(true);
        const response = await axios.post("/api/verifyotp", {
          email: user.email,
          code: user.otp,
        });
        if (response.data.success) {
          setLoading(false);
          toast.success("OTP verified successfully");
          setIsVerified(true);
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("OTP Sending failed", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("OTP Must be in 6 digits");
    }
  };
  const forgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/updatePassword", user);
      if (response.data.success) {
        setLoading(false);
        toast.success("Password changed successfully");
        router.push("/login");
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Password Updation failed", error.message);
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

  return (
    <div suppressHydrationWarning>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl mb-4">Change Password</h1>
          <hr />
          {!otpSent && (
            <div className="flex flex-col items-center justify-center">
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
              <Button
                borderRadius="1.75rem"
                className=" dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
                onClick={() => {
                  sendVerificationOTP();
                }}
              >
                Send OTP
              </Button>
            </div>
          )}
          {otpSent && !isVerified && (
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="otp">OTP</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
                id="otp"
                type="number"
                value={user.otp}
                onChange={(e) => {
                  if (e.target.value.length <=6) {
                    setUser({ ...user, otp: e.target.value });
                  }
                }}
                placeholder="Enter Your 6 digit OTP"
                required
              />
              <Button
                borderRadius="1.75rem"
                className=" dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
                onClick={() => {
                  verifyOTP();
                }}
              >
                Verify OTP
              </Button>
            </div>
          )}
          {otpSent && isVerified && (
            <div className="flex flex-col items-center justify-center">
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
                    forgotPassword();
                  }
                }}
              >
                Update Password
              </Button>
            </div>
          )}

          <div className="mt-4">
            <Button
              borderRadius="1.75rem"
              className=" dark:bg-black text-white dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={() => router.push("/")}
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
