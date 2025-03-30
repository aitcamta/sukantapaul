import React from "react";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";

export default function Description() {
  return (
    <Section
      className="pt-[5rem] "
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="description"
    >
      <div className="flex flex-col items-center justify-center w-full my-5">
        <p className="body-1 max-w-screen-2xl mx-auto text-n-2 lg:mb-8 tiro px-6" style={{
            textIndent:50
        }}>
          সম্মাননীয়া মুখ্যমন্ত্রী শ্রীমতি মমতা বন্দ্যোপাধ্যায়ের অনুপ্রেরণায় ও
          আদর্শে এবং সম্মাননীয় সাংসদ শ্রী অভিষেক বন্দ্যোপাধ্যায়ের পরামর্শে আমতা
          বিধানসভা কেন্দ্রের সার্বিক উন্নয়ন, সেবা ও কর্মসূচি নিয়ে আমি এবং আমার
          সুযোগ্য সহকর্মীরা নিরলস পরিশ্রম করে চলেছি। আমার ওয়েবসাইটে আপনারা আমার
          কাজকর্ম, বিভিন্ন প্রকল্পের তথ্য, সরকারি পরিষেবার সুবিধা, এবং আরও অনেক
          কিছু সম্পর্কে জানতে পারবেন। আমি আশা করি, এই ওয়েবসাইটটি আপনাদের জন্য
          উপকারী হবে। আপনারা আমার সঙ্গে যোগাযোগ করতে পারেন যেকোনো সময়। আমি
          আপনাদের সেবা করতে পারলে গর্বিত হব। আমি আপনাদের সকলের সহযোগিতা কামনা
          করছি। আসুন, আমরা একসঙ্গে আমতা কেন্দ্রের উন্নয়নে কাজ করি। ধন্যবাদ।
        </p>
      </div>

      
      <BottomLine/>
    </Section>
  );
}
