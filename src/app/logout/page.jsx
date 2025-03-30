"use client";
import axios from "axios";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function page() {
  const router = useRouter();
  const { setUSER, userLogged, setUserLogged } = useGlobalContext();
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get("/api/logout");

        setUSER({
          id: "",
          name: "",
          phone: "",
          email: "",
          gp: "",
          isAdmin: false,
        });
        setUserLogged(false);
        router.push("/login");
      } catch (error) {
        console.log("Logout failed", error.message);
        toast.error(error.message);
      }
    };
    logout();
  }, []);
  return <div>page</div>;
}
