"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./SchemesSection.module.css";

export default function GovtSchemes() {
  const schemesData = [
    {
      id: 1,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/krishok_bondhu.png",
      title: "কৃষক বন্ধু",
      description:
        '২০১৯ সালের জানুয়ারি মাসে পশ্চিমবঙ্গ সরকারের কৃষি বিভাগ <b>"কৃষক বন্ধু"</b> প্রকল্প চালু করেছিল, যার উদ্দেশ্য ছিল পশ্চিমবঙ্গের সকল কৃষককে কৃষিকাজের জন্য আর্থিক সহায়তা প্রদান এবং কৃষকদের অকালমৃত্যুর ক্ষেত্রে তাঁদের পরিবারকে সামাজিক নিরাপত্তা প্রদান। সম্প্রতি এই প্রকল্পটি পুনর্গঠিত ও নতুনভাবে নামকরণ করা হয়েছে <b>"কৃষক বন্ধু (নতুন)"</b>। পশ্চিমবঙ্গের মাননীয় মুখ্যমন্ত্রী ২০২১ সালের ১৭ই জুন নতুন এই প্রকল্পটি উদ্বোধন করেন।',
      delay: 100,
      link: "https://krishakbandhu.net",
    },
    {
      id: 2,
      imageSrc:
        "https://cm.wb.gov.in/ncmo/Images/Scheme/Student_Credit_Card.png",
      title: "স্টুডেন্ট ক্রেডিট কার্ড",
      description:
        "মাননীয় মুখ্যমন্ত্রী মমতা বন্দ্যোপাধ্যায়ের দূরদর্শী নেতৃত্বে পশ্চিমবঙ্গ সরকারের উচ্চশিক্ষা বিভাগ <b>স্টুডেন্ট ক্রেডিট কার্ড</b> প্রকল্প চালু করেছে, যাতে পশ্চিমবঙ্গের শিক্ষার্থীরা কোনও আর্থিক সীমাবদ্ধতা ছাড়াই তাদের পড়াশোনা চালিয়ে যেতে পারেন। এই প্রকল্পটি শিক্ষার্থীদের মাধ্যমিক, উচ্চ মাধ্যমিক, মাদ্রাসা, স্নাতক এবং স্নাতকোত্তর পড়াশোনা, পেশাদার ডিগ্রী এবং অন্যান্য সমতুল্য কোর্স করার জন্য সহায়তা করতে ডিজাইন করা হয়েছে। এর মাধ্যমে শিক্ষার্থীরা যে কোনও স্কুল, মাদ্রাসা, কলেজ, বিশ্ববিদ্যালয় এবং ভারত ও বিদেশের অন্যান্য অনুমোদিত প্রতিষ্ঠান থেকে তাদের শিক্ষা গ্রহণ করতে পারবেন।",
      delay: 200,
      link: "https://wbscc.wb.gov.in",
    },
    {
      id: 3,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BCC.png",
      title: "West Bengal Bhyabisyat Credit Card",
      description:
        'In suppersession of <b>"Karmasathi Prakalpa"</b>, this new scheme is being introduced for the young entreprenuers in the age group <b>18-45 years</b> by offering subsidy linked and collateral free loans for setting up new ventures/ projects/ micro enterprises in manufacturing, service and buisness/ trading/ agro based activities.',
      delay: 300,
      link: "https://bccs.wb.gov.in",
    },
    {
      id: 4,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Widow_Pension.png",
      title: "Widow Pension",
      description:
        "The scheme was launched with the objective of providing social security to the disadvantaged section of the society. Department of Women &amp; Child Development and Social Welfare of West Bengal Government is the nodal department of this scheme.",
      delay: 400,
      link: "https://wbswpension.gov.in",
    },
    {
      id: 5,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/CHMS_Login_Logo.png",
      title: "Taposili Bandhu and Joy Johar Pension Scheme",
      description:
        "These two schemes were launched on 1st April, 2020 with the objective of providing social security to the <b>Schedule Caste (Taposili Bandhu) and Schedule Tribe (Joy Johar)</b> people after attaining 60 years of age.",
      delay: 500,
      link: "https://jaibangla.wb.gov.in",
    },
    {
      id: 6,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Manabik.png",
      title: "Manabik Pension",
      description:
        "<b>Manabik Pension</b> scheme was started on 1st April, 2018 by Hon’ble Chief Minister of West Bengal Mamata Banerjee in order to help the disabled person in West Bengal. This scheme is under Women and Child Development and Social Welfare Department.",
      delay: 600,
      link: "https://wbcdwdsw.gov.in",
    },
    {
      id: 7,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/kanyashree.png",
      title: "Kanyashree",
      description:
        "This scheme is launched by the Government of west Bengal with the objective of <br/><b>&nbsp;&nbsp;1.&nbsp; </b> Ensuring the girls children stay in school <br/><b>&nbsp;&nbsp;2.&nbsp; </b> Delay their marriages till at least age 18.<br/><br/><i>The scheme has two cash transfer components:</i><br/><b>•</b> &nbsp;&nbsp;The first is an Annual incentive of <b> Rs. 1000/- </b> to be paid annually to the girls in the age group 13 to 18 years (studying in Class VIII equivalent or above for every year that they remained in education, provided they are unmarried at the time.<br/><b>•</b> &nbsp;&nbsp;The second is a One-Time Grant of <b>Rs. 25,000/- </b> to be paid after a girl turns 18, provided that she was engaged in an academic or occupational pursuit and was unmarried.",
      delay: 700,
      link: "https://wbkanyashree.gov.in",
    },
    {
      id: 8,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/ruposhree.png",
      title: "Rupashree",
      description:
        "<b>Rupashree Prakalpa</b> was come into effect on 01 April, 2018 with an objective of mitigating the difficulties that poor families face in bearing the expenditure of their daughters’ marriages, for which they often have to borrow money at very high interest rates. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;One-time financial grant of <b>Rs. 25,000</b> will be given to the economically stressed families at the time of their adult daughters’ marriages.",
      delay: 800,
      link: "https://wbrupashree.gov.in",
    },
    {
      id: 9,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Lakshmir_Bhandar.png",
      title: "Lakshmir Bhandar",
      description:
        "Government of West Bengal has introduced one scheme namely, <b> Lakshmir Bhandar</b> to provide the female members of all families of the state an asusured monthly income to improve their financial condition and promote women empowerment. <br /> <br /> &nbsp;&nbsp; Women from Scheduled Caste/Scheduled Tribe households will receive Rs 1000/- per month. <br /> &nbsp;&nbsp; Women from households other than Sac/St households will receive Rs 500/- per month.",
      delay: 900,
      link: "https://wbcdwdsw.gov.in",
    },
    {
      id: 10,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Shikhashree.png",
      title: "Shikhashree",
      description:
        "The West Bengal Government has launched one new scheme <b> ‘Shikhashree’ </b> in 2014 with an objective to provide financial assistance to SC, ST students to improve their partici¬pation in Pre-matric stages and minimize the incidence of drop-out. <b> Sikshashree </b> have been launched for SC, ST Day scholars studying In classes V to VIII by merging the existing schemes of Book Grant, Maintenance Grant.",
      delay: 1000,
      link: "https://www.anagrasarkalyan.gov.in",
    },
    {
      id: 11,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Medhashree.png",
      title: "Medhashree",
      description:
        "To address the growing aspiration for education in the other backward classes communities of the state and with a view of providing them more avenues for socio-economic and educational development by extending financial support and encouragement to the students , the State Government has decided to launch  <b>“Medhashree” – Pre-metric scholarship</b> to the other backward classes students studying in class V to VIII in Government/Government Sponsored/ Government Aided Schools in West Bengal to be fully funded from the State budget from the financial year 2022-23 onwards.",
      delay: 1100,
      link: "https://wbmdfcscholarship.org",
    },
    {
      id: 12,
      imageSrc:
        "https://cm.wb.gov.in/ncmo/Images/Scheme/swasthyasathi_logo.png",
      title: "Swasthya Sathi",
      description:
        "The scheme <b>Swasthya sathi</b> was officially launched by Hon’ble Chief Minister of West Bengal on 30th December 2016.",
      delay: 1200,
      link: "https://swasthyasathi.gov.in",
    },
    {
      id: 13,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Matir_Katha.jpg",
      title: "Matir Katha",
      description:
        "The government of West Bengal brought a scheme called  <b>Matir katha </b>. It is basically an ICT-based platform for the agriculture department. Through this portal, all cultivation-related information and farmers’ problems regarding cultivation are solved.",
      delay: 1300,
      link: "https://wbmdfcscholarship.org",
    },
    {
      id: 14,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BMSSY.png",
      title: "Bina Mulye Samajik Suraksha Yojona",
      description:
        "To provide social security to the unorganised sector and to offer uniform benefits to all unorganised workmen so as to help them face every exigency of life the West Bengal Government has introduced -  <b>SAMAJIK SURAKSHA YOJANA (SSY)- 2017</b>, the first of its kind in the country- to cover every eligible unorganised worker as per the approved list of unorganised industries (46) and self-employed occupations (15) notified by the Labour Department, Government of West Bengal from time to time along with construction and transport workers.",
      delay: 1400,
      link: "https://wbmdfcscholarship.org",
    },
    {
      id: 15,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Duare_Sarkar.png",
      title: "Duare Sarkar",
      description:
        "Started on 1st December, 2020 by the Hon’ble Chief Minister of West Bengal, <b>Duare Sarkar</b> is an initiative of the Government of West Bengal, for delivery of services and welfare schemes at the doorsteps of the people through outreach camps. These camps are organized at the level of gram panchayat and municipal ward level. These camps act as service providers of specific services and nodes for issuance and collection of applications for welfare schemes.",
      delay: 1500,
      link: "https://wbmdfcscholarship.org",
    },
    {
      id: 16,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Caste_Certificate.png",
      title: "Caste Certificate",
      description:
        "The Backward Classes Welfare Department, a Department under the Govt. of West Bengal is working towards sustainable development of the persons belonging to the Scheduled Castes, Scheduled Tribes and Other Backward Classes of West Bengal. The main aim of the Department is to improve the quality of life of these socially and economically backward classes and enhancement of capability of the people belonging to these communities , so that they can be very much part &amp; parcel of the mainstream of the Society.",
      delay: 1600,
      link: "https://castcertificatewb.gov.in",
    },
    {
      id: 17,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BSK.png",
      title: "Bangla Sahayata Kendra",
      description:
        "The State Government of West Bengal has established 3561 <b> Bangla Sahayata Kendras (BSKs)</b> across the state to provide free government services at the grass roots level through online mode. The aim is to strengthen the existing system of information dissemination about various social and development schemes. The BSKs are strategically located in the offices of District Magistrates, Sub-Divisional Officers, Block Development Officers, Gram Panchayats, Health Centres, Government Aided Libraries, and all Urban Local Bodies (ULBs).",
      delay: 1700,
      link: "https://bsk.wb.gov.in",
    },
    {
      id: 18,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BSK.png",
      title: "Bangla Sahayata Kendra",
      description:
        "The State Government of West Bengal has established 3561 <b> Bangla Sahayata Kendras (BSKs)</b> across the state to provide free government services at the grass roots level through online mode. The aim is to strengthen the existing system of information dissemination about various social and development schemes. The BSKs are strategically located in the offices of District Magistrates, Sub-Divisional Officers, Block Development Officers, Gram Panchayats, Health Centres, Government Aided Libraries, and all Urban Local Bodies (ULBs).",
      delay: 1800,
      link: "https://bsk.wb.gov.in",
    },
    {
      id: 19,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Khadya_Sathi.png",
      title: "Khadya Sathi",
      description:
        "On 27th January, 2016 our Hon’ble Chief Minister Smt. Mamata Banerjee launched the flagship program  <b>‘Khadya Sathi’ ‘Food for all’</b> is the slogan of Khadya Sathi program.",
      delay: 1900,
      link: "https://food.wb.gov.in",
    },
    {
      id: 20,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/Swasthya_Ingit.png",
      title: "Swasthya Ingit",
      description:
        "The West Bengal Government has taken all possible measures to ensure well being of the people in the state with special focus and care for underprivileged section of the society. In line with its unwavering commitment to provide affordable, accessible, sustainable and high quality healthcare service delivery up to grass root level the State Government has launched <b> “Swasthya Ingit”</b>.",
      delay: 2000,
      link: "https://www.swasthyaingit.in",
    },
    {
      id: 21,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/YOGYASHREE.JPG",
      title: "Yogyashree Scheme",
      description:
        "The Government of West Bengal has launched the Yogyashree Scheme in 2024 to provide free training to all students who want to pursue medical or engineering courses or any other government services. The main aim of launching this scheme is to encourage students to crack the JEE or IIT or WBJEE or any other government services. With the help of quality training from professional trainers, the students can achieve their dreams and build their careers.",
      delay: 2100,
      link: "https://www.wbbcdev.gov.in",
    },
    {
      id: 22,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/BSBS.JPG",
      title: "Bangla Shasya Bima Scheme",
      description:
        "The Government of West Bengal has launched the Bangla Shasya Bima Scheme in 2019, a wholly state funded scheme with an aim to extend hastle free benefits of crop insurance to all farmers of the state and to ensure timely claim settlement following a transparent and simplified procedure in the event of crop loss due to insurable risks. The objective of this scheme is 1. Providing financial support to farmers suffering crop loss/damage arising out of unforeseen events. 2. Stabilizing the income of farmers to ensure their continuance in farming.",
      delay: 2200,
      link: "https://banglashasyabima.net/",
    },
    {
      id: 23,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/ANANDADHARA.JPG",
      title: "Anandadhara",
      description:
        "In West Bengal, the&nbsp;National Rural Livelihoods Mission (NRLM) was launched as Anandadhara in 2012. The scheme was launched by the chief minister of West Bengal Smt. Mamata Banerjee for the welfare of the rural poor of the state. The main objective of the project is to reduce poverty by organizing women from poor families in rural areas and increasing their capacity and skills through employment and wage-based employment in a stable manner. The key features of the project are – universal social integration, capacity building and skill building of the poor, universal financial inclusion livelihood development, appropriate infrastructure for production and marketing, and preparation of project- specific support structures at various levels. Through the collaboration/coordination of various government departments women groups and members of the association continue to participate in various livelihood activities.",
      delay: 2300,
      link: "https://www.anandadhara.wb.gov.in/",
    },
    {
      id: 24,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/TARUNER_SWAPNA.JPG",
      title: "Taruner Swapna",
      description:
        "The Government of West Bengal has launched the Taruner Swapna Scheme in the year 2022. It is one of the educational reform schemes of West Bengal Government. The main objective behind launching Taruner Swapna Scheme is to facilitate the students to connect their studies with technology. Under this Scheme, Rs 10,000/- will be provided as financial assistance to students to purchase Tablet/ Smartphone/ PC. Initially only Class 12th Students studying in Government Run Schools or Madrasahs of West Bengal Government are eligible to get financial assistance of Rs. 10,000/- under Taruner Swapna Scheme. Now Students of Class 11th are also eligible to apply for financial assistance of Rs. 10,000/- to purchase smartphone/ mobile phone or tablet PC under this scheme. Only those Students are eligible to apply whose Annual Family Income is below Rs. 2,00,000/- per year. This is a One Time Grant from the side of Government of West Bengal. For more details student has to contact the school administration.",
      delay: 2400,
      link: "",
    },
    {
      id: 25,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SAMABYATHI.JPG",
      title: "Samobyathi",
      description:
        "The Government of West Bengal has launched the Somobyathi scheme in 2016. It is a scheme of the West Bengal state government to provide financial assistance to poor for the performance of the rites and rituals and to meet incidental expenses related to cremation/burial, to the next of kin / nearest family members of the deceased person. It is a one-time financial assistance and will be provided to the next of kin, and if not available, to the nearest family member of the deceased person, who will apply with necessary cremation/Burial Certificate at the time of cremation/burial, as the case may be. Nodal Department and Agency: Panchayat and Rural Development Department will act as the Nodal Department in Panchayat areas and Municipal Affairs Department will act as the Nodal Department in Urban areas of the State.",
      delay: 2500,
      link: "",
    },
    {
      id: 26,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/DUARE_RATION.JPG",
      title: "Duare Ration",
      description:
        "The Government of West Bengal has launched the ‘Duare Ration’ scheme in 2021. In this scheme ration items are provided at the door steps of the beneficiaries covered under Khadyasathi.",
      delay: 2600,
      link: "https://food.wb.gov.in/Dynamic.aspx?page_id=39",
    },
    {
      id: 27,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SABUJSHREE.JPG",
      title: "Sabujshree",
      description:
        "The Government of West Bengal has launched the Sabujshree scheme in 2016. Each new born baby in the State shall be gifted the sapling of a tree to be planted by her / his family on their own land under this scheme.",
      delay: 2700,
      link: "https://www.westbengalforest.gov.in/sabujsri.php",
    },
    {
      id: 28,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SABUJ_SATHI.JPG",
      title: "Sabuj Sathi ",
      description:
        "The Government of West Bengal has launched the “Sabooj Sathi” scheme inn 2015. Under the scheme, bicycles are distributed free of cost to students studying in government and government-aided schools from classes IX to XII. The objectives of the scheme is to increase retention in schools, to encourage students to take up higher studies, to inculcate sense of confidence among the girl students by promoting mobility, to promote environment-friendly and healthy means of transportation.",
      delay: 2800,
      link: "https://wbsaboojsathi.gov.in/",
    },
    {
      id: 29,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/SVMCM.JPG",
      title: "SVMCM Scholarship",
      description:
        "The Government of West Bengal revamped the Swami Vivekananda Merit Cum Means Scholarship in 2016 to cover more number of students as well as to enhance scholarship amount significantly. The objective of this scheme is to assist the mentions students belonging to economically backward families for pursing high studies. The scheme benefits students studying in regular mode from class XI to post graduate level (in all stream)",
      delay: 2900,
      link: "https://svmcm.wbhed.gov.in/",
    },
    {
      id: 30,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/CHA_SUNDARI.JPG",
      title: "Chaa Sundari Scheme",
      description:
        "Government of West Bengal launched the Chaa Sundari Scheme in 2020. It is a housing scheme for tea garden workers. The objective behind starting Cha Sundari Scheme was to provide free of cost housing units to all homeless and poor Tea Garden Workers. West Bengal Government also provided land rights to some of the tea garden workers.",
      delay: 3000,
      link: "https://wbhousing.gov.in/",
    },
    {
      id: 31,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/CHA_SUNDARI_EXT.JPG",
      title: "Chaa Sundari Extension Scheme",
      description:
        "Government of West Bengal launched the Chaa Sundari Extension Scheme in 2024. The main objective behind launching this scheme is to encourage tea garden workers to build their houses at the government allotted land by providing them financial assistance of Rs 1,20,000/-.",
      delay: 3100,
      link: "https://wbhousing.gov.in/",
    },
    {
      id: 32,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/LOK_PRASAR.JPG",
      title: "Lokprasar Prakalpo",
      description:
        "Government of West Bengal launched a new flagship project namely ‘Lokprasar Prakalpo’. The main objectives of the project are - Issuing identity card to each folk-artiste, arranging for monthly pension for veteran and distressed folk-artistes, granting of retainer fee to artistes; and arranging for the minimum income by engaging them in the public campaign programme on development projects.",
      delay: 3200,
      link: "https://wblpp.in/",
    },
    {
      id: 33,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/KARMASHREE.JPG",
      title: "KARMASHREE",
      description:
        "The Government of West Bengal has launched the Karmashree Scheme in 2024. The main objective of this scheme is to provide at least 50 (fifty) days of wage employment to each Job Card holder household in a financial year, through various works implemented by different Departments of the State Government. This will help in reducing the unemployment rate and will also help to raise the standard of living.",
      delay: 3300,
      link: "https://karmashree.wbdeptemployment.in/",
    },
    {
      id: 34,
      imageSrc:
        "https://cm.wb.gov.in/ncmo/Images/Scheme/BANGLA_ABAS_YAJONA.JPG",
      title: "Bangla Abash Yojana",
      description:
        "The Government of West Bengal has launched the Bangla Abash Yojana scheme in 2021.The objective of this scheme is to provide stable housing to underprivileged families. The primary objective of the Bangla Abash Yojana is to provide stable housing to families who lack proper homes.",
      delay: 3400,
      link: "https://wbhousingboard.in/home/",
    },
    {
      id: 35,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/JALATIRTHA.JPG",
      title: "Jalatirtha",
      description:
        "The Government Of west Bengal has taken up an ambitious Scheme namely Jalatirtha in the year 2014-15 in the arid zone of the State i.e. in the districts of Bankura, Birbhum, Purulia, Jhargram and Paschim Medinipur. The main objective of the scheme is to conserve surface and rain water to provide round the year assured irrigation to the people by construction of Check Dams, Water Harvesting Structures and Surface Flow Minor Irrigation Schemes.",
      delay: 3500,
      link: "https://www.wbwridd.gov.in/jalatirtho",
    },
    {
      id: 36,
      imageSrc:
        "https://cm.wb.gov.in/ncmo/Images/Scheme/JAL_DHARO_JAL_BHARO.JPG",
      title: "Jal Dharo Jal Bharo",
      description:
        'The Government of West Bengal has launched the Scheme "Jal Dharo- Jal Bharo" during the year 2011-12 for preservation of precious water resources. For successful implementation of the scheme, the Water Resources Investigation &amp; Development Department, GoWB has taken the important role for large scale harvesting of rain water as well as arresting surface runoff for improvement and availability of precious water resources through construction and management of minor Irrigation structures. The objective of the "Jal Dharo-Jal Bharo" programme is to harvest rain water in all kinds of water bodies viz, tanks, ponds, reservoirs, canals and underground aquifers and to build citizen’s awareness towards rainwater conservation and efficient water use in irrigation.',
      delay: 3600,
      link: "https://www.wbwridd.gov.in/jal_dharo_jal_bharo",
    },
    {
      id: 37,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/MATIR_SHRISTI.JPG",
      title: "Matir Shrishti",
      description:
        "‘Matir Shrishti’ scheme consists of commercially exploiting the fallow land in these six districts through horticulture, fishery and animal husbandry. Those engaging in these activities would also get the benefits of other existing government benefits applicable to such activities. These would lead to additional generation of income, which would be of great help to farmers in dry regions.",
      delay: 3700,
      link: "https://www.wbwridd.gov.in/matir_srishti",
    },
    {
      id: 38,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/UTKARSH_BANGLA.JPG",
      title: "Utkarsh Bangla",
      description:
        "The Government of West Bengal has launched Utkarsha Bangla scheme in 2016. The main objective of this scheme is to develop skill of its youth population to improve the scope of gainful employment and entrepreneurial opportunities. It is a placement linked short-term skill trainings across the State of West Bengal. Applicants can register here for All Short-term Skill development trainings being offered by PBSSD (Paschim Banga Society for Skill Development), Government of West Bengal.",
      delay: 3800,
      link: "https://www.pbssd.gov.in/",
    },
    {
      id: 39,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/AIKYASHREE.JPG",
      title: "Aikyashree",
      description:
        "The Government of West Bengal has launched the “Aikyashree” – scheme for Minority Students in West Bengal to address the growing aspiration for education in the minority communities of the state and a view to providing them more avenues for socio-economic and educational mobility by extending financial support /scholarship and encouragement to the meritorious students belonging to the minority communities.",
      delay: 3900,
      link: "https://wbmdfcscholarship.in/",
    },
    {
      id: 40,
      imageSrc:
        "https://cm.wb.gov.in/ncmo/Images/Scheme/STUDENT_INTERNSHIP.JPG",
      title: "Student Internship Programme",
      description:
        "The State Government has launched “Student Internship Programme 2024”. Under this scheme the Undergraduates, ITI, and polytechnic students are eligible for internship. Interested candidates must secure a minimum of 60% marks in the preliminary examination and the upper age limit for application is 40 years. Participants in the scheme will receive a monthly salary of Rs 10,000 during the training period. Additionally, they will gain practical work experience in various government offices, panchayat municipalities, and corporations. Students can apply for the scheme through the online portal on the official website of the West Bengal Higher Education Department.",
      delay: 4000,
      link: "https://banglaruchchashiksha.wb.gov.in/",
    },
    {
      id: 41,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/JALASATHI.JPG",
      title: "Jalasathi",
      description:
        "The Government of West Bengal has launched the Jalsathi scheme. The main objective of this scheme is to avoid accidents on waterways. Jalasathi is engaged to ensure the safety of passengers at jetty/ ghat, to provide basic first aid, to report about the accidents or to report any incident of non-compliance of standard operating procedure related to safety of passengers as specified by IWTD (Inland Water Transport Directorate) at the respective jetty/ghat to WBTIDCL immediately.",
      delay: 4100,
      link: "https://wbtidcl.com/",
    },
    {
      id: 42,
      imageSrc: "https://cm.wb.gov.in/ncmo/Images/Scheme/JALSWAPNA.JPG",
      title: "Jal Swapno",
      description:
        'The Government of West Bengal has launched the "Jal Swapno" scheme in 2020. The main objective of this scheme is to provide tap water connection to two crore households in the state within the next five-year period. The government has decided later to bring village schools, anganwadi centres and hospitals under the Jal Swapno scheme.',
      delay: 4200,
      link: "https://wbphed.gov.com/",
    },
  ];

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
            {schemesData.map((scheme) => (
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
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Know More
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
