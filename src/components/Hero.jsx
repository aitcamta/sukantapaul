"use client";
import { curve, heroBackground, robot } from "../assets";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";

import Image from "next/image";

const Hero = () => {

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" >
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h2 className="h2 mb-6 tiro">
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
        

        {/* <CompanyLogos className="hidden relative z-10 mt-20 lg:block" /> */}
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
