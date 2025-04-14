"use client";
import { curve } from "../assets";
import "react-image-gallery/styles/css/image-gallery.css";
import Section from "./Section";
import { BottomLine } from "./design/Hero";

import Image from "next/image";

const Hero = () => {
  return (
    <Section
      className="pt-[10rem] -mt-[7.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[1.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h2 className="h2 mb-4 tiro">
            আমতা কেন্দ্রের বিধায়ক {` `}
            <span className="inline-block relative ">
              সুকান্ত কুমার পাল
              <Image
                src={curve}
                className="absolute top-full left-0 w-full xl:mt-1"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h2>
          <h2 className="h2 my-3 tiro">-এর ওয়েবসাইটে আপনাকে স্বাগতম</h2>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
