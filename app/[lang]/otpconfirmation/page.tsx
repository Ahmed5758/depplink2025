"use client"; // This is a client component 👈🏽
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getDictionary } from "../dictionaries";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlinePhone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { usePathname } from "next/navigation"
import { useRouter } from 'next-nprogress-bar';
import Lottie from "lottie-react";
import otpAnimation from "../../../public/json/otpConfirmation.json";

export default function optConfirmation({ params }: { params: { lang: string } }) {
    const [dict, setDict] = useState<any>([]);
    const router = useRouter();
    const path = usePathname();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [otpError, setOtpError] = useState(null);
    const otpBoxReference = useRef([]);
    const correctOTP = "123456" // validate from your server

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();

        if (otp.join("") !== "" && otp.join("") !== correctOTP) {
            // setOtpError<any>("❌ Wrong OTP Please Check Again")
            setOtpError(null)
        } else {
            setOtpError(null)
        }
    }, [otp])

    const optConfirmation: any = () => {
        router.push("/" + params.lang + '/resetpassword');
    }

    function handleChange(value: any, index: any) {
        let newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);

        if (value && index < 6 - 1) {
            // otpBoxReference.current[index + 1].focus()
        }
    }

    function handleBackspaceAndEnter(e: any, index: any) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            // otpBoxReference.current[index - 1].focus()
        }
        if (e.key === "Enter" && e.target.value && index < 6 - 1) {
            // otpBoxReference.current[index + 1].focus()
        }
    }


    return (
        <>
            {/* Login Page Header */}
            <div className="bg-white py-3 shadow-md absolute w-full top-0">
                <div className="container grid grid-cols-2">
                    <div>
                        <Image
                            src="/images/logo.webp"
                            alt='logo'
                            title='Tamkeen Logo'
                            quality={100}
                            height={90}
                            width={90}
                            style={{ maxHeight: 90, maxWidth: 90 }}
                            loading='lazy'
                            sizes="(max-width: 960px) 50vw, (max-width: 1024px) 50vw, (max-width: 1650px) 50vw, (max-width: 1920px) 80vw, 100vw"
                        />
                    </div>
                    <div className='flex gap-x-8 items-center justify-end'>
                        <Link href="#" className='text-sm 2xl:text-base gap-x-1.5 flex items-center text-primary hover:text-secondary'>{params.lang == 'ar' ? 'English' : 'Arabic'}</Link>
                        <Link href="tel:8002444464" className='text-sm 2xl:text-base gap-x-1.5 flex items-center text-primary hover:text-secondary'><span><MdOutlinePhone className="shrink-0 h-4 w-4 2xl:h-5 2xl:w-5 text-[#219EBC]" /></span>8002444464</Link>
                        <Link href="#" className='text-sm 2xl:text-base gap-x-1.5 flex items-center text-primary hover:text-secondary'><span><BiMessageRoundedDetail className="shrink-0 h-4 w-4 2xl:h-5 2xl:w-5 text-[#219EBC]" /></span>{dict?.login?.support}</Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="h-[100vh] bg-primary "></div>
                <div className="h-auto mt-16 py-8 px-6">
                    <div className='w-[600px] 2xl:w-[730px]'>
                        <h1 className=" font-semibold text-xl 2xl:text-2xl">تم ارسال رمز التاكيد علي الرقم الخاص بك</h1>
                        <p className='text-[#5D686F] text-sm 2xl:text-base mt-1.5'>لقد ارسلنا رمز تاكيد لاعادة تعيين كلمة مرور جديدة علي رقم <span className="text-[#B15533]">0537643686</span> يرجي ادخالة في الخانة التالية</p>

                        <Lottie animationData={otpAnimation} loop={true} className="h-80 my-[-50px]" />

                        <form className="mt-8">
                            <article className="mt-3">
                                <label className="text-sm 2xl:text-base font-medium text-[#344054]">ادخل رمز التاكيد هنا</label>
                                <div className='flex items-center gap-4 mt-1'>
                                    {otp.map((digit, index) => (
                                        <input key={index} value={digit} maxLength={1}
                                            onChange={(e: any) => handleChange(e.target.value, index)}
                                            onKeyUp={(e: any) => handleBackspaceAndEnter(e, index)}
                                            // ref={(reference) => (otpBoxReference.current[index] = reference)}
                                            className={`border border-[#D0D5DD] w-20 h-auto text-primary p-3 rounded-md focus:border-[#f0660c] outline-none focus-visible:outline-none appearance-none text-center  font-semibold text-lg`}
                                        />
                                    ))}
                                </div>
                                <p className={`text-sm 2xl:text-base text-[#fb4a4a] mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
                                <p className={`text-sm 2xl:text-base text-[#fb4a4a] mt-4`}>اعادة ارسال رمز التاكيد في 51 ثانية</p>
                            </article>
                        </form>

                        <div className="bg-primp-3 absolute bottom-10 w-[600px] 2xl:w-[730px] ">
                            <button onClick={() => optConfirmation()} className='focus-visible:outline-none btn btn-prmary w-full bg-[#004B7A] p-3 rounded-md text-white'>{dict?.login?.resetNewPassword}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
