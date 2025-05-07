import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "/signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "আমাকে প্রশ্ন করুন",
    text: "আপনাদের সমস্ত জিজ্ঞাসা, আদেশ, অনুরোধ, নিবেদন ও অভিযোগ শুনতে আমি সর্বদা আগ্রহী। স্পর্শকাতর বিষয়ে আপনার পরিচয় গোপন রাখাতে আমি আপনাদের কাছে অঙ্গীকারবদ্ধ।",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    pageUrl: "/askMLA",
  },
  {
    id: "1",
    title: "সরকারি প্রকল্পসমূহ",
    text: "এই অংশে আপনি রাজ্য সরকারের বিভিন্ন প্রকল্পের সুবিধা সম্পর্কে জানতে পারবেন।",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    pageUrl: "/govtSchemes",
    light: true,
  },
  {
    id: "2",
    title: "Connect everywhere",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
    pageUrl: "",
  },
  {
    id: "3",
    title: "Fast responding",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    pageUrl: "",
    light: true,
  },
  {
    id: "4",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    pageUrl: "",
  },
  {
    id: "5",
    title: "Improve everyday",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    pageUrl: "",
  },
];

export const socials = [
  // {
  //   id: "0",
  //   title: "Discord",
  //   iconUrl: discordBlack,
  //   url: "#",
  // },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "https://x.com/SukantaPaulAITC",
  },
  // {
  //   id: "2",
  //   title: "Instagram",
  //   iconUrl: instagram,
  //   url: "#",
  // },
  // {
  //   id: "3",
  //   title: "Telegram",
  //   iconUrl: telegram,
  //   url: "#",
  // },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "https://www.facebook.com/sukanta.k.paul.9",
  },
];
export const ImageFolders = [
  {
    id: "0",
    title: "Home Slider Images",
    folderName: "homeSliderImages",
  },
  {
    id: "1",
    title: "About Us Images",
    folderName: "aboutUsImages",
  },
  {
    id: "2",
    title: "Roadmap Images",
    folderName: "roadmapImages",
  },
  {
    id: "3",
    title: "Benefits Images",
    folderName: "benefitsImages",
  },
  {
    id: "4",
    title: "Galary Images",
    folderName: "galaryimages",
  },
  {
    id: "5",
    title: "Other Images",
    folderName: "otherimages",
  },
];

export const GovtSchemes = [
  {
    id: 1,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/krishok_bondhu.png",
    title: "কৃষক বন্ধু",
    description:
      "২০১৯ সালের জানুয়ারি মাসে পশ্চিমবঙ্গ সরকারের কৃষি বিভাগ <b>কৃষক বন্ধু</b> প্রকল্প চালু করেছিল, যার উদ্দেশ্য ছিল পশ্চিমবঙ্গের সকল কৃষককে কৃষিকাজের জন্য আর্থিক সহায়তা প্রদান এবং কৃষকদের অকালমৃত্যুর ক্ষেত্রে তাঁদের পরিবারকে সামাজিক নিরাপত্তা প্রদান। সম্প্রতি এই প্রকল্পটি পুনর্গঠিত ও নতুনভাবে নামকরণ করা হয়েছে <b>কৃষক বন্ধু (নতুন)</b>। পশ্চিমবঙ্গের মাননীয় মুখ্যমন্ত্রী ২০২১ সালের ১৭ই জুন নতুন এই প্রকল্পটি উদ্বোধন করেন।",
    delay: 100,
    link: "https://krishakbandhu.net",
  },
  {
    id: 2,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Student_Credit_Card.png",
    title: "স্টুডেন্ট ক্রেডিট কার্ড",
    description:
      "মাননীয় মুখ্যমন্ত্রী মমতা বন্দ্যোপাধ্যায়ের দূরদর্শী নেতৃত্বে পশ্চিমবঙ্গ সরকারের উচ্চশিক্ষা বিভাগ <b>স্টুডেন্ট ক্রেডিট কার্ড</b> প্রকল্প চালু করেছে, যাতে পশ্চিমবঙ্গের শিক্ষার্থীরা কোনও আর্থিক সীমাবদ্ধতা ছাড়াই তাদের পড়াশোনা চালিয়ে যেতে পারেন। এই প্রকল্পটি শিক্ষার্থীদের মাধ্যমিক, উচ্চ মাধ্যমিক, মাদ্রাসা, স্নাতক এবং স্নাতকোত্তর পড়াশোনা, পেশাদার ডিগ্রী এবং অন্যান্য সমতুল্য কোর্স করার জন্য সহায়তা করতে ডিজাইন করা হয়েছে। এর মাধ্যমে শিক্ষার্থীরা যে কোনও স্কুল, মাদ্রাসা, কলেজ, বিশ্ববিদ্যালয় এবং ভারত ও বিদেশের অন্যান্য অনুমোদিত প্রতিষ্ঠান থেকে তাদের শিক্ষা গ্রহণ করতে পারবেন।",
    delay: 200,
    link: "https://wbscc.wb.gov.in",
  },
  {
    id: 3,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BCC.png",
    title: "পশ্চিমবঙ্গ ভবিষ্যৎ ক্রেডিট কার্ড",
    description:
      "<b>কর্মসাথী প্রকল্প</b>-এর পরিবর্তে চালু করা হয়েছে এই নতুন প্রকল্প, যা <b>১৮-৪৫ বছর</b> বয়সী তরুণ উদ্যোক্তাদের জন্য উৎপাদন, সেবা এবং ব্যবসা/বাণিজ্য/কৃষিভিত্তিক কার্যক্রমে নতুন উদ্যোগ স্থাপনে ভর্তুকিযুক্ত ও জামানতবিহীন ঋণ প্রদান করে।",
    delay: 300,
    link: "https://bccs.wb.gov.in",
  },
  {
    id: 4,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Widow_Pension.png",
    title: "বিধবা পেনশন",
    description:
      "এই প্রকল্পটি সমাজের সুবিধাবঞ্চিত অংশের জন্য সামাজিক নিরাপত্তা প্রদান করার লক্ষ্যে চালু করা হয়েছে। পশ্চিমবঙ্গ সরকারের মহিলা ও শিশু উন্নয়ন এবং সমাজকল্যাণ বিভাগ এই প্রকল্পের প্রধান দায়িত্বপ্রাপ্ত সংস্থা।",
    delay: 400,
    link: "https://wbswpension.gov.in",
  },
  {
    id: 5,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/CHMS_Login_Logo.png",
    title: "তপশিলি বন্ধু ও জয় জোহার পেনশন স্কিম",
    description:
      "এই দুই প্রকল্প ১লা এপ্রিল, ২০২০-তে চালু করা হয়েছে। এর উদ্দেশ্য হল তপশিলি জাতি (তপশিলি বন্ধু) এবং তপশিলি উপজাতির (জয় জোহার) মানুষদের ৬০ বছর বয়সের পর সামাজিক নিরাপত্তা প্রদান করা।",
    delay: 500,
    link: "https://jaibangla.wb.gov.in",
  },
  {
    id: 6,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Manabik.png",
    title: "মানবিক পেনশন",
    description:
      "মানবিক পেনশন প্রকল্প ১লা এপ্রিল, ২০১৮-তে পশ্চিমবঙ্গের মাননীয় মুখ্যমন্ত্রী মমতা বন্দ্যোপাধ্যায় দ্বারা শুরু করা হয়েছিল। এটি পশ্চিমবঙ্গে প্রতিবন্ধী ব্যক্তিদের সাহায্য করার জন্য চালু করা হয়েছে। এই প্রকল্পটি মহিলা ও শিশু উন্নয়ন এবং সমাজকল্যাণ বিভাগের অধীনে রয়েছে।",
    delay: 600,
    link: "https://wbcdwdsw.gov.in",
  },
  {
    id: 7,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/kanyashree.png",
    title: "কন্যাশ্রী",
    description: `এই প্রকল্প পশ্চিমবঙ্গ সরকার দ্বারা চালু করা হয়েছে। এর উদ্দেশ্য হল:<br/><br/><b>&nbsp;&nbsp;1.&nbsp; </b> মেয়েদের স্কুলে থাকার বিষয়টি নিশ্চিত করা <br/></b>  2.  </b> অন্তত ১৮ বছর পর্যন্ত তাদের বিবাহ বিলম্বিত করা।<br/><br/><i>এই প্রকল্পের দুটি নগদ স্থানান্তর উপাদান রয়েছে:</i><br/><b>•</b>   প্রথমটি হল একটি বার্ষিক প্রণোদনা <b> ১০, ০০০/- টাকা </b> যা ১৩ থেকে ১৮ বছর বয়সী মেয়েদের প্রতি বছর প্রদান করা হবে (অষ্টম শ্রেণি সমতুল্য বা তার ওপরে পড়াশোনা করা প্রত্যেক বছরের জন্য, যদি তারা সেই সময়ে অবিবাহিত থাকে।<br/><b>•</b>   দ্বিতীয়টি হল একটি এককালীন অনুদান <b> ২৫,০০০/- টাকা </b> যা একটি মেয়ে ১৮ বছর পূর্ণ হওয়ার পর প্রদান করা হবে, যদি সে কোনও একাডেমিক বা পেশাগত অনুসন্ধানে নিযুক্ত থাকে এবং অবিবাহিত থাকে।
`,
    delay: 700,
    link: "https://wbkanyashree.gov.in",
  },
  {
    id: 8,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/ruposhree.png",
    title: "রূপশ্রী",
    description:
      "রূপশ্রী প্রকল্প ১লা এপ্রিল, ২০১৮-তে চালু হয়েছে। এর উদ্দেশ্য হল দরিদ্র পরিবারগুলির তাদের মেয়েদের বিয়ের খরচ বহন করার সমস্যাগুলি দূর করা। প্রায়শই উচ্চ সুদের হারে ঋণ নিতে হয় এই খরচের জন্য।<br/>  • এককালীন ২৫,০০০/- টাকা অর্থ সাহায্য প্রদান করা হবে অর্থনৈতিকভাবে সংকটগ্রস্ত পরিবারের জন্য, যখন তাদের কন্যাদের বিয়ে হবে।",
    delay: 800,
    link: "https://wbrupashree.gov.in",
  },
  {
    id: 9,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Lakshmir_Bhandar.png",
    title: "লক্ষ্মীর ভাণ্ডার",
    description:
      "পশ্চিমবঙ্গ সরকার লক্ষ্মীর ভাণ্ডার প্রকল্প চালু করেছে, যাতে রাজ্যের সকল পরিবারের মহিলা সদস্যদের একটি নিশ্চিত মাসিক আয় প্রদান করা হয়। এটি তাদের আর্থিক অবস্থার উন্নতি এবং নারীর ক্ষমতায়নকে উৎসাহিত করে।<br/>  • তপশিলি জাতি/উপজাতি পরিবারের মহিলারা প্রতি মাসে ১,৫০০/- টাকা পাবেন।<br/>  • অন্যান্য পরিবারের মহিলারা প্রতি মাসে ১০০০/- টাকা পাবেন।",
    delay: 900,
    link: "https://wbcdwdsw.gov.in",
  },
  {
    id: 10,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Shikhashree.png",
    title: "শিক্ষাশ্রী",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৪ সালে নতুন একটি প্রকল্প <b>শিক্ষাশ্রী</b> চালু করেছে। এর উদ্দেশ্য হল তপশিলি জাতি ও তপশিলি উপজাতির ছাত্রদের আর্থিক সহায়তা প্রদান করা, যাতে তারা প্রি-মেট্রিক পর্যায়ে অংশগ্রহণ বৃদ্ধি করতে পারে এবং ঝরে পড়ার হার কমানো যায়। <b>শিক্ষাশ্রী</b> প্রকল্পটি পঞ্চম থেকে অষ্টম শ্রেণির তপশিলি জাতি ও উপজাতির দিনের ছাত্রদের জন্য চালু করা হয়েছে, যা পূর্ববর্তী বই অনুদান ও রক্ষণাবেক্ষণ অনুদান প্রকল্পগুলিকে একত্রিত করে।",
    delay: 1000,
    link: "https://www.anagrasarkalyan.gov.in",
  },
  {
    id: 11,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Medhashree.png",
    title: "মেধাশ্রী",
    description:
      "রাজ্যের অন্যান্য পশ্চাদপদ শ্রেণির সম্প্রদায়ের শিক্ষার আকাঙ্ক্ষা পূরণ করার জন্য এবং তাদের সামাজিক-অর্থনৈতিক ও শিক্ষাগত উন্নয়নের সুযোগ বৃদ্ধি করতে, পশ্চিমবঙ্গ সরকার <b>“মেধাশ্রী” – প্রি-মেট্রিক স্কলারশিপ</b> প্রকল্প চালু করেছে। এটি রাজ্যের সরকারি/সরকার পৃষ্ঠপোষিত/সরকারি সাহায্যপ্রাপ্ত বিদ্যালয়ে পঞ্চম থেকে অষ্টম শ্রেণির অন্যান্য পশ্চাদপদ শ্রেণির ছাত্রদের জন্য প্রযোজ্য, এবং এটি সম্পূর্ণরূপে রাজ্যের বাজেট থেকে অর্থায়ন করা হবে ২০২২-২৩ অর্থবছর থেকে।",
    delay: 1100,
    link: "https://wbmdfcscholarship.org",
  },
  {
    id: 12,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/swasthyasathi_logo.png",
    title: "স্বাস্থ্য সাথী",
    description:
      "পশ্চিমবঙ্গের মাননীয় মুখ্যমন্ত্রী দ্বারা <b>স্বাস্থ্য সাথী</b> প্রকল্পটি আনুষ্ঠানিকভাবে ৩০শে ডিসেম্বর ২০১৬ সালে চালু করা হয়।",
    delay: 1200,
    link: "https://swasthyasathi.gov.in",
  },
  {
    id: 13,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Matir_Katha.jpg",
    title: "মাটির কথা",
    description:
      "পশ্চিমবঙ্গ সরকার <b>মাটির কথা</b> নামে একটি প্রকল্প চালু করেছে। এটি মূলত কৃষি বিভাগের জন্য একটি আইসিটি-ভিত্তিক প্ল্যাটফর্ম। এই পোর্টালের মাধ্যমে সমস্ত চাষ সংক্রান্ত তথ্য এবং কৃষকদের চাষ সংক্রান্ত সমস্যাগুলি সমাধান করা হয়।",
    delay: 1300,
    link: "https://matirkatha.net",
  },
  {
    id: 14,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BMSSY.png",
    title: "বিনা মূল্যে সামাজিক সুরক্ষা যোজনা",
    description:
      "অসংগঠিত খাতের কর্মীদের সামাজিক নিরাপত্তা প্রদান এবং তাদের প্রতিটি জীবন সংকট মোকাবিলার জন্য সহায়তা করতে, পশ্চিমবঙ্গ সরকার <b>সামাজিক সুরক্ষা যোজনা (SSY)-২০১৭</b> চালু করেছে। এটি দেশের মধ্যে প্রথম প্রকল্প যেখানে অসংগঠিত কর্মীদের নির্দিষ্ট তালিকাভুক্ত শিল্প (৪৬) এবং স্বনিযুক্ত পেশার (১৫) জন্য প্রযোজ্য, এবং শ্রম বিভাগ, পশ্চিমবঙ্গ সরকার দ্বারা প্রকাশিত নির্মাণ ও পরিবহন কর্মীদের অন্তর্ভুক্ত করা হয়েছে।",
    delay: 1400,
    link: "https://bmssy.wblabour.gov.in",
  },
  {
    id: 15,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Duare_Sarkar.png",
    title: "দুয়ারে সরকার",
    description:
      "পশ্চিমবঙ্গের মাননীয় মুখ্যমন্ত্রী দ্বারা ১লা ডিসেম্বর, ২০২০-তে <b>দুয়ারে সরকার</b> উদ্যোগটি চালু করা হয়। এটি পশ্চিমবঙ্গ সরকারের একটি উদ্যোগ, যার মাধ্যমে মানুষের দোরগোড়ায় পরিষেবা এবং কল্যাণমূলক প্রকল্পগুলি পৌঁছে দেওয়া হয়। এই শিবিরগুলি গ্রাম পঞ্চায়েত এবং পৌর ওয়ার্ড পর্যায়ে সংগঠিত হয়, এবং নির্দিষ্ট পরিষেবা সরবরাহকারী এবং কল্যাণমূলক প্রকল্পের জন্য আবেদনপত্র জমা ও ইস্যুর কেন্দ্র হিসেবে কাজ করে।",
    delay: 1500,
    link: "https://ds.wb.gov.in",
  },
  {
    id: 16,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Caste_Certificate.png",
    title: "জাতিগত শংসাপত্র",
    description:
      "পশ্চাদপদ শ্রেণির কল্যাণ বিভাগ, পশ্চিমবঙ্গ সরকারের অধীন একটি বিভাগ, যা পশ্চিমবঙ্গের তপশিলি জাতি, তপশিলি উপজাতি এবং অন্যান্য পশ্চাদপদ শ্রেণির ব্যক্তিদের টেকসই উন্নয়নের জন্য কাজ করছে। এই বিভাগের মূল লক্ষ্য হল এই সামাজিক ও অর্থনৈতিকভাবে পিছিয়ে পড়া শ্রেণির মানুষের জীবনমানের উন্নতি করা এবং তাদের সক্ষমতা বৃদ্ধি করা, যাতে তারা সমাজের মূলধারার অংশ হতে পারে।",
    delay: 1600,
    link: "https://castcertificatewb.gov.in",
  },
  {
    id: 17,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BSK.png",
    title: "বাংলা সহায়তা কেন্দ্র",
    description:
      "পশ্চিমবঙ্গ সরকার রাজ্যজুড়ে ৩৫৬১ <b>বাংলা সহায়তা কেন্দ্র (BSK)</b> স্থাপন করেছে, যাতে অনলাইন মোডে বিনামূল্যে সরকারি পরিষেবা প্রদান করা যায়। এই উদ্যোগের উদ্দেশ্য হল বিভিন্ন সামাজিক ও উন্নয়নমূলক প্রকল্প সম্পর্কে তথ্য প্রচারের বিদ্যমান ব্যবস্থা শক্তিশালী করা। BSK কেন্দ্রগুলি কৌশলগতভাবে জেলা ম্যাজিস্ট্রেট, উপ-বিভাগীয় অফিসার, ব্লক উন্নয়ন অফিসার, গ্রাম পঞ্চায়েত, স্বাস্থ্য কেন্দ্র, সরকারি সাহায্যপ্রাপ্ত লাইব্রেরি এবং সমস্ত নগর স্থানীয় সংস্থার (ULBs) অফিসগুলিতে অবস্থিত।",
    delay: 1700,
    link: "https://bsk.wb.gov.in",
  },
  {
    id: 18,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Khadya_Sathi.png",
    title: "খাদ্য সাথী",
    description:
      "২৭শে জানুয়ারী, ২০১৬-তে আমাদের মাননীয় মুখ্যমন্ত্রী শ্রীমতি মমতা বন্দ্যোপাধ্যায় <b>খাদ্য সাথী</b> প্রকল্প চালু করেন। <b>সবার জন্য খাদ্য</b> এই প্রকল্পের মূল স্লোগান।",
    delay: 1800,
    link: "https://food.wb.gov.in",
  },
  {
    id: 19,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Swasthya_Ingit.png",
    title: "স্বাস্থ্য ইঙ্গিত",
    description:
      "পশ্চিমবঙ্গ সরকার রাজ্যের মানুষের সুস্থতা নিশ্চিত করতে সব সম্ভাব্য ব্যবস্থা গ্রহণ করেছে, বিশেষত সমাজের সুবিধাবঞ্চিত অংশের জন্য। এই অঙ্গীকারের অংশ হিসেবে, সরকার <b>স্বাস্থ্য ইঙ্গিত</b> প্রকল্প চালু করেছে, যা সাশ্রয়ী, সহজপ্রাপ্য, টেকসই ও উচ্চমানের স্বাস্থ্যসেবা নিশ্চিত করবে।",
    delay: 1900,
    link: "https://www.swasthyaingit.in",
  },
  {
    id: 20,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/YOGYASHREE.JPG",
    title: "যোগ্যশ্রী প্রকল্প",
    description:
      "পশ্চিমবঙ্গ সরকার ২০২৪ সালে <b>যোগ্যশ্রী</b> প্রকল্প চালু করেছে, যা সকল ছাত্রদের জন্য বিনামূল্যে প্রশিক্ষণ প্রদান করবে যারা মেডিকেল, ইঞ্জিনিয়ারিং কোর্স বা অন্য কোন সরকারি পরিষেবার জন্য প্রস্তুতি নিতে চায়। এই প্রকল্প চালুর মূল উদ্দেশ্য হল ছাত্রদের JEE, IIT, WBJEE বা অন্যান্য সরকারি পরিষেবা পরীক্ষায় সফল হতে উৎসাহিত করা। পেশাদার প্রশিক্ষকদের গুণমান সম্পন্ন প্রশিক্ষণের মাধ্যমে, ছাত্ররা তাদের স্বপ্ন পূরণ করতে পারবে এবং তাদের ভবিষ্যৎ গড়ে তুলতে পারবে।",
    delay: 2000,
    link: "https://www.wbbcdev.gov.in",
  },
  {
    id: 21,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BSBS.JPG",
    title: "বাংলা শস্য বীমা প্রকল্প",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৯ সালে <b>বাংলা শস্য বীমা</b> প্রকল্প চালু করেছে, যা সম্পূর্ণ রাজ্য-অর্থায়িত একটি প্রকল্প। এই প্রকল্পের লক্ষ্য হল সকল কৃষকের জন্য স্বচ্ছ ও সহজ ফসল বীমা সুবিধা নিশ্চিত করা এবং বীমাযোগ্য ঝুঁকি থেকে উৎপন্ন ফসল ক্ষতির ক্ষেত্রে সময়মতো দাবি নিষ্পত্তি নিশ্চিত করা। এর উদ্দেশ্য হল:<br/>  1. অনিশ্চিত পরিস্থিতির ফলে ক্ষতিগ্রস্ত কৃষকদের আর্থিক সহায়তা প্রদান।<br/>  2. কৃষকদের আয় স্থিতিশীল করে তাদের চাষাবাদ অব্যাহত রাখা।",
    delay: 2100,
    link: "https://banglashasyabima.net/",
  },
  {
    id: 22,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/ANANDADHARA.JPG",
    title: "আনন্দধারা",
    description:
      "পশ্চিমবঙ্গে <b>আনন্দধারা</b> প্রকল্পটি ২০১২ সালে চালু করা হয়, যা জাতীয় গ্রামীণ জীবিকা মিশনের, National Rural Livelihoods Mission (NRLM) অংশ। এটি পশ্চিমবঙ্গের মাননীয় মুখ্যমন্ত্রী শ্রীমতি মমতা বন্দ্যোপাধ্যায় দ্বারা চালু করা হয়েছে, যাতে গ্রামীণ দরিদ্রদের কল্যাণ নিশ্চিত করা যায়। এই প্রকল্পের প্রধান লক্ষ্য হল দরিদ্র মহিলাদের সংগঠিত করে তাদের দক্ষতা বৃদ্ধি এবং নিয়মিত কর্মসংস্থান ও মজুরিভিত্তিক কর্মসংস্থান নিশ্চিত করা।",
    delay: 2200,
    link: "https://www.anandadhara.wb.gov.in/",
  },
  {
    id: 23,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/TARUNER_SWAPNA.JPG",
    title: "তরুণের স্বপ্ন",
    description:
      "পশ্চিমবঙ্গ সরকার ২০২২ সালে <b>তরুণের স্বপ্ন</b> প্রকল্প চালু করেছে, যা শিক্ষার প্রযুক্তির সঙ্গে সংযোগ স্থাপনে ছাত্রদের সহায়তা করবে। এই প্রকল্পের আওতায়, ছাত্রদের ট্যাবলেট/স্মার্টফোন/কম্পিউটার কেনার জন্য <b>১০,০০০/- টাকা</b> আর্থিক সহায়তা প্রদান করা হবে। প্রথমে শুধুমাত্র সরকারি পরিচালিত বিদ্যালয় বা মাদ্রাসায় দ্বাদশ শ্রেণিতে পড়াশোনা করা ছাত্ররা এই সুবিধা পেত, এখন একাদশ শ্রেণির ছাত্ররাও আবেদন করতে পারবে। এই অনুদান শুধুমাত্র তাদের জন্য প্রযোজ্য যাদের পরিবারের বার্ষিক আয় <b>২,০০,০০০/- টাকার</b> কম।",
    delay: 2300,
    link: "",
  },
  {
    id: 24,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SAMABYATHI.JPG",
    title: "সমব্যাথি",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৬ সালে <b>সমব্যাথি</b> প্রকল্প চালু করেছে, যা দরিদ্র মানুষের জন্য দাহ/সমাধি সংক্রান্ত খরচ বহন করতে আর্থিক সহায়তা প্রদান করে। এটি এককালীন অর্থ সহায়তা, যা মৃত ব্যক্তির নিকট আত্মীয় বা নিকটতম পরিবারের সদস্যদের প্রদান করা হয়, যারা প্রয়োজনীয় শংসাপত্রসহ আবেদন করবেন।",
    delay: 2400,
    link: "",
  },
  {
    id: 25,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/DUARE_RATION.JPG",
    title: "দুয়ারে রেশন",
    description:
      "পশ্চিমবঙ্গ সরকার ২০২১ সালে <b>দুয়ারে রেশন</b> প্রকল্প চালু করেছে। এই প্রকল্পের মাধ্যমে খাদ্যসাথী অন্তর্ভুক্ত সুবিধাভোগীদের বাড়ির দরজায় রেশন সামগ্রী সরবরাহ করা হয়।",
    delay: 2500,
    link: "https://food.wb.gov.in/Dynamic.aspx?page_id=39",
  },
  {
    id: 26,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SABUJSHREE.JPG",
    title: "সবুজশ্রী",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৬ সালে <b>সবুজশ্রী</b> প্রকল্প চালু করেছে। এই প্রকল্পের আওতায় রাজ্যের প্রতিটি নবজাতক শিশুকে একটি বৃক্ষের চারা উপহার দেওয়া হবে, যা তার পরিবার তাদের নিজস্ব জমিতে রোপণ করবে।",
    delay: 2600,
    link: "https://www.westbengalforest.gov.in/sabujsri.php",
  },
  {
    id: 27,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SABUJ_SATHI.JPG",
    title: "সবুজ সাথী",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৫ সালে <b>সবুজ সাথী</b> প্রকল্প চালু করেছে। এই প্রকল্পের আওতায় নবম থেকে দ্বাদশ শ্রেণিতে পড়াশোনা করা সরকারি ও সরকার-অনুদানপ্রাপ্ত বিদ্যালয়ের ছাত্র-ছাত্রীদের বিনামূল্যে সাইকেল বিতরণ করা হয়। এই প্রকল্পের উদ্দেশ্য হলো:<br/>  • বিদ্যালয়ে ছাত্রদের ধরে রাখা,<br/>  • উচ্চশিক্ষা গ্রহণে উৎসাহিত করা,<br/>  • মেয়েদের মধ্যে আত্মবিশ্বাস বাড়ানো এবং স্বাধীন চলাচলকে উৎসাহিত করা,<br/>  • পরিবেশবান্ধব ও স্বাস্থ্যকর পরিবহন ব্যবস্থার প্রচার।",
    delay: 2700,
    link: "https://wbsaboojsathi.gov.in/",
  },
  {
    id: 28,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SVMCM.JPG",
    title: "স্বামী বিবেকানন্দ মেধা ও দানভিত্তিক বৃত্তি",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৬ সালে <b>স্বামী বিবেকানন্দ মেধা ও দানভিত্তিক বৃত্তি (SVMCM Scholarship) </b> প্রকল্প পুনর্গঠন করেছে, যাতে আরও বেশি সংখ্যক ছাত্র-ছাত্রীকে অন্তর্ভুক্ত করা যায় এবং বৃত্তির পরিমাণ উল্লেখযোগ্যভাবে বৃদ্ধি করা যায়। এই প্রকল্পের লক্ষ্য হলো অর্থনৈতিকভাবে দুর্বল পরিবারের ছাত্রদের উচ্চশিক্ষা গ্রহণে সহায়তা করা। এই প্রকল্পের আওতায় একাদশ শ্রেণি থেকে স্নাতকোত্তর পর্যায়ের (সমস্ত শাখায়) নিয়মিত শিক্ষার্থীরা উপকৃত হয়।",
    delay: 2800,
    link: "https://svmcm.wbhed.gov.in/",
  },
  {
    id: 29,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/CHA_SUNDARI.JPG",
    title: "চা সুন্দরী প্রকল্প",
    description:
      "পশ্চিমবঙ্গ সরকার ২০২০ সালে <b>চা সুন্দরী</b> প্রকল্প চালু করেছে, যা চা বাগানের শ্রমিকদের জন্য একটি আবাসন প্রকল্প। এই প্রকল্পের উদ্দেশ্য হল সকল গৃহহীন ও দরিদ্র চা বাগানের শ্রমিকদের বিনামূল্যে আবাসন প্রদান করা। পশ্চিমবঙ্গ সরকার কিছু চা বাগানের শ্রমিকদের জমির অধিকারও প্রদান করেছে।",
    delay: 2900,
    link: "https://wbhousing.gov.in/",
  },
  {
    id: 30,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/CHA_SUNDARI_EXT.JPG",
    title: "চা সুন্দরী Extension প্রকল্প",
    description:
      "পশ্চিমবঙ্গ সরকার ২০২৪ সালে <b>চা সুন্দরী Extension প্রকল্প</b> চালু করেছে। এই প্রকল্পের মূল উদ্দেশ্য হলো চা বাগানের শ্রমিকদের সরকারি বরাদ্দকৃত জমিতে বাড়ি নির্মাণে উৎসাহিত করা। এই উদ্দেশ্যে তাদের <b>১,২০,০০০/- টাকা</b> আর্থিক সহায়তা প্রদান করা হবে।",
    delay: 3000,
    link: "https://wbhousing.gov.in/",
  },
  {
    id: 31,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/LOK_PRASAR.JPG",
    title: "লোকপ্রসার প্রকল্প",
    description:
      "পশ্চিমবঙ্গ সরকার <b>লোকপ্রসার প্রকল্প</b> নামে একটি নতুন প্রধান উদ্যোগ চালু করেছে। এই প্রকল্পের মূল উদ্দেশ্য হলো:<br/>  • প্রতিটি লোকশিল্পীর জন্য পরিচয়পত্র প্রদান,<br/>  • প্রবীণ ও অসহায় লোকশিল্পীদের জন্য মাসিক পেনশন ব্যবস্থা করা,<br/>  • শিল্পীদের জন্য রিটেনার ফি প্রদান,<br/>  • শিল্পীদের ন্যূনতম আয় নিশ্চিত করতে উন্নয়নমূলক প্রকল্পের প্রচার কর্মসূচিতে নিযুক্ত করা।",
    delay: 3100,
    link: "https://wblpp.in/",
  },
  {
    id: 32,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/KARMASHREE.JPG",
    title: "কর্মশ্রী",
    description:
      "পশ্চিমবঙ্গ সরকার ২০২৪ সালে <b>কর্মশ্রী</b> প্রকল্প চালু করেছে। এই প্রকল্পের মূল উদ্দেশ্য হলো প্রতিটি চাকরি কার্ডধারী পরিবারের জন্য বছরে কমপক্ষে ৫০ দিন মজুরি কর্মসংস্থান নিশ্চিত করা। রাজ্য সরকারের বিভিন্ন বিভাগ কর্তৃক বাস্তবায়িত বিভিন্ন কাজের মাধ্যমে এই কর্মসংস্থান প্রদান করা হবে। এর ফলে বেকারত্বের হার হ্রাস পাবে এবং মানুষের জীবনমান উন্নত হবে।",
    delay: 3200,
    link: "https://karmashree.wbdeptemployment.in/",
  },
  {
    id: 33,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BANGLA_ABAS_YAJONA.JPG",
    title: "বাংলা আবাস যোজনা",
    description:
      "পশ্চিমবঙ্গ সরকার ২০২১ সালে <b>বাংলা আবাস যোজনা</b> প্রকল্প চালু করেছে। এই প্রকল্পের লক্ষ্য হলো সুবিধাবঞ্চিত পরিবারগুলির জন্য স্থায়ী আবাসন প্রদান করা। যারা উপযুক্ত বাড়ি নেই, তাদের জন্য স্থায়ী আবাসন নিশ্চিত করাই এই প্রকল্পের প্রধান উদ্দেশ্য।",
    delay: 3300,
    link: "https://wbhousingboard.in/home/",
  },
  {
    id: 34,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/JALATIRTHA.JPG",
    title: "জলতীর্থ",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৪-১৫ অর্থবছরে <b>জলতীর্থ</b> প্রকল্প গ্রহণ করেছে, যা রাজ্যের শুষ্ক অঞ্চলের জন্য একটি গুরুত্বপূর্ণ উদ্যোগ। এই প্রকল্পটি বাঁকুড়া, বীরভূম, পুরুলিয়া, ঝাড়গ্রাম এবং পশ্চিম মেদিনীপুর জেলার জন্য প্রযোজ্য। এই প্রকল্পের মূল উদ্দেশ্য হলো:<br/>  • পৃষ্ঠতল ও বৃষ্টির পানি সংরক্ষণ,<br/>  • চেক ড্যাম, জল সংরক্ষণ কাঠামো এবং পৃষ্ঠপ্রবাহ ক্ষুদ্র সেচ প্রকল্প নির্মাণের মাধ্যমে সারাবছর নিশ্চিত সেচ প্রদান।",
    delay: 3400,
    link: "https://www.wbwridd.gov.in/jalatirtho",
  },
  {
    id: 35,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/JAL_DHARO_JAL_BHARO.JPG",
    title: "জল ধরো জল ভরো",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১১-১২ সালে <b>জল ধরো- জল ভরো</b> প্রকল্প চালু করেছে, যা মূল্যবান জলসম্পদ সংরক্ষণের জন্য গৃহীত হয়েছে। এই প্রকল্পের সফল বাস্তবায়নের জন্য, পশ্চিমবঙ্গের জলসম্পদ তদন্ত ও উন্নয়ন বিভাগ বড় পরিসরে বৃষ্টির পানি সংরক্ষণ এবং পৃষ্ঠপ্রবাহ আটকানোর মাধ্যমে মূল্যবান জলসম্পদের উন্নতি ও প্রাপ্যতা নিশ্চিত করছে। এই প্রকল্পের উদ্দেশ্য হলো জলাশয়, পুকুর, জলাধার, খাল এবং ভূগর্ভস্থ জলাধারে বৃষ্টির পানি সংরক্ষণ এবং জনগণের মধ্যে সচেতনতা সৃষ্টি করা যাতে তারা সেচ ব্যবস্থায় দক্ষতার সঙ্গে পানি ব্যবহার করতে পারে।",
    delay: 3500,
    link: "https://www.wbwridd.gov.in/jal_dharo_jal_bharo",
  },
  {
    id: 36,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/MATIR_SHRISTI.JPG",
    title: "মাটির সৃষ্টি",
    description:
      "<b>মাটির সৃষ্টি</b> প্রকল্পটি ছয়টি জেলায় পতিত জমির বাণিজ্যিক ব্যবহারের মাধ্যমে কৃষি, মৎস্য এবং পশুপালনের উন্নয়ন ঘটাবে। এই কার্যক্রমে যারা যুক্ত হবেন, তারা বিদ্যমান সরকারি সুবিধাগুলিও পাবেন। এই উদ্যোগের ফলে অতিরিক্ত আয় তৈরি হবে, যা শুষ্ক অঞ্চলের কৃষকদের জন্য বিশেষভাবে সহায়ক হবে।",
    delay: 3600,
    link: "https://www.wbwridd.gov.in/matir_srishti",
  },
  {
    id: 37,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/UTKARSH_BANGLA.JPG",
    title: "উৎকর্ষ বাংলা",
    description:
      "পশ্চিমবঙ্গ সরকার ২০১৬ সালে <b>উৎকর্ষ বাংলা</b> প্রকল্প চালু করেছে। এই প্রকল্পের মূল লক্ষ্য হলো যুবকদের দক্ষতা উন্নয়ন করা, যাতে তারা লাভজনক কর্মসংস্থান এবং উদ্যোক্তা হিসেবে সুযোগ পায়। এটি রাজ্যজুড়ে সংক্ষিপ্তমেয়াদী দক্ষতা প্রশিক্ষণ কর্মসূচি, যা PBSSD (পশ্চিমবঙ্গ দক্ষতা উন্নয়ন সমিতি) কর্তৃক পরিচালিত। আবেদনকারীরা এই প্রশিক্ষণে অংশগ্রহণের জন্য অনলাইনে নিবন্ধন করতে পারেন।",
    delay: 3700,
    link: "https://www.pbssd.gov.in/",
  },
  {
    id: 38,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/AIKYASHREE.JPG",
    title: "ঐক্যশ্রী",
    description:
      "পশ্চিমবঙ্গ সরকার <b>ঐক্যশ্রী</b> প্রকল্প চালু করেছে, যা সংখ্যালঘু ছাত্রদের জন্য একটি শিক্ষাবৃত্তির ব্যবস্থা। এই প্রকল্পের লক্ষ্য রাজ্যের সংখ্যালঘু সম্প্রদায়ের শিক্ষার প্রতি আকাঙ্ক্ষা পূরণ করা এবং তাদের সামাজিক-অর্থনৈতিক ও শিক্ষাগত অগ্রগতি নিশ্চিত করা। এই প্রকল্পের মাধ্যমে মেধাবী সংখ্যালঘু ছাত্রদের আর্থিক সহায়তা ও বৃত্তি প্রদান করা হয়।",
    delay: 3800,
    link: "https://wbmdfcscholarship.in/",
  },
  {
    id: 39,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/STUDENT_INTERNSHIP.JPG",
    title: "ছাত্র ইন্টার্নশিপ প্রোগ্রাম",
    description:
      "পশ্চিমবঙ্গ সরকার <b>ছাত্র ইন্টার্নশিপ প্রোগ্রাম ২০২৪</b> চালু করেছে। এই প্রকল্পের অধীনে স্নাতক, আইটিআই এবং পলিটেকনিক ছাত্ররা ইন্টার্নশিপের জন্য যোগ্য। আগ্রহী প্রার্থীদের প্রাথমিক পরীক্ষায় কমপক্ষে <b>৬০% নম্বর</b> অর্জন করতে হবে এবং সর্বোচ্চ বয়সসীমা <b>৪০ বছর</b>। এই প্রকল্পের অংশগ্রহণকারীরা প্রশিক্ষণের সময় মাসিক <b>১০,০০০/- টাকা</b> বেতন পাবেন। এছাড়াও, তারা বিভিন্ন সরকারি অফিস, পঞ্চায়েত, পৌরসভা এবং কর্পোরেশনে বাস্তব কাজের অভিজ্ঞতা অর্জন করবেন। শিক্ষার্থীরা পশ্চিমবঙ্গ উচ্চশিক্ষা বিভাগের অফিসিয়াল ওয়েবসাইটের মাধ্যমে অনলাইনে আবেদন করতে পারবেন।",
    delay: 3900,
    link: "https://banglaruchchashiksha.wb.gov.in/",
  },
  {
    id: 40,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/JALASATHI.JPG",
    title: "জলসাথী",
    description:
      "পশ্চিমবঙ্গ সরকার <b>জলসাথী</b> প্রকল্প চালু করেছে। এই প্রকল্পের মূল উদ্দেশ্য হলো জলপথে দুর্ঘটনা এড়ানো। জলসাথীদের কাজ হলো জেটি বা ঘাটে যাত্রীদের নিরাপত্তা নিশ্চিত করা, প্রাথমিক চিকিৎসা প্রদান করা, দুর্ঘটনার রিপোর্ট করা এবং যাত্রী নিরাপত্তার মান নির্ধারিত নির্দেশিকার কোনও লঙ্ঘন হলে তা দ্রুত WBTIDCL-এ জানানো।",
    delay: 4000,
    link: "https://wbtidcl.com/",
  },
  {
    id: 41,
    imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/JALSWAPNA.JPG",
    title: "জল স্বপ্ন",
    description:
      "পশ্চিমবঙ্গ সরকার <b>জল স্বপ্ন</b> প্রকল্পটি ২০২০ সালে চালু করেছে। এই প্রকল্পের মূল উদ্দেশ্য হলো <b>আগামী পাঁচ বছরে দুই কোটি বাড়িতে</b> পানীয় জলের সংযোগ প্রদান করা। পরবর্তীতে সরকার গ্রাম স্কুল, আঙ্গনওয়াড়ি কেন্দ্র এবং হাসপাতালগুলিকে এই প্রকল্পের আওতায় নিয়ে আসার সিদ্ধান্ত নিয়েছে।",
    delay: 4100,
    link: "https://wbphed.gov.com/",
  },
];
