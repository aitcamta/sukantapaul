"use client";
import React from "react";
import { curve, heroBackground, robot } from "../assets";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";

import Image from "next/image";
export default function Gallery() {
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
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="gallery"
    >
      <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
        <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
          <div className="relative bg-n-8 rounded-[1rem]">
            <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
            <ImageGallery
              items={images}
              renderItem={(item) => (
                <div className="h-[20rem] md:h-[30rem] lg:h-[40rem] xl:h-[50rem]">
                  <Image
                    src={item.original}
                    className="w-full h-full object-cover"
                    width={1024}
                    height={490}
                    alt="AI"
                  />
                  <p className="max-w-3xl mx-auto -mt-5 mb-3 tiro">
                    {item.description}
                  </p>
                </div>
              )}
              autoPlay={true}
              showFullscreenButton={true}
              showThumbnails={true}
            />
            {/* <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <Image
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />
            
                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <Image src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Code generation"
                  />
                </ScrollParallax>
              </div> */}
          </div>

          <Gradient />
        </div>
        <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
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
    </Section>
  );
}
