"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./SchemesSection.module.css";
import { GovtSchemes } from "../../constants";

export default function GovtScheme() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      mirror: false,
    });
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    // ...
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // const arrangeData = () => {
  //   const arrangedData = GovtSchemes.map((item, index) => {
  //     return { ...item, id: index + 1, delay: (index + 1) * 100 };
  //   });
  //   console.log(arrangedData);
  // };
  // useEffect(() => {
  //   arrangeData();
  // }, []);
  return (
    <div className="container min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-44 lg:mt-28 md:mt-28">
      <section className="py-8">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Important Schemes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GovtSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="flex flex-col rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={scheme.delay}
              >
                <div className="flex-1 p-6 bg-white">
                  <div className="text-center">
                    <img
                      src={scheme.imageSrc}
                      className="mx-auto mb-6 max-h-[120px] object-contain"
                      alt={scheme.title}
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 tiro">
                      {" "}
                      {scheme.title}
                    </h3>
                  </div>
                  <div
                    className={`text-gray-600 text-justify mb-6 ${styles.prose} tiro`}
                    dangerouslySetInnerHTML={{ __html: scheme.description }}
                  />
                </div>
                <div className="p-4 bg-gray-50 text-center">
                  <a
                    href={scheme.link}
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 tiro"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    বিশদ জানতে ক্লিক করুন
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
