"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Store";
import { Button } from "../../components/ui/moving-border";

export default function ProfilePage() {
  const router = useRouter();
  const { USER, setUSER, userLogged } = useGlobalContext();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    gp: "",
    isAdmin: false,
  });
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.post("/api/me");
    setData(res.data.data.id);
    setUSER(res.data.data);
    setUserData(res.data.data);
  };
  useEffect(() => {
    if (!userLogged) {
      getUserDetails();
    } else {
      setUserData(USER);
      setData(USER);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <hr />
      <h2 className="h2 ">
        {data === "nothing"
          ? "Nothing"
          : userData?.isAdmin
          ? `Hello Admin ${userData?.name}!`
          : `Hello ${userData?.name}!`}
      </h2>

      <hr />
      {data !== "nothing" ? (
        <div className="flex flex-col items-center justify-center mt-4 text-center">
          <h2 className="h2">User Details</h2>
          <p className="text-lg">{`ID: ${userData?.id}`}</p>
          <p className="text-lg">{`Name: ${userData?.name}`}</p>
          <p className="text-lg">{`Phone: ${userData?.phone}`}</p>
          <p className="text-lg">{`Email: ${userData?.email}`}</p>
          <p className="text-lg">{`GP: ${userData?.gp}`}</p>
          <Link href="/editProfile">
            <Button>Update Profile</Button>
          </Link>
          <Link href="/changePassword">
            <Button>Change Password</Button>
          </Link>
        </div>
      ) : (
        <Button onClick={getUserDetails}>Get Details</Button>
      )}
      {userData?.isAdmin && (
        <div className="flex flex-col items-center justify-center mt-4 text-center">
          <Button className="mb-3" onClick={() => router.push("/regUsers")}>
            View Users
          </Button>
          <Button className="mb-3" onClick={() => router.push("/photoUpload")}>
            Image Upload
          </Button>
        </div>
      )}
      <hr />
    </div>
  );
}
