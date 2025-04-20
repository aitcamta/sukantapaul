"use client";
import NextImage from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { namaskar } from "../../assets";
import { useGlobalContext } from "../../context/Store";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  PhotoIcon,
  HomeIcon,
  CheckCircleIcon,
  DocumentCheckIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import { toast } from "react-toastify";
import { firestore } from "../../context/FirbaseContext";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
  updateDoc,
  getDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../context/FirbaseContext";
import Loader from "../../components/design/Loader";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { DateValueToSring } from "../../helpers/calculatefunctions.js";
export default function AskMLA() {
  const { USER } = useGlobalContext();

  const [formData, setFormData] = useState({
    id: "",
    name: USER.name || "",
    address: "",
    email: USER.email || "",
    phone: USER.phone || "",
    message: "",
    image: null,
  });
  const [searchedData, setSearchedData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
    imageName: "",
    date: Date.now(),
    reply: "",
    replyDate: Date.now(),
  });
  const [loader, setLoader] = useState(false);
  const [messageID, setMessageID] = useState("");
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchToken, setSearchToken] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const fileInputRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const handleSearchToken = async () => {
    if (!searchToken.trim()) return;
    setSearchLoading(true);
    setSearchError("");
    const collectionRef = collection(firestore, "requests");
    const q = query(collectionRef, where("id", "==", searchToken));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const result = querySnapshot.docs[0].data();
      setSearchLoading(false);
      setSearchedData(result);
      setSearchResult(result);
      toast.success(`Your Token ${searchToken} found`);
    } else {
      setSearchLoading(false);
      setSearchError("No request found with this token");
      setSearchResult(null);
      toast.error("No token found");
    }
  };

  const toggleForms = () => {
    setShowSearchForm(!showSearchForm);
    setSearchToken("");
    setSearchResult(null);
    setSearchError("");
  };

  const handleSendVerification = async () => {
    if (!formData.email || !ValidateEmail(formData.email)) {
      toast.error("Please enter a valid email id");
      return;
    }
    setLoader(true);
    try {
      setLoader(true);
      const response = await axios.post("/api/sendVerificationEmail", {
        email: formData.email,
        name: formData.name,
      });
      if (response.data.success) {
        setLoader(false);
        toast.success("OTP Sent to your email successfully");
      } else {
        setLoader(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("OTP Sending failed", error.message);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
    setTimeout(() => {
      setLoader(false);
      setShowOTP(true);
      setTimer(30);
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    // Mock verification - in real app, compare with server-side OTP
    if (otp.length === 6) {
      try {
        setLoader(true);
        const response = await axios.post("/api/verifyotp", {
          email: formData.email,
          code: otp,
        });
        if (response.data.success) {
          setLoader(false);
          toast.success("OTP verified successfully");
          setEmailVerified(true);
          setShowOTP(false);
        } else {
          setLoader(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("OTP Sending failed", error.message);
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    } else {
      toast.error("OTP Must be in 6 digits");
    }
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const inputFile = files[0];
      if (inputFile.type.startsWith("image/")) {
        if (inputFile.size / 1024 <= 250) {
          setFormData((prev) => ({ ...prev, [name]: inputFile }));
        } else {
          const resizedBlob = await resizeImage(inputFile);
          setFormData((prev) => ({ ...prev, [name]: resizedBlob }));
        }
      } else {
        toast.error("Only image file wiil be accepted");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) return;
    // Handle form submission here
    setLoader(true);
    const docId = uuid().split("-")[0];
    if (formData.image) {
      const fileName = formData.image?.name;
      const filestorageRef = ref(storage, `/requests/${docId}-${fileName}`);
      const uploadTask = uploadBytesResumable(filestorageRef, formData.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            // console.log(url);
            try {
              const entry = {
                id: docId,
                name: formData.name,
                address: formData.address,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                imageName: `${docId}-${fileName}`,
                url: url,
                date: Date.now(),
                reply: null,
                replyDate: null,
              };
              try {
                const response = await axios.post(
                  "/api/sendRequestEmail",
                  entry
                );
                const record = response.data;
                if (record.success) {
                  await setDoc(doc(firestore, "requests", docId), entry);
                  setMessageID(docId);
                  setShowConfirmation(true);
                  toast.success("Congrats! Your Message stored Successfully!");
                  setLoader(false);
                }
              } catch (error) {
                console.log(error);
                toast.success("Failed to save Your Message!");
                setLoader(false);
              }
            } catch (e) {
              toast.success("Image Upload Failed!");
              setLoader(false);
            }
          });
        }
      );
    } else {
      const entry = {
        id: docId,
        name: formData.name,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        url: null,
        imageName: null,
        date: Date.now(),
        reply: null,
        replyDate: null,
      };
      try {
        const response = await axios.post("/api/sendRequestEmail", entry);
        const record = response.data;
        if (record.success) {
          await setDoc(doc(firestore, "requests", docId), entry);
          setMessageID(docId);
          setShowConfirmation(true);
          toast.success("Congrats! Your Message stored Successfully!");
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        toast.success("Failed to save Your Message!");
        setLoader(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      name: USER.name || "",
      address: "",
      email: USER.email || "",
      phone: USER.phone || "",
      message: "",
      image: null,
    });
    setEmailVerified(false);
    setShowOTP(false);
    setOtp("");
    setTimer(30);
    fileInputRef.current.value = "";
  };
  const handleImageReset = () => {
    setFormData({ ...formData, image: null });
    fileInputRef.current.value = "";
  };
  const handleNewRequest = () => {
    setShowConfirmation(false);
    setFormData((prev) => ({
      ...prev,
      id: "",
      name: USER.name || "",
      address: "",
      email: USER.email || "",
      phone: USER.phone || "",
      message: "",
      image: null,
    }));
    setEmailVerified(false);
    setShowOTP(false);
    setOtp("");
    setTimer(30);
    setMessageID("");
    setTimeout(() => {
      // Reset file input after component re-renders
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 0);
  };
  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);
  useEffect(() => {
    if (!showConfirmation && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [showConfirmation]);
  const resizeImage = (source) => {
    return new Promise(async (resolve, reject) => {
      try {
        let image;
        let originalName = "resized-image.jpg";

        // Handle different source types and capture filename
        if (source instanceof File) {
          // Handle File input
          originalName = source.name;
          image = await createImageBitmap(source);
        } else if (source instanceof HTMLImageElement) {
          // Handle Image element
          if (!source.complete || source.naturalWidth === 0) {
            throw new Error("HTMLImageElement not loaded properly");
          }
          image = source;
          originalName = source.src.split("/").pop() || "image.jpg";
        } else if (typeof source === "string") {
          // Handle URL string
          const url = new URL(source);
          originalName = url.pathname.split("/").pop() || "image.jpg";
          image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = source;
          });
        } else if (source instanceof Blob) {
          // Handle Blob input
          originalName = "blob-source.jpg";
          image = await createImageBitmap(source);
        } else if (source instanceof HTMLCanvasElement) {
          // Handle Canvas input
          image = source;
          originalName = "canvas-capture.jpg";
        } else {
          throw new Error("Unsupported image source type");
        }

        // Create canvas and context
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context not available");

        // Target dimensions
        const maxWidth = 1000;
        const maxHeight = 600;

        // Calculate dimensions
        const scaleFactor = Math.min(
          maxWidth / image.width,
          maxHeight / image.height,
          1 // Prevent upscaling
        );

        const width = Math.round(image.width * scaleFactor);
        const height = Math.round(image.height * scaleFactor);

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw resized image
        ctx.drawImage(image, 0, 0, width, height);

        // Convert to blob and create File object
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Blob conversion failed"));
              return;
            }

            // Sanitize filename and append suffix
            const baseName = originalName.replace(/\.[^/.]+$/, "");
            const cleanName = `${baseName.replace(/[^a-z0-9]/gi, "_")}_resized`;
            const finalFileName = `${cleanName}.jpg`;

            // Create File object with proper metadata
            const resizedFile = new File([blob], finalFileName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            resolve(resizedFile);
          },
          "image/jpeg",
          0.7
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  function ValidateEmail(mail) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return true;
    }
    // alert("You have entered an invalid email address!");
    return false;
  }
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 mt-44 lg:mt-28 md:mt-28">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-xl shadow-blue-500/10">
        {/* Header with toggle button */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={toggleForms}
            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
          >
            {showSearchForm ? (
              <>
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back to Form</span>
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Search Request</span>
              </>
            )}
          </button>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <HomeIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-100">
              {showSearchForm ? "Track Request" : "Get in Touch"}
            </h2>
          </div>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {showConfirmation ? (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
              <DocumentCheckIcon className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-100">
              Request Submitted Successfully! We will get back to you within 48
              hours.
            </h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300 mb-2">Your request token:</p>
              <div className="font-mono text-blue-400 break-all p-2 bg-gray-800 rounded">
                {messageID}
              </div>
            </div>
            <button
              onClick={handleNewRequest}
              className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
            >
              Create New Request
            </button>
          </div>
        ) : showSearchForm ? (
          // Search Token Form
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
                placeholder="Enter request token"
                className="w-full pl-4 pr-32 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearchToken}
                disabled={searchLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-all disabled:opacity-50"
              >
                {searchLoading ? "Searching..." : "Search"}
              </button>
            </div>

            {searchError && (
              <div className="p-3 bg-red-500/20 text-red-300 rounded-lg">
                {searchError}
              </div>
            )}

            {searchResult && (
              <div className="bg-gray-700 p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-2 text-green-400">
                  <DocumentCheckIcon className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">Request Details</h3>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-400">Name:</span>{" "}
                    {searchResult.name}
                  </p>
                  <p>
                    <span className="text-gray-400">Email:</span>{" "}
                    {searchResult.email}
                  </p>
                  <p>
                    <span className="text-gray-400">Submitted On:</span>{" "}
                    {DateValueToSring(searchedData.date)}
                  </p>
                  <p>
                    <span className="text-gray-400">Status:</span>{" "}
                    {searchedData.reply ? searchedData.reply : "In Progress"}
                  </p>
                  {searchedData.replyDate && (
                    <p>
                      <span className="text-gray-400">Replied On:</span>{" "}
                      {DateValueToSring(searchedData.replyDate)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
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

              <h3 className="h3 mb-4 text-center">
                Ask Your MLA, SUKANTA PAUL
              </h3>
              <hr />
              <p
                className="body-1 max-w-screen-2xl mx-auto text-n-2 lg:mb-8 tiro px-6 text-justify mt-10"
                style={{
                  textIndent: 50,
                }}
              >
                আপনাদের যেকোনো সমস্যা, অভাব, অভিযোগ, আদেশ, অনুরোধ সমস্ত কিছু
                শুনতে আমি অত্যন্ত আগ্রহী। আপনাদের যেকোনো সমস্যার সুরাহা করতে
                পারলে নিজেকে ধন্য মনে করবো। স্পশকাতর বিষয়ে আপনার সমস্ত পরিচয়
                গোপন রাখার নিশ্চয়তা আমি দিচ্ছি। তাই আপনারা নিঃসংকোচে আপনাদের
                জবাব দিতে পারেন। ৪৮ ঘন্টার মধ্যে আপানাকে আমি যথাযত প্রত্যুত্তর
                দেবার চেষ্টা করবো।
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

                {/* Email Input with Verification */}
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row gap-2">
                    {/* Email Input Container */}
                    <div className="flex-1 relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-2 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base truncate"
                        required
                        disabled={emailVerified}
                      />
                    </div>

                    {/* Verification Button */}
                    {!emailVerified ? (
                      <button
                        type="button"
                        onClick={handleSendVerification}
                        disabled={loader || showOTP}
                        className="w-full md:w-32 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-sm rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {loader
                          ? "Sending..."
                          : showOTP
                          ? "Sent ✓"
                          : "Verify Email"}
                      </button>
                    ) : (
                      <div className="w-full md:w-32 flex items-center justify-center px-4 py-3 bg-green-600/20 rounded-lg">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="ml-2 text-green-500 text-sm">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* OTP Input */}
                {showOTP && (
                  <div className="md:col-span-2 space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="w-full pl-4 pr-24 py-3 bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                        <button
                          type="button"
                          onClick={handleVerifyOTP}
                          className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-sm rounded-md"
                        >
                          Verify
                        </button>
                        <span className="text-gray-400 text-sm my-auto">
                          {timer > 0 ? (
                            `${timer}s`
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendVerification}
                              className="text-blue-500 hover:text-blue-400"
                            >
                              Resend
                            </button>
                          )}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 text-center">
                      We've sent a verification code to your email
                    </p>
                  </div>
                )}
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
                    className="right-12 md:right-72 lg:right-80"
                    style={{
                      position: "absolute",
                      top: "5px",
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
              {/* Submit Button (only when verified) */}
              {emailVerified && (
                <div className="flex gap-4 flex-col sm:flex-row">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all active:scale-95"
                  >
                    Submit Message
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all active:scale-95"
                  >
                    Clear Form
                  </button>
                </div>
              )}
            </form>
          </>
        )}
      </div>
      {loader && <Loader />}
    </div>
  );
}
