"use client";

import axios from "axios";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/moving-border";
const page = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/verifyemail", { token });
      setVerified(true);
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Verify Email</h1>
      <h2 className="bg-orange-500 text-black p-4 rounded-md">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div className="mb-4">
          <h2 className="text-2xl">Email Verified</h2>
          <div className="mt-4">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </Button>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4">
          <h2 className="text-2xl rounded-md p-2 bg-red-500 text-black">
            Error
          </h2>
        </div>
      )}
    </div>
  );
};

export default page;
