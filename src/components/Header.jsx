"use client";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import logo from "../assets/logo.png";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useGlobalContext } from "../context/Store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  const { setUSER, userLogged, setUserLogged } = useGlobalContext();
  // Access the pathname and query params
  const pathname = router;

  const [openNavigation, setOpenNavigation] = useState(false);
  const navigation = [
    {
      id: "0",
      title: "Gallery",
      url: "#gallery",
    },
    {
      id: "1",
      title: "Pricing",
      url: "#pricing",
    },
    {
      id: "2",
      title: "How to use",
      url: "#how-to-use",
    },
    {
      id: "3",
      title: "Roadmap",
      url: "#roadmap",
    },
    {
      id: "4",
      title: userLogged ? "Dashboard" : "New account",
      url: userLogged ? "/profile" : "/signup",
      onlyMobile: true,
    },
    {
      id: "5",
      title: userLogged ? "Log Out" : "Sign in",
      url: userLogged ? "/logout" : "/login",
      onlyMobile: true,
    },{
      id: "6",
      title: "Description",
      url: "#description",
    },
  ];

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const getUserDetails = async () => {
    const res = await axios.post("/api/me");
    const userDetails = res.data.data._id;
    console.log("userDetails", userDetails);
    if (userDetails) {
      setUserLogged(true);
      setUSER(res.data.data);
      console.log("userLogged");
    } else {
      setUserLogged(false);
      console.log("userNotLogged");
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };
  useEffect(() => {
    if (!userLogged) {
      getUserDetails();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[12rem] xl:mr-8" href="/">
          <Image src={logo} width={190} height={40} alt="Brainwave" />
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {userLogged ? (
          <>
            <Link href="/profile">
              <Button className="hidden lg:block m-2" px="px-3">
                Dashboard
              </Button>
            </Link>
            <Link href="/logout">
              <Button className="hidden lg:block m-2" px="px-3">
                Log Out
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/signup"
              className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
            >
              New account
            </Link>
            <Button className="hidden lg:flex" href="/login">
              Sign in
            </Button>
          </>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
