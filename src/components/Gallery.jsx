"use client";
import React, { useEffect, useState } from "react";
import { curve, heroBackground, robot } from "../assets";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";

import Image from "next/image";
import { firestore } from "../context/FirbaseContext";
import { collection, getDocs, query } from "firebase/firestore";
import { useGlobalContext } from "../context/Store";
import Loader from "./design/Loader";
export default function Gallery() {
  const { USER, setUSER, userLogged, slideState, setSlideState } =
    useGlobalContext();
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
      description: "This is the first image description",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
      description: "This is the second image description",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      description: "This is the third image description",
    },
  ];
  const [loader, setLoader] = useState(false);
  const [slide, setSlide] = useState([]);
  const getData = async () => {
    setLoader(true);
    const q = query(collection(firestore, "homeSliderImages"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    const orderedData = data.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });
    const imageData = orderedData.map((item) => {
      return {
        original: item.original,
        thumbnail: item.original,
        description: item.description,
      };
    });
    setSlide(imageData);
    setSlideState(orderedData);
    setLoader(false);
  };
  useEffect(() => {
    if (slideState.length > 0) {
      setLoader(true);
      const imageData = slideState.map((item) => {
        return {
          original: item.original,
          thumbnail: item.original,
          description: item.description,
        };
      });
      setSlide(imageData);
      setLoader(false);
    } else {
      getData();
    }
    //eslint-disable-next-line
  }, []);
  return (
    <Section
      className="-mt-[0.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="gallery"
    >
      {loader ? (
        <Loader />
      ) : (
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <ImageGallery
                items={slide}
                renderItem={(item) => (
                  <div className="h-[20rem] md:h-[30rem] lg:h-[40rem] xl:h-[50rem]">
                    <Image
                      src={item.original}
                      className="w-full h-full object-cover"
                      width={1024}
                      height={490}
                      alt="AI"
                    />
                    <div
                      className={`${
                        item.description.length > 75 ? `-mt-28` : `-mt-10`
                      } mb-3 mx-auto`}
                    >
                      <p
                        className="mx-auto tiro text-center break-words whitespace-normal max-w-[90%] leading-[1.5] text-white stroke-slate-950 dark:stroke-slate-950"
                        style={{
                          textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
                autoPlay={true}
                showFullscreenButton={true}
                showThumbnails={true}
              />
            </div>

            <Gradient />
          </div>
          <div className="absolute -top-[-40%] left-1/2 w-[220%] -translate-x-1/2 md:-top-[-40%] md:w-[138%] lg:-top-[-40%] lg:w-[150%] opacity-60">
            <Image
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>
      )}
    </Section>
  );
}
