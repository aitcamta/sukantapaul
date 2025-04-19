"use client";
import Image from "next/image";
import React from "react";
import { namaskar } from "../../assets";
import { useGlobalContext } from "../../context/Store";

export default function AskMLA() {
  const { USER, userLogged } = useGlobalContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mt-40 lg:mt-20 md:mt-20">
      <div
        className="rounded-full overflow-hidden relative inline-flex w-auto h-32 p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-2"
        style={{ width: 150, height: 150 }}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full items-center justify-center  bg-slate-950 text-sm font-medium text-white backdrop-blur-3xl">
          <Image
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
      <h1 className="h1 mb-4 text-center">Ask Your MLA, SUKANTA PAUL</h1>
      <hr />
      <p
        className="body-1 max-w-screen-2xl mx-auto text-n-2 lg:mb-8 tiro px-6 text-justify"
        style={{
          textIndent: 50,
        }}
      >
        আপনাদের যেকোনো সমস্যা, অভাব, অভিযোগ, আদেশ, অনুরোধ সমস্ত কিছু শুনতে আমি
        অত্যন্ত আগ্রহী। আপনাদের যেকোনো সমস্যার সুরাহা করতে পারলে নিজেকে ধন্য মনে
        করবো। স্পশকাতর বিষয়ে আপনার সমস্ত পরিচয় গোপন রাখার নিশ্চয়তা আমি দিচ্ছি।
        তাই আপনারা নিঃসংকোচে আপনাদের জবাব দিতে পারেন। ৪৮ ঘন্টার মধ্যে আপানাকে
        আমি যথাযত প্রত্যুত্তর দেবার চেষ্টা করবো।
      </p>
      
    </div>
  );
}
