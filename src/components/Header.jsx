"use client";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import logo from "../assets/logo.png";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useGlobalContext } from "../context/Store";
import { useRouter, usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  const routePath = usePathname();
  const { setUSER, userLogged, setUserLogged } = useGlobalContext();
  // Access the pathname and query params
  const pathname = router;
  const [openNavigation, setOpenNavigation] = useState(false);
  const [navMenu, setNavMenu] = useState([]);
  const homePageNavigation = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Gallery",
      url: "#gallery",
    },
    {
      title: "Description",
      url: "#description",
    },
    {
      title: "How to use",
      url: "#how-to-use",
    },
    {
      title: "Roadmap",
      url: "#roadmap",
    },
    {
      title: userLogged ? "Dashboard" : "New account",
      url: userLogged ? "/profile" : "/signup",
      onlyMobile: true,
    },
    {
      title: userLogged ? "Log Out" : "Sign in",
      url: userLogged ? "/logout" : "/login",
      onlyMobile: true,
    },
  ];
  const subPageNavigation = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: userLogged ? "Dashboard" : "New account",
      url: userLogged ? "/profile" : "/signup",
    },
    {
      title: userLogged ? "Log Out" : "Sign in",
      url: userLogged ? "/logout" : "/login",
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
    const userData = res.data;
    if (userData.success) {
      const userDetails = userData.data._id;
      if (userDetails) {
        setUserLogged(true);
        setUSER(userData.data);
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
  }, [userLogged]);

  useEffect(() => {
    if (routePath === "/") {
      setNavMenu(homePageNavigation);
    } else {
      setNavMenu(subPageNavigation);
    }

    //eslint-disable-next-line
  }, [routePath]);

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
            {navMenu.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code uppercase text-n-1 transition-colors hover:text-color-1 ${
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
