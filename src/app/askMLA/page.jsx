"use client";
import NextImage from "next/image";
import React from "react";
import { namaskar } from "../../assets";
import { useGlobalContext } from "../../context/Store";
import { useState, useRef } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  PhotoIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
export default function AskMLA() {
  const { USER, userLogged } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: USER.name || "",
    address: "",
    email: USER.email || "",
    phone: USER.phone || "",
    message: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (files[0].type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      } else {
        toast.error("Only image file wiil be accepted");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      name: USER.name || "",
      address: "",
      email: USER.email || "",
      phone: USER.phone || "",
      message: "",
      image: null,
    });
    fileInputRef.current.value = "";
  };
  const handleImageReset = () => {
    setFormData({ ...formData, image: null });
    fileInputRef.current.value = "";
  };
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 mt-44 lg:mt-28 md:mt-28">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-xl shadow-blue-500/10">
        <div className="text-center mb-8">
          <div
            className="rounded-full overflow-hidden relative inline-flex w-auto h-32 p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-2"
            style={{ width: 150, height: 150 }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center  bg-slate-950 text-sm font-medium text-white backdrop-blur-3xl">
              <NextImage
                src={namaskar}
                alt="namaskar"
                width={200}
                height={200}
                objectFit="cover"
                style={{
                  width: 150,
                  height: "auto",
                }}
              />
            </span>
          </div>

          <h3 className="h3 mb-4 text-center">Ask Your MLA, SUKANTA PAUL</h3>
          <hr />
          <p
            className="body-1 max-w-screen-2xl mx-auto text-n-2 lg:mb-8 tiro px-6 text-justify mt-10"
            style={{
              textIndent: 50,
            }}
          >
            আপনাদের যেকোনো সমস্যা, অভাব, অভিযোগ, আদেশ, অনুরোধ সমস্ত কিছু শুনতে
            আমি অত্যন্ত আগ্রহী। আপনাদের যেকোনো সমস্যার সুরাহা করতে পারলে নিজেকে
            ধন্য মনে করবো। স্পশকাতর বিষয়ে আপনার সমস্ত পরিচয় গোপন রাখার নিশ্চয়তা
            আমি দিচ্ছি। তাই আপনারা নিঃসংকোচে আপনাদের জবাব দিতে পারেন। ৪৮ ঘন্টার
            মধ্যে আপানাকে আমি যথাযত প্রত্যুত্তর দেবার চেষ্টা করবো।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Address Input */}
            <div className="relative">
              <HomeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your Address"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Message Textarea */}
            <div className="relative md:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message..."
                rows="4"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center px-4 py-6 bg-gray-700 rounded-lg border-2 border-dashed border-gray-500 cursor-pointer hover:border-blue-500 transition-colors w-full">
                  <PhotoIcon className="h-8 w-8 text-blue-500" />
                  <span className="mt-2 text-sm text-gray-300 text-center break-words whitespace-normal w-full">
                    {formData.image
                      ? formData.image.name
                      : "Upload an Image (if necessary)"}
                  </span>
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
          {formData.image && (
            <div className="flex relative justify-center items-center">
              <NextImage
                src={URL.createObjectURL(formData?.image)}
                alt="img"
                width={100}
                height={100}
                style={{ width: "200px", height: "auto" }}
                className="mx-auto"
              />
              <button
                onClick={handleImageReset}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          )}
          {/* Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all active:scale-95"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all active:scale-95"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
