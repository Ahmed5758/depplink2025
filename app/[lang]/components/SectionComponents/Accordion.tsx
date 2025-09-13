"use client";

import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Accordion(props: any) {
  const router = useRouter();
  const path = usePathname();
  const isMobileOrTablet =
    props?.devicetype === "mobile" || props?.devicetype === "tablet"
      ? true
      : false;
  const containerClass = isMobileOrTablet ? "container" : "px-20";
  const isArabic = props.isArabic;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const questionOneText = isArabic ? "ما هي افضل انواع الثلاجات في السعودية؟" : "What are the best types of refrigerators in Saudi Arabia?";

  const faqs = [
    {
      question: isArabic ?"ما هي افضل انواع الثلاجات في السعودية؟" : "What are the best types of refrigerators in Saudi Arabia?", 
      answer: "123...",
    },
    {
      question: isArabic ?"ما هو الحجم المناسب لثلاجتك؟" : "What is the right size for the refrigerator?",
      answer: "123...",
    },
    { question: isArabic ?"ما هي الميزات التي تحتاجها؟" : "What features do you need?", answer: "123..." },
    { question: isArabic ?"نصائح إضافية" : "Additional Tips", answer: "123..." },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Const For Bottom Text
  const didYouFindText = isArabic ? "هل وجدتَ المعلومات المقدمة في هذه الصفحة مفيدة؟" : "Did you find the information provided on this page helpful?";
  const visitorsLikedThePageText = isArabic ? "168 زائرًا أعجبهم محتوى الصفحة من أصل 542 تفاعلًا" : "168 visitors liked the page content out of 542 interactions";

  return (
    <>
        <main
          className="h-full w-full bg-white py-8 px-10 flex justify-center items-start rounded-[1.25rem]"
          style={{ boxShadow: "0px 0px 3.125px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="w-full">
            {faqs.map((faq: any, index: number) => (
              <div key={index} className="border-b border-[#CCCCCC]">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center py-[1.375rem] text-right font-semibold text-gray-800 hover:bg-gray-100"
                >
                  <span>{faq?.question}</span>
                  <span className="ml-2">
                    <button className="w-8 h-8 bg-[#F6F7F7] flex justify-center items-center rounded-full transition-transform duration-300">
                      <svg
                        className={`w-4 h-4 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="#004B7A"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-4 py-2 text-sm text-gray-600 border-t border-[#CCCCCC]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-between items-center text-center text-sm text-gray-600 mt-8">
              <div className="flex items-center gap-4">
                <p className="">
                  {didYouFindText}
                </p>
                <div className="flex justify-center gap-2 ">
                  <button className="">
                    <svg
                      width="28"
                      height="32"
                      viewBox="0 0 36 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="1.37988"
                        width="35"
                        height="37"
                        rx="8.33721"
                        stroke="#F0660C"
                      />
                      <path
                        d="M28.4416 19.9302C28.9055 19.3171 29.1624 18.5659 29.1624 17.7844C29.1624 16.5444 28.4692 15.3707 27.3535 14.7162C27.0663 14.5477 26.7392 14.4591 26.4063 14.4594H19.7839L19.9496 11.0653C19.9882 10.2451 19.6983 9.46635 19.1349 8.8726C18.8584 8.57994 18.5249 8.3471 18.1548 8.18845C17.7848 8.0298 17.3862 7.94872 16.9836 7.95022C15.5475 7.95022 14.2772 8.91679 13.8961 10.3004L11.5238 18.889H7.95306C7.46425 18.889 7.06934 19.2839 7.06934 19.7727V29.8251C7.06934 30.3139 7.46425 30.7088 7.95306 30.7088H24.5587C24.8128 30.7088 25.0613 30.6591 25.2906 30.5597C26.6051 29.9991 27.4529 28.7149 27.4529 27.2899C27.4529 26.9419 27.4032 26.5995 27.3038 26.2681C27.7677 25.655 28.0246 24.9039 28.0246 24.1223C28.0246 23.7743 27.9749 23.4319 27.8754 23.1005C28.3394 22.4874 28.5962 21.7363 28.5962 20.9547C28.5907 20.6068 28.541 20.2616 28.4416 19.9302ZM9.05771 28.7204V20.8774H11.2946V28.7204H9.05771ZM26.6327 18.9719L26.0279 19.4966L26.4118 20.198C26.5382 20.4291 26.6038 20.6886 26.6023 20.952C26.6023 21.4076 26.4035 21.8412 26.0611 22.1395L25.4563 22.6642L25.8401 23.3656C25.9666 23.5967 26.0322 23.8561 26.0307 24.1195C26.0307 24.5752 25.8318 25.0088 25.4894 25.307L24.8846 25.8318L25.2685 26.5332C25.3949 26.7643 25.4605 27.0237 25.459 27.2871C25.459 27.9057 25.0945 28.4636 24.5311 28.7177H13.0621V20.789L15.8099 10.8334C15.8807 10.5782 16.0328 10.3531 16.2431 10.1921C16.4534 10.0311 16.7105 9.9431 16.9753 9.94135C17.1852 9.94135 17.3923 10.0021 17.558 10.1264C17.8314 10.3307 17.9778 10.64 17.9612 10.9687L17.6961 16.4477H26.3786C26.8702 16.7488 27.174 17.2569 27.174 17.7844C27.174 18.24 26.9752 18.6709 26.6327 18.9719Z"
                        fill="#F0660C"
                      />
                    </svg>
                  </button>
                  <button className="">
                    <svg
                      width="28"
                      height="32"
                      viewBox="0 0 36 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="-0.5"
                        width="35"
                        height="37"
                        rx="8.33721"
                        transform="matrix(1 0 0 -1 0 37.8799)"
                        stroke="#F0660C"
                      />
                      <path
                        d="M28.4416 19.8296C28.9055 20.4427 29.1624 21.1939 29.1624 21.9754C29.1624 23.2154 28.4692 24.3891 27.3535 25.0436C27.0663 25.212 26.7392 25.3007 26.4063 25.3004H19.7839L19.9496 28.6944C19.9882 29.5146 19.6983 30.2934 19.1349 30.8872C18.8584 31.1798 18.5249 31.4127 18.1548 31.5713C17.7848 31.73 17.3862 31.811 16.9836 31.8095C15.5475 31.8095 14.2772 30.843 13.8961 29.4594L11.5238 20.8707H7.95306C7.46425 20.8707 7.06934 20.4758 7.06934 19.987V9.93469C7.06934 9.44589 7.46425 9.05097 7.95306 9.05097H24.5587C24.8128 9.05097 25.0613 9.10068 25.2906 9.2001C26.6051 9.76071 27.4529 11.0449 27.4529 12.4699C27.4529 12.8178 27.4032 13.1603 27.3038 13.4917C27.7677 14.1048 28.0246 14.8559 28.0246 15.6375C28.0246 15.9854 27.9749 16.3279 27.8754 16.6593C28.3394 17.2723 28.5962 18.0235 28.5962 18.805C28.5907 19.153 28.541 19.4982 28.4416 19.8296ZM9.05771 11.0393V18.8824H11.2946V11.0393H9.05771ZM26.6327 20.7879L26.0279 20.2632L26.4118 19.5617C26.5382 19.3307 26.6038 19.0712 26.6023 18.8078C26.6023 18.3521 26.4035 17.9186 26.0611 17.6203L25.4563 17.0956L25.8401 16.3941C25.9666 16.1631 26.0322 15.9036 26.0307 15.6402C26.0307 15.1845 25.8318 14.751 25.4894 14.4527L24.8846 13.928L25.2685 13.2266C25.3949 12.9955 25.4605 12.736 25.459 12.4726C25.459 11.854 25.0945 11.2962 24.5311 11.0421H13.0621V18.9707L15.8099 28.9264C15.8807 29.1816 16.0328 29.4067 16.2431 29.5677C16.4534 29.7286 16.7105 29.8167 16.9753 29.8184C17.1852 29.8184 17.3923 29.7577 17.558 29.6334C17.8314 29.429 17.9778 29.1197 17.9612 28.7911L17.6961 23.312H26.3786C26.8702 23.011 27.174 22.5029 27.174 21.9754C27.174 21.5197 26.9752 21.0889 26.6327 20.7879Z"
                        fill="#F0660C"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="">
                {visitorsLikedThePageText}
              </p>
            </div>
          </div>
        </main>
    </>
  );
}
