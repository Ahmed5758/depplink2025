"use client"; // This is a client component 👈🏽

import React, { Fragment, useEffect, useRef, useState } from 'react'
import 'moment/locale/ar'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getDictionary } from "../../../dictionaries";
import { usePathname } from "next/navigation"
import { useRouter } from 'next-nprogress-bar';
import { AdminApi, NewMedia } from '../../../api/Api';
import { get, post } from "../../../api/ApiCalls";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Dialog, Transition, RadioGroup } from '@headlessui/react'

const MobileHeader = dynamic(() => import('../../../components/MobileHeader'), { ssr: true })

export default function AddressDetails({ params }: { params: { lang: string, data: any, slug: string } }) {
    const router = useRouter();
    const path = usePathname();
    const [dict, setDict] = useState<any>([])
    const [selected, setSelected] = useState('0')
    const [orderDetails, setOrderDetails] = useState<any>([])
    const [addReviewsPop, setAddReviewsPop] = useState<boolean>(false)
    const [productReviewData, setProductReviewData] = useState<any>([])
    const [addRating, setAddRating] = useState<any>([]);
    const [addTitle, setAddTitle] = useState<any>([]);
    const [addReview, setAddReview] = useState<any>([]);
    const [uploadModal, setUploadModal] = useState<any>(false);
    const isArabic = params.lang === 'ar';
    const lang = params?.lang ?? 'ar';
    const [userData, setUserData] = useState<any>([]);
    const [facebookLink, setFacebookLink] = useState<any>('');
    const [tiktokLink, setTiktokLink] = useState<any>('');
    const [instagramLink, setInstagramLink] = useState<any>('');
    const [youtubeLink, setYoutubeLink] = useState<any>('');
    const [twitterLink, setTwitterLink] = useState<any>('');
    const [categoryData, setCategoryData] = useState<any>([]);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(null);

    // CURRENCY SYMBOL //
    const currencySymbol = <svg className="riyal-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="11" height="12">
        <path fill="currentColor" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path>
        <path fill="currentColor" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
    </svg>;

    const getOrderDetailsData = async () => {
        if (localStorage.getItem('userid')) {
            await get(`order-detail/${params.slug}`).then((responseJson: any) => {
                setOrderDetails(responseJson)
            })
            await get(`checkorder-review/${params.slug}/${localStorage.getItem('userid')}`).then((responseJson: any) => {
                setProductReviewData(responseJson?.data)
            })
        } else {
            router.push(`/${params.lang}`)
        }
    }

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
        getOrderDetailsData()
    }, [params])

    const SubmitReview = () => {
        var data = {
            user_id: localStorage.getItem('userid'),
            order_id: params.slug,
            addrating: addRating,
            addtitle: addTitle,
            addreview: addReview,
        }
        post('addproductreview', data).then(async (responseJson: any) => {
            if (responseJson?.success) {
                getOrderDetailsData()
                setAddReviewsPop(false)
                topMessageAlartSuccess(dict?.product?.addreview)
            }
            else {
                topMessageAlartDanger(dict?.product?.errorreview)
            }
        })
    }

    const MySwal = withReactContent(Swal);
    const topMessageAlartSuccess = (title: any) => {
        MySwal.fire({
            icon: "success",
            title:
                <div className="text-xs">
                    <div className="uppercase">{title}</div>
                </div>
            ,
            toast: true,
            position: params.lang == 'ar' ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: false,
            background: '#20831E',
            color: '#FFFFFF',
            timerProgressBar: true,
            customClass: {
                popup: `bg-success`,
            },
        });
    };

    const topMessageAlartDanger = (title: any) => {
        MySwal.fire({
            icon: "error",
            title:
                <div className="text-xs">
                    <div className="uppercase">{title}</div>
                </div>
            ,
            toast: true,
            position: params.lang == 'ar' ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 15000,
            showCloseButton: true,
            background: '#DC4E4E',
            color: '#FFFFFF',
            timerProgressBar: true,
        });
    };

    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const validateLinks = (): boolean => {
        const newErrors: any = {};           

        if (facebookLink && (!facebookLink.includes('facebook.com'))) {
            newErrors.facebook_link = isArabic
                ? "يجب أن يكون رابط الفيسبوك رابطاً صالحاً"
                : "Must be a valid Facebook URL";
        }
        if (twitterLink && (!twitterLink.includes('twitter.com'))) {
            newErrors.twitter_link = isArabic
                ? "يجب أن يكون رابط تويتر رابطاً صالحاً"
                : "Must be a valid Twitter URL";
        }
        if (tiktokLink && (!tiktokLink.includes('tiktok.com'))) {
            newErrors.tiktok_link = isArabic
                ? "يجب أن يكون رابط تيك توك رابطاً صالحاً"
                : "Must be a valid Tiktok URL";
        }
        if (instagramLink && (!instagramLink.includes('instagram.com'))) {
            newErrors.instagram_link = isArabic
                ? "يجب أن يكون رابط انستاجرام رابطاً صالحاً"
                : "Must be a valid Instagram URL";
        }

        // Validate YouTube Link
        if (youtubeLink && (!youtubeLink.includes('youtube.com'))) {
            newErrors.youtube_link = isArabic
                ? "يجب أن يكون رابط يوتيوب رابطاً صالحاً"
                : "Must be a valid Youtube URL";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;
    };

    const extractImageName = (imageUrl: any): any => {
        return imageUrl?.includes("new-media/") ? imageUrl?.split("new-media/")[1] : imageUrl;
    };

    const [ugcVideo, setUgcVideo] = useState<any>(null);
    const videoRef: any = useRef(null);
    const videoSectionRef: any = useRef(null);

    const saveUGCData = async () => {
        if (localStorage.getItem('userid')) {
            if (!facebookLink && !tiktokLink && !instagramLink && !twitterLink && !youtubeLink) {
                topMessageAlartDanger('Please add data.')
                return false;
            }
            if (!validateLinks()) return false;

            var sendData = {
                user_id: localStorage.getItem('userid'),
                facebook_link: facebookLink,
                tiktok_link: tiktokLink,
                instagram_link: instagramLink,
                twitter_link: twitterLink,
                youtube_link: youtubeLink,
                video_link: extractImageName(ugcVideo),
            }
            await post(`marketing/ugc-store`, sendData).then((responseJson: any) => {
                topMessageAlartSuccess('Success! Your UGC Created successfully.!')
                // getUGCData()
                setUgcVideo(null)
                if (videoRef) {
                    videoRef.current = null;
                }
                if (videoSectionRef) {
                    videoSectionRef.current = null;
                }
            }).finally(() => {
                setUploadModal(false)
                setFacebookLink('')
                setTiktokLink('')
                setInstagramLink('')
                setYoutubeLink('')
                setTwitterLink('')
                setErrors({
                    facebook_link: null,
                    twitter_link: null,
                    tiktok_link: null,
                    instagram_link: null,
                    youtube_link: null,
                });
            })
        } else {
            router.push(`/${params.lang}`)
        }
    }

    const [errors, setErrors] = useState<any>({
        facebook_link: '',
        twitter_link: '',
        tiktok_link: '',
        instagram_link: '',
        youtube_link: '',
    });

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [ugcVideo])

    const handleVideoUpload = async (event: any) => {
        const formData: any = new FormData();
        var head:{
            'Content-Type': 'multipart/form-data'
        }
        formData.append('file', event.target.files[0]);
        const data = await fetch(AdminApi + 'productmedia-video', {
            method: "post",
            // headers: head,
            body: formData,
        });
        const uploadedImage = await data.json();
        if (uploadedImage.success === true) {
            topMessageAlartSuccess(isArabic ? 'تم رفع الفيديو بنجاح' : 'Video uploaded successfully')
            setUgcVideo(NewMedia + uploadedImage?.id)
        } 
        else if(uploadedImage.success === false && uploadedImage.message) { 
            topMessageAlartDanger((isArabic ? 'خطأ: ' : 'Error: ') + uploadedImage.message)
        }
        else {
            console.log("Error Found");
        }
    }

    return (
        <>
            <MobileHeader type="Third" lang={params.lang} pageTitle={orderDetails?.orderdata?.order_no} />

            <div className="container md:py-4 py-16">
                <div className="flex items-start my-4 gap-x-5">

                    <div className="w-full">
                        <div className='font-bold text-base mb-4 flex items-center justify-between max-md:hidden'>
                            <h2>{params.lang == 'ar' ? 'تفاصيل الطلب' : 'Order Details'}</h2>
                            <Link href={`${origin}/${params.lang}/account/orderlisting`} className='text-[#219EBC] hover:underline text-sm'>{params.lang == 'ar' ? 'الـرجـوع' : 'Back'}</Link>
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-6 bg-white px-3 md:p-5 shadow-md rounded-md mb-3 text-sm">
                            <div className="text-[#1C262D85] max-md:my-4">
                                <h4 className="font-medium text-xs mb-1">{params.lang == 'ar' ? 'رقم الهاتف' : 'Order Number'}:</h4>
                                <p className="font-medium text-[#004B7A]">{orderDetails?.orderdata?.order_no}</p>
                            </div>
                            <div className="text-[#1C262D85] max-md:my-4">
                                <h4 className="font-medium text-xs mb-1">{params.lang == 'ar' ? 'تاريخ الطلب' : 'Order Date'}:</h4>
                                <p className="font-medium text-[#004B7A]">{moment(orderDetails?.orderdata?.created_at).locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY")}</p>
                            </div>
                            <div className="text-[#1C262D85] max-md:my-4">
                                <h4 className="font-medium text-xs mb-1">{params.lang == 'ar' ? 'تاريخ التوصيل' : 'Date of Delivery'}:</h4>
                                <p className="font-medium text-[#004B7A]">{orderDetails?.orderdata?.delivery_date ? moment(orderDetails?.orderdata?.delivery_date).locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY") : ''}</p>
                            </div>
                            <div className="text-[#1C262D85] max-md:my-4">
                                <h4 className="font-medium text-xs mb-1">{params.lang == 'ar' ? 'عدد المنتجات' : 'No. of Products'}:</h4>
                                <p className="font-medium text-[#004B7A]">({orderDetails?.orderdata?.details_count}) {params.lang == 'ar' ? 'منتجات' : 'Items'}</p>
                            </div>
                            <div className="text-[#1C262D85] max-md:my-4 col-span-2">
                                <h4 className="font-medium text-xs mb-1">{params.lang == 'ar' ? 'حالة الطلب' : 'Order Status'}:</h4>
                                {orderDetails?.orderdata?.status === 0 ?
                                    <p className="font-medium text-[#20831E]">{params.lang == 'ar' ? 'تم الإستلام' : 'Received'}</p>
                                    :
                                    orderDetails?.orderdata?.status === 1 ?
                                        <p className="font-medium text-[#219EBC]">{params.lang == 'ar' ? 'تم التأكيد' : 'Confirmed'}</p>
                                        :
                                        orderDetails?.orderdata?.status === 2 ?
                                            <p className="font-medium text-[#20831E]">{params.lang == 'ar' ? 'قيد التنفيذ' : 'Processing'}</p>
                                            :
                                            orderDetails?.orderdata?.status === 3 ?
                                                <p className="font-medium text-[#219EBC]">{params.lang == 'ar' ? 'خرج للتوصيل' : 'Out for Delivery'}</p>
                                                :
                                                orderDetails?.orderdata?.status === 4 ?
                                                    <p className="font-medium text-[#20831E]">{params.lang == 'ar' ? 'تم التوصيل' : 'Delivered'}</p>
                                                    :
                                                    orderDetails?.orderdata?.status === 5 ?
                                                        <p className="font-medium text-[#DC4E4E]">{params.lang == 'ar' ? 'ملغي' : 'Cancel'}</p>
                                                        :
                                                        orderDetails?.orderdata?.status === 6 ?
                                                            <p className="font-medium text-[#DC4E4E]">{params.lang == 'ar' ? 'تم الإرجاع' : 'Refunded'}</p>
                                                            :
                                                            orderDetails?.orderdata?.status === 7 ?
                                                                <p className="font-medium text-[#DC4E4E]">{params.lang == 'ar' ? 'فشل' : 'Failed'}</p>
                                                                :
                                                                orderDetails?.orderdata?.status === 8 ?
                                                                    <p className="font-medium text-[#004B7A95]">{params.lang == 'ar' ? 'في انتظار الدفع' : 'Pending For Payment'}</p>
                                                                    :
                                                                    <p className="font-medium text-[#004B7A95]">---</p>
                                }
                            </div>
                        </div>

                        <div className='my-4'>
                            <h2 className="font-bold text-base">{params.lang == 'ar' ? 'بيانات التواصل والدفع' : 'Contact & Payment Information'}</h2>
                            <div className="border bg-white border-[#219EBC] rounded-md p-3 mt-2">
                                <div>
                                    <label className="font-regular text-[#5D686F] text-sm">{params.lang == 'ar' ? 'التواصل' : 'Communication'}</label>
                                    <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-sm">
                                        <label className="">{orderDetails?.orderdata?.address?.user_data?.email}</label>
                                        <label className="">-</label>
                                        <label className="" dir="ltr">(966) {orderDetails?.orderdata?.address?.user_data?.phone_number}</label>
                                    </div>
                                    <hr className="opacity-10 my-3" />
                                </div>
                                <div>
                                    <label className="font-regular text-[#5D686F] text-sm">{params.lang == 'ar' ? 'العنوان' : 'Address'}</label>
                                    <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] fill-[#004B7A] font-regular text-sm">
                                        <svg id="fi_3514361" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m128 138.184a5 5 0 0 1 -3.607-1.538c-2.075-2.16-50.808-53.259-50.808-82.228a54.415 54.415 0 1 1 108.83 0c0 28.969-48.733 80.068-50.808 82.228a5 5 0 0 1 -3.607 1.538zm0-128.184a44.465 44.465 0 0 0 -44.415 44.418c0 19.07 29.312 54.978 44.414 71.451 15.1-16.478 44.416-52.4 44.416-71.451a44.465 44.465 0 0 0 -44.415-44.418z"></path><path d="m128 76.153a21.735 21.735 0 1 1 21.735-21.735 21.759 21.759 0 0 1 -21.735 21.735zm0-33.47a11.735 11.735 0 1 0 11.735 11.735 11.748 11.748 0 0 0 -11.735-11.735z"></path><path d="m128.126 256a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.559a5 5 0 0 1 -2.5-4.331v-38.385a5 5 0 0 1 10 0v35.5l72.175 41.67 72.174-41.67v-35.88a5 5 0 0 1 10 0v38.765a5 5 0 0 1 -2.5 4.331l-77.174 44.556a4.992 4.992 0 0 1 -2.5.673z"></path><path d="m128.126 166.884a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.557a5 5 0 1 1 5-8.66l74.675 43.113 74.674-43.11a5 5 0 1 1 5 8.66l-77.174 44.557a4.992 4.992 0 0 1 -2.5.667z"></path><path d="m160.933 198.291a5 5 0 0 1 -3.459-1.389l-32.806-31.402a5 5 0 0 1 6.916-7.224l30.1 28.813 68.154-39.349-27.558-26.382-27.359-15.744a5 5 0 1 1 4.988-8.667l27.885 16.047a4.988 4.988 0 0 1 .964.721l32.806 31.407a5 5 0 0 1 -.958 7.942l-77.174 44.557a4.993 4.993 0 0 1 -2.499.67z"></path><path d="m95.067 198.525a4.985 4.985 0 0 1 -2.5-.67l-77.173-44.555a5 5 0 0 1 -.957-7.942l33.057-31.642a4.967 4.967 0 0 1 .957-.718l27.634-15.955a5 5 0 1 1 5 8.66l-27.112 15.653-27.807 26.616 68.154 39.348 30.349-29.048a5 5 0 1 1 6.914 7.224l-33.058 31.641a4.991 4.991 0 0 1 -3.458 1.388z"></path></svg>
                                        <div>
                                            <p className="font-bold">{orderDetails?.orderdata?.address?.address_label === 0 ? params.lang == 'ar' ? 'الــمنـــزل' : 'Home' : params.lang == 'ar' ? 'مكتب' : 'Office'}</p>
                                            <label className="">{orderDetails?.orderdata?.address?.address}, {params.lang == 'ar' ? orderDetails?.orderdata?.address?.state_data?.name_arabic : orderDetails?.orderdata?.address?.state_data?.name}, {params.lang == 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</label>
                                        </div>
                                    </div>
                                    <hr className="opacity-10 my-3" />
                                </div>
                                <div className="text-sm font-medium">
                                    <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'الوقت المتوقع للتوصيل' : 'Expected time for delivery'}</label>
                                    {/* <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-sm">
                                        <label className="">{params.lang == 'ar' ? 'غدا' : 'Tomorrow'} 12/11/2023</label>
                                        <label className="">-</label>
                                        <label className=""> {params.lang == 'ar' ? 'الاثنين' : 'Monday'} 13/11/2023</label>
                                    </div> */}
                                    <hr className="opacity-10 my-3" />
                                </div>
                                <div className="text-sm font-medium">
                                    <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'السعر الجزئي' : 'Sub Total'}</label>
                                    <div className="gap-x-2 mt-1 rtl:mt-2 text-[#004B7A]">
                                        <label className="flex gap-x-1 items-center">{Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary?.filter((e: any) => e.name == 'subtotal')[0]?.price)}{' '}{currencySymbol}</label>
                                    </div>
                                    <hr className="opacity-10 my-3" />
                                </div>
                                {orderDetails?.orderdata?.ordersummary?.filter((e: any) => e.name == 'shipping').length ?
                                    <div className="text-sm font-medium">
                                        <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'سعر التوصيل' : 'Shipping Charges'}</label>
                                        <div className="gap-x-2 mt-1 rtl:mt-2 text-[#004B7A]">
                                            <label className="flex gap-x-1 items-center">{orderDetails?.orderdata?.ordersummary?.filter((e: any) => e.name == 'shipping')[0]?.price == 0 ? params.lang == 'ar' ? 'مـجـاني' : `Free` : `${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary?.filter((e: any) => e.name == 'shipping')[0]?.price)} `}{currencySymbol}</label>
                                        </div>
                                        <hr className="opacity-10 my-3" />
                                    </div>
                                    : null}
                                <div className="text-sm font-medium">
                                    <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'إجمالي القيمة' : 'Total Value'}</label>
                                    <div className="gap-x-2 mt-1 rtl:mt-2 text-[#004B7A]">
                                        <label className="flex gap-x-1 items-center">{Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary?.filter((e: any) => e.name == 'total')[0]?.price)}{' '}{currencySymbol}</label>
                                    </div>
                                    <hr className="opacity-10 my-3" />
                                </div>
                                <div className="text-sm font-medium">
                                    <div className='text-sm font-medium flex items-center justify-between'>
                                        <div>
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'الدفع عن طريق' : 'Payment via'}{' '}
                                                <span className="font-bold text-[#004B7A]">
                                                    {
                                                        orderDetails?.orderdata?.paymentmethod == 'tamara' ? params.lang == 'ar' ? 'تمارا' : 'Tamara'
                                                            : orderDetails?.orderdata?.paymentmethod == 'tabby' ? params.lang == 'ar' ? 'تابي' : 'Tabby'
                                                                : orderDetails?.orderdata?.paymentmethod == 'tasheel' ? params.lang == 'ar' ? 'بسيطه' : 'Baseeta'
                                                                    : orderDetails?.orderdata?.paymentmethod == 'madapay' ? params.lang == 'ar' ? 'بطاقات مدى' : 'Mada Card'
                                                                        : orderDetails?.orderdata?.paymentmethod == 'applepay' ? params.lang == 'ar' ? 'آبل باي' : 'Apple Pay'
                                                                            : orderDetails?.orderdata?.paymentmethod == 'hyperpay' ? params.lang == 'ar' ? 'البطاقات الإئتمانية' : 'Debit & Credit Card'
                                                                                : orderDetails?.orderdata?.paymentmethod == 'cod' ? params.lang == 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'
                                                                                    : null
                                                    }
                                                </span>
                                            </label>
                                            <div className="gap-x-2 mt-1 rtl:mt-2 text-[#004B7A]">
                                                {orderDetails?.orderdata?.status === 5 ?
                                                    <label>{params.lang == 'ar' ? 'إلغاء الأمر' : 'Order Has been Canceled'}</label>
                                                    :
                                                    orderDetails?.orderdata?.status === 6 ?
                                                        <label>{params.lang == 'ar' ? 'تم رد الطلب' : 'Refunded'}</label>
                                                        :
                                                        orderDetails?.orderdata?.status === 7 ?
                                                            <label>{params.lang == 'ar' ? 'فشل الطلب' : 'Failed'}</label>
                                                            :
                                                            orderDetails?.orderdata?.status === 8 ?
                                                                <label>{params.lang == 'ar' ? 'في انتظار الدفع' : 'Pending For Payment'}</label>
                                                                :
                                                                <label>
                                                                    {
                                                                        orderDetails?.orderdata?.paymentmethod == 'tamara' ? params.lang == 'ar' ? `غدا تقسيط علي 4 شهور بمبلغ ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price / 4)} ريال في الشهر` : `Installments for 4 months at an amount of ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price / 4)} per month`
                                                                            : orderDetails?.orderdata?.paymentmethod == 'tabby' ? params.lang == 'ar' ? `غدا تقسيط علي 4 شهور بمبلغ ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price / 4)} ريال في الشهر` : `Installments for 4 months at an amount of ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price / 4)} per month`
                                                                                : orderDetails?.orderdata?.paymentmethod == 'tasheel' ? params.lang == 'ar' ? `غدا تقسيط علي 36 شهور بمبلغ ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price / 36)} ريال في الشهر` : `Installments for 36 months at an amount of ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price / 36)} per month`
                                                                                    : orderDetails?.orderdata?.paymentmethod == 'madapay' ? params.lang == 'ar' ? `الدفع النقدي ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}` : `Instant pay ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}`
                                                                                        : orderDetails?.orderdata?.paymentmethod == 'applepay' ? params.lang == 'ar' ? `الدفع النقدي ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}` : `Instant pay ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}`
                                                                                            : orderDetails?.orderdata?.paymentmethod == 'hyperpay' ? params.lang == 'ar' ? `الدفع النقدي ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}` : `Instant pay ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}`
                                                                                                : orderDetails?.orderdata?.paymentmethod == 'cod' ? params.lang == 'ar' ? `الدفع عند الاستلام ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}` : `Paid upon delivery ${Intl.NumberFormat('en-US').format(orderDetails?.orderdata?.ordersummary.filter((element: any) => element.name == 'total')[0]?.price)}`
                                                                                                    : null
                                                                    }
                                                                    {currencySymbol}
                                                                </label>
                                                }
                                            </div>
                                        </div>
                                        {orderDetails?.orderdata?.paymentmethod == 'hyperpay' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/master.webp' : '/images/master.webp'}
                                                alt={orderDetails?.orderdata?.paymentmethod}
                                                title={orderDetails?.orderdata?.paymentmethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {orderDetails?.orderdata?.paymentmethod == 'madapay' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/mada.webp' : '/images/mada.webp'}
                                                alt={orderDetails?.orderdata?.paymentmethod}
                                                title={orderDetails?.orderdata?.paymentmethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {orderDetails?.orderdata?.paymentmethod == 'applepay' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/applepay.webp' : '/images/applepay.webp'}
                                                alt={orderDetails?.orderdata?.paymentmethod}
                                                title={orderDetails?.orderdata?.paymentmethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {orderDetails?.orderdata?.paymentmethod == 'cod' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/cod.webp' : '/images/cod.webp'}
                                                alt={orderDetails?.orderdata?.paymentmethod}
                                                title={orderDetails?.orderdata?.paymentmethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {orderDetails?.orderdata?.paymentmethod == 'tabby' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/tabby-ar.webp' : '/images/tabby-en.webp'}
                                                alt={orderDetails?.orderdata?.paymentmethod}
                                                title={orderDetails?.orderdata?.paymentmethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {orderDetails?.orderdata?.paymentmethod == 'tamara' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/tamara-ar.webp' : '/images/tamara-en.webp'}
                                                alt={orderDetails?.orderdata?.paymentmethod}
                                                title={orderDetails?.orderdata?.paymentmethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {orderDetails?.orderdata?.paymentmethod == 'tasheel' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/baseeta.webp' : '/images/baseeta.webp'}
                                                alt={orderDetails?.orderdata?.paymentmethod}
                                                title={orderDetails?.orderdata?.paymentmethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-4'>
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-base">{params.lang == 'ar' ? 'محتوي الطلب' : 'Products'}</h2>
                                <button className="text-sm font-semibold underline text-[#004B7A]">
                                    {params.lang === 'ar' ? 'اختر الكل' : 'Select All'}
                                </button>
                            </div>
                            <div className="mt-1 max-md:pb-32">
                                <RadioGroup value={selected} onChange={setSelected}>
                                    <RadioGroup.Label className="sr-only">{params.lang == 'ar' ? 'منتجات' : 'Server size'}</RadioGroup.Label>
                                    <div className="space-y-2">
                                        {orderDetails?.orderdata?.details?.map((data: any, i: React.Key | null | undefined) => {
                                            return (
                                                <RadioGroup.Option
                                                    key={i}
                                                    value={i}
                                                    className={({ active, checked }) => ` ${checked ? '' : ''} relative focus:outline-none`}
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <div className={`bg-white rounded-md shadow-md flex items-center gap-x-4 mb-4 p-2 max-md:relative border ${checked ? 'border-[#219EBC]' : 'border-transparent'}`} key={i}>
                                                                <div className="md:relative md:w-44 flex items-center">
                                                                    {checked ?
                                                                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 max-md:absolute max-md:top-2 right-2">
                                                                            <circle cx={12} cy={12} r={12} fill="#219EBC" opacity="0.2" />
                                                                            <path
                                                                                d="M7 13l3 3 7-7"
                                                                                stroke="#219EBC"
                                                                                strokeWidth={2}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                        :
                                                                        <svg viewBox="0 0 24 24" fill="#219EBC60" className="h-6 w-6 max-md:absolute max-md:top-2 right-2">
                                                                            <circle cx={12} cy={12} r={12} fill="#219EBC60" opacity={0.2} />
                                                                        </svg>
                                                                    }
                                                                    <Image
                                                                        src={data?.product_data?.featured_image?.image ? NewMedia + data?.product_data?.featured_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                                                        alt={params.lang == 'ar' ? data?.product_data?.name_arabic : data?.product_data?.name}
                                                                        title={params.lang == 'ar' ? data?.product_data?.name_arabic : data?.product_data?.name}
                                                                        height={50}
                                                                        width={50}
                                                                        loading='lazy'
                                                                        className="mx-auto"
                                                                    />
                                                                </div>
                                                                <div className="p-3 w-full">
                                                                    <h4 className="text-primary text-xs md:text-sm">{params.lang == 'ar' ? data?.product_data?.name_arabic : data?.product_data?.name}</h4>
                                                                    <h2 className="text-base md:text-xl font-semibold text-dark mt-2 flex gap-x-1 items-center">
                                                                        <div className='flex gap-x-1 items-center'>
                                                                            {Intl.NumberFormat('en-US').format(data?.product_data?.sale_price)}{'  '}{currencySymbol}
                                                                        </div>
                                                                        <span className="text-xs md:text-sm text-[#DC4E4E] line-through decoration-[#DC4E4E] decoration-2 font-medium">{Intl.NumberFormat('en-US').format(data?.product_data?.price)}</span></h2>
                                                                    <div className="text-[#5D686F] text-sm flex items-center gap-x-2 mt-4 justify-between">
                                                                        <div className="flex items-center gap-x-2">
                                                                            <p>{params.lang == 'ar' ? 'العلامة' : 'Brand'}:</p>
                                                                            {data?.product_data?.brand?.brand_media_image?.image ?
                                                                                <Image
                                                                                    src={data?.product_data?.brand?.brand_media_image?.image ? NewMedia + data?.product_data?.brand?.brand_media_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                                                                    alt={params.lang == 'ar' ? data?.product_data?.brand?.name_arabic : data?.product_data?.brand?.name}
                                                                                    title={params.lang == 'ar' ? data?.product_data?.brand?.name_arabic : data?.product_data?.brand?.name}
                                                                                    height={60}
                                                                                    width={60}
                                                                                    className="h-full"
                                                                                    loading='lazy'
                                                                                />
                                                                                :
                                                                                <p className="font-bold text-xs">{params.lang == 'ar' ? data?.product_data?.brand?.name_arabic : data?.product_data?.brand?.name}</p>
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            {data?.expressproduct == 1 ? 
                                                                                <Image
                                                                                    src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                                    width="55" height="0" alt="express_delivery" title='Express Delivery'
                                                                                /> 
                                                                            :null}
                                                                            <p className="font-bold">{params.lang == 'ar' ? 'عدد' : 'Qty'} {data?.quantity}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            )
                                        })
                                        }
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 w-full p-3 bg-white shadow-md border-t border-[#5D686F26]">
                <div className="flex items-center justify-between mb-2 gap-2">
                    <button
                        type="button"
                        onClick={() => setAddReviewsPop(true)}
                        className="focus-visible:outline-none border border-[#004B7A] bg-[#004B7A] text-white text-xs font-semibold px-5 py-3 rounded-md shadow-md hover:shadow-none w-1/2"
                    >
                        {params.lang == 'ar' ? 'إضافة التقييم على المنتج' : "Add Product Review's"}
                    </button>
                    <button
                        type="button"
                        className="focus-visible:outline-none border border-[#004B7A] bg-[#004B7A] text-white text-xs font-semibold px-5 py-3 rounded-md shadow-md hover:shadow-none w-1/2"
                    >
                        {params.lang == 'ar' ? 'إنشاء طلب صيانة' : "Create Maintainance Request"}
                    </button>
                </div>
                <button
                    type="button"
                    className="w-full focus-visible:outline-none border border-[#DC4E4E] bg-[#DC4E4E] text-white text-xs font-semibold px-3.5 py-3 rounded-md shadow-md hover:shadow-none"
                >
                    {params.lang == 'ar' ? 'إلغاء طلب' : 'Cancel Order'}
                </button>
            </div>
            {/* Order Rating */}
            <Transition appear show={addReviewsPop} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={() => setAddReviewsPop(false)}>
                    <div className="fixed inset-0 bg-dark/40" aria-hidden="true" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex md:min-h-full h-full items-center justify-center md:p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md max-md:h-[-webkit-fill-available] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 container"
                                    >
                                        <div className="py-3.5 border-b mb-3 border-[#9CA4AB50]">
                                            <div className="flex items-center justify-between ">
                                                <Dialog.Title
                                                    as="h4"
                                                    className="text-lg font-bold leading-6 text-gray-900"
                                                >
                                                    {params.lang == 'ar' ? "تعليقات المنتج" : "Product Review's"}
                                                </Dialog.Title>
                                                <button onClick={() => setAddReviewsPop(false)} className="focus-visible:outline-none">
                                                    <svg height="16" viewBox="0 0 329.26933 329" width="16" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Title>
                                    <div className="mt-2 container">
                                        {orderDetails?.orderdata?.details?.map((data: any, i: any, adb: any) => {
                                            return (
                                                <div className="bg-white" key={i}>
                                                    <div className="flex items-center mb-2 gap-2">
                                                        <Image
                                                            src={data?.product_data?.featured_image?.image ? NewMedia + data?.product_data?.featured_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                                            alt={params.lang == 'ar' ? data?.product_data?.name_arabic : data?.product_data?.name}
                                                            title={params.lang == 'ar' ? data?.product_data?.name_arabic : data?.product_data?.name}
                                                            height={50}
                                                            width={50}
                                                            loading='lazy'
                                                            className=""
                                                        />
                                                        <div>
                                                            {/* {data?.expressproduct == 1 ? 
                                                            <h4 className="text-[#DC4E4E] font-semibold text-xs md:text-sm line-clamp-1">{params.lang == 'ar' ? data?.express_qty + 'x المنتج السريع' : data?.express_qty + 'x Express Product'}</h4>
                                                            :null} */}
                                                            <h4 className="text-primary text-xs font-semibold line-clamp-1">{params.lang == 'ar' ? data?.product_data?.name_arabic : data?.product_data?.name}</h4>
                                                            <div className="flex items-center gap-x-2 text-xs">
                                                                <p className='text-xs'>{params.lang == 'ar' ? 'العلامة' : 'Brand'}:</p>
                                                                {data?.product_data?.brand?.brand_media_image?.image ?
                                                                    <Image
                                                                        src={data?.product_data?.brand?.brand_media_image?.image ? NewMedia + data?.product_data?.brand?.brand_media_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                                                        alt={params.lang == 'ar' ? data?.product_data?.brand?.name_arabic : data?.product_data?.brand?.name}
                                                                        title={params.lang == 'ar' ? data?.product_data?.brand?.name_arabic : data?.product_data?.brand?.name}
                                                                        height={40}
                                                                        width={40}
                                                                        className="h-full"
                                                                        loading='lazy'
                                                                    />
                                                                    :
                                                                    <p className="font-bold text-xs">{params.lang == 'ar' ? data?.product_data?.brand?.name_arabic : data?.product_data?.brand?.name}</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-xs font-semibold">{params.lang === 'ar' ? 'حدد التقييم' : 'Select Rating'}:</label>
                                                            <div className="flex items-center gap-1 my-2.5">
                                                                {productReviewData[data?.product_data?.sku]?.rating >= 1 ?
                                                                    <button className="focus-visible:outline-none fill-[#f36c32]">
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                    :
                                                                    <button className={`focus-visible:outline-none fill-[${addRating[data?.product_data?.sku] >= 1 ? '#f36c32' : '#5D686F'}]`} onClick={(e) => {
                                                                        var rating: any = addRating
                                                                        rating[data?.product_data?.sku] = 1;
                                                                        setAddRating({ ...rating })

                                                                    }}>
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                }

                                                                {productReviewData[data?.product_data?.sku]?.rating >= 2 ?
                                                                    <button className="focus-visible:outline-none fill-[#f36c32]">
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                    :
                                                                    <button className={`focus-visible:outline-none fill-[${addRating[data?.product_data?.sku] >= 2 ? '#f36c32' : '#5D686F'}]`} onClick={(e) => {
                                                                        var rating: any = addRating
                                                                        rating[data?.product_data?.sku] = 2;
                                                                        setAddRating({ ...rating })
                                                                    }}>
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                }

                                                                {productReviewData[data?.product_data?.sku]?.rating >= 3 ?
                                                                    <button className="focus-visible:outline-none fill-[#f3ac30]">
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                    :
                                                                    <button className={`focus-visible:outline-none fill-[${addRating[data?.product_data?.sku] >= 3 ? '#f3ac30' : '#5D686F'}]`} onClick={(e) => {
                                                                        var rating: any = addRating
                                                                        rating[data?.product_data?.sku] = 3;
                                                                        setAddRating({ ...rating })
                                                                    }}>
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                }

                                                                {productReviewData[data?.product_data?.sku]?.rating >= 4 ?
                                                                    <button className="focus-visible:outline-none fill-[#82ae04]">
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                    :
                                                                    <button className={`focus-visible:outline-none fill-[${addRating[data?.product_data?.sku] >= 4 ? '#82ae04' : '#5D686F'}]`} onClick={(e) => {
                                                                        var rating: any = addRating
                                                                        rating[data?.product_data?.sku] = 4;
                                                                        setAddRating({ ...rating })
                                                                    }}>
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                }

                                                                {productReviewData[data?.product_data?.sku]?.rating >= 5 ?
                                                                    <button className="focus-visible:outline-none fill-[#38ae04]">
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                    :
                                                                    <button className={`focus-visible:outline-none fill-[${addRating[data?.product_data?.sku] >= 5 ? '#38ae04' : '#5D686F'}]`} onClick={(e) => {
                                                                        var rating: any = addRating
                                                                        rating[data?.product_data?.sku] = 5;
                                                                        setAddRating({ ...rating })
                                                                    }}>
                                                                        <svg height="18" width="18" viewBox="0 -10 511.99143 511" xmlns="http://www.w3.org/2000/svg" id="fi_1828961"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path></svg>
                                                                    </button>
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="pb-3.5 pt-3 px-3 bg-white rounded-md border flex items-center border-[#5D686F30] gap-x-2 mb-1.5">
                                                            <input className="focus-visible:outline-none w-full text-xs font-normal" placeholder={params.lang === 'ar' ? 'المراجعات' : 'Subject'} type="text" value={productReviewData[data?.product_data?.sku] ? productReviewData[data?.product_data?.sku]?.title : addTitle[data?.product_data?.sku]} disabled={productReviewData[data?.product_data?.sku] ? true : false} onChange={(e) => {

                                                                var addtitle: any = addTitle
                                                                addtitle[data?.product_data?.sku] = e.target.value;
                                                                setAddTitle({ ...addtitle })
                                                            }} />
                                                        </div>
                                                        <div className="pb-3.5 pt-3 px-3 bg-white rounded-md border flex items-center border-[#5D686F30] gap-x-2 w-full">
                                                            <textarea className="focus-visible:outline-none w-full text-xs font-normal" placeholder={params.lang === 'ar' ? 'العنوان' : 'Reviews'} value={productReviewData[data?.product_data?.sku] ? productReviewData[data?.product_data?.sku]?.review : addReview[data?.product_data?.sku]} disabled={productReviewData[data?.product_data?.sku] ? true : false} onChange={(e) => {

                                                                var addreview: any = addReview
                                                                addreview[data?.product_data?.sku] = e.target.value;
                                                                setAddReview({ ...addreview })
                                                            }} />
                                                        </div>
                                                    </div>
                                                    {i + 1 === adb?.length ?
                                                        null
                                                        :
                                                        <hr className="opacity-10 my-4" />
                                                    }
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className="py-4 text-right">
                                        <div className="fixed bottom-0 w-full px-4 py-3 bg-white shadow-md border-t border-[#5D686F26]">
                                            <button onClick={() => SubmitReview()}
                                                className="focus-visible:outline-none btn border border-[#004B7A] bg-[#004B7A] p-2.5 rounded-md w-full text-white fill-white font-medium">
                                                {params.lang == 'ar' ? 'الغاء الطلب' : "Add Review's"}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* UGC Modal */}
            <Transition appear show={uploadModal} as={Fragment}>
                <Dialog as="div" open={uploadModal} onClose={() => setUploadModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel bg-white border-0 p-0 rounded-lg overflow-hidden my-20 w-full max-w-2xl text-black">
                                    <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-base">{isArabic ? 'رفع فيديو جديد' : 'Upload New Video'}</h5>
                                        <button onClick={() => setUploadModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-5 space-y-4">
                                    {ugcVideo &&
                                    <video ref={videoRef} controls={false} muted autoPlay loop className="w-full h-60 rounded-md">
                                        <source src={ugcVideo} />
                                    </video> }
                                        <div className='bg-gray/30 p-10 rounded-md'>
                                            <div className='text-center p-2 rounded-md w-64 mx-auto'>
                                                <button className="btn_primaryCustomXS"
                                                onClick={() => videoSectionRef.current?.click()}
                                                >
                                                    <input
                                                        type="file"
                                                        accept="video/mp4, video/avi, video/mov"
                                                        style={{ display: 'none' }} // Hide the file input
                                                        ref={videoSectionRef}
                                                        onChange={(e) => handleVideoUpload(e)} // Handle file selection
                                                    />
                                                    {isArabic ? 'رفع فيديو' : 'Update Video'}
                                                </button>
                                                </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <div className='text-xs font-semibold flex items-center gap-x-2 border border-primary/25 rounded-md'>
                                                    <div className='bg-primary p-2 rounded-l-md disabled:bg-primary/25'>
                                                        <svg id="fi_3128208" enableBackground="new 0 0 100 100" height="20" viewBox="0 0 100 100" width="20" xmlns="http://www.w3.org/2000/svg"><g id="_x30_1._Facebook" className="fill-white hover:fill-secondary"><path id="Icon_11_" d="m40.4 55.2c-.3 0-6.9 0-9.9 0-1.6 0-2.1-.6-2.1-2.1 0-4 0-8.1 0-12.1 0-1.6.6-2.1 2.1-2.1h9.9c0-.3 0-6.1 0-8.8 0-4 .7-7.8 2.7-11.3 2.1-3.6 5.1-6 8.9-7.4 2.5-.9 5-1.3 7.7-1.3h9.8c1.4 0 2 .6 2 2v11.4c0 1.4-.6 2-2 2-2.7 0-5.4 0-8.1.1-2.7 0-4.1 1.3-4.1 4.1-.1 3 0 5.9 0 9h11.6c1.6 0 2.2.6 2.2 2.2v12.1c0 1.6-.5 2.1-2.2 2.1-3.6 0-11.3 0-11.6 0v32.6c0 1.7-.5 2.3-2.3 2.3-4.2 0-8.3 0-12.5 0-1.5 0-2.1-.6-2.1-2.1 0-10.5 0-32.4 0-32.7z"></path></g></svg>
                                                    </div>
                                                    <div className='w-full p-2'>
                                                        {/* <label>{isArabic ? 'فيسبوك' : 'Facebook'}</label> */}
                                                        <input
                                                            value={facebookLink}
                                                            placeholder={isArabic ? 'فيسبوك' : 'Enter link here...'}
                                                            onChange={(e) => setFacebookLink(e.target.value)}
                                                            className={`w-full bg-white text-xs font-normal text-black outline-none focus:ring-transparent
                                                        ${errors.facebook_link ? 'border-[#ff0000]' : 'border-white-light focus:border-primary dark:focus:border-primary'}`}
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                {errors.facebook_link && <p className="text-[#ff0000] text-xs mt-1">{errors.facebook_link}</p>}
                                            </div>

                                            <div>
                                                <div className='text-xs font-semibold flex items-center gap-x-2 border border-primary/25 rounded-md'>
                                                    <div className='bg-primary p-2 rounded-l-md disabled:bg-primary/25'>
                                                        <svg id="fi_3046120" enableBackground="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-white hover:fill-secondary"><g><path d="m480.32 128.39c-29.22 0-56.18-9.68-77.83-26.01-24.83-18.72-42.67-46.18-48.97-77.83-1.56-7.82-2.4-15.89-2.48-24.16h-83.47v228.08l-.1 124.93c0 33.4-21.75 61.72-51.9 71.68-8.75 2.89-18.2 4.26-28.04 3.72-12.56-.69-24.33-4.48-34.56-10.6-21.77-13.02-36.53-36.64-36.93-63.66-.63-42.23 33.51-76.66 75.71-76.66 8.33 0 16.33 1.36 23.82 3.83v-62.34-22.41c-7.9-1.17-15.94-1.78-24.07-1.78-46.19 0-89.39 19.2-120.27 53.79-23.34 26.14-37.34 59.49-39.5 94.46-2.83 45.94 13.98 89.61 46.58 121.83 4.79 4.73 9.82 9.12 15.08 13.17 27.95 21.51 62.12 33.17 98.11 33.17 8.13 0 16.17-.6 24.07-1.77 33.62-4.98 64.64-20.37 89.12-44.57 30.08-29.73 46.7-69.2 46.88-111.21l-.43-186.56c14.35 11.07 30.04 20.23 46.88 27.34 26.19 11.05 53.96 16.65 82.54 16.64v-60.61-22.49c.02.02-.22.02-.24.02z"></path></g></svg>
                                                    </div>
                                                    <div className='w-full p-2'>
                                                        {/* <label>{isArabic ? 'فيسبوك' : 'Facebook'}</label> */}
                                                        <input
                                                            value={tiktokLink}
                                                            placeholder={isArabic ? 'فيسبوك' : 'Enter link here...'}
                                                            onChange={(e) => setTiktokLink(e.target.value)}
                                                            className={`w-full bg-white text-xs font-normal text-black outline-none focus:ring-transparent
                                                        ${errors.tiktok_link ? 'border-[#ff0000]' : 'border-white-light focus:border-primary dark:focus:border-primary'}`}
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                {errors.tiktok_link && <p className="text-[#ff0000] text-xs mt-1">{errors.tiktok_link}</p>}
                                            </div>

                                            <div>
                                                <div className='text-xs font-semibold flex items-center gap-x-2 border border-primary/25 rounded-md'>
                                                    <div className='bg-primary p-2 rounded-l-md disabled:bg-primary/25'>
                                                        <svg id="fi_2111491" enableBackground="new 0 0 24 24" height="18" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-white hover:fill-secondary"><path d="m12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c.001 2.208-1.788 3.997-3.997 3.997z"></path><path d="m16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941-2.308 2.308-2.013 5.418-2.013 9.979 0 4.668-.26 7.706 2.013 9.979 2.317 2.316 5.472 2.013 9.979 2.013 4.624 0 6.22.003 7.855-.63 2.223-.863 3.901-2.85 4.065-6.419.104-2.209.098-7.677 0-9.887-.198-4.213-2.459-6.768-6.976-6.976zm3.495 20.372c-1.513 1.513-3.612 1.378-8.468 1.378-5 0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453 0-5.525-.567-9.504 4.978-9.788 1.274-.045 1.649-.06 4.856-.06l.045.03c5.329 0 9.51-.558 9.761 4.986.057 1.265.07 1.645.07 4.847-.001 4.942.093 6.959-1.394 8.453z"></path><circle cx="18.406" cy="5.595" r="1.439"></circle></svg>
                                                    </div>
                                                    <div className='w-full p-2'>
                                                        {/* <label>{isArabic ? 'إنستغرام' : 'Instagram'}</label> */}
                                                        <input
                                                            value={instagramLink}
                                                            placeholder={isArabic ? 'فيسبوك' : 'Enter link here...'}
                                                            onChange={(e) => setInstagramLink(e.target.value)}
                                                            className={`w-full bg-white text-xs font-normal text-black outline-none focus:ring-transparent 
                                                        ${errors.instagram_link ? 'border-[#ff0000]' : 'border-white-light focus:border-primary dark:focus:border-primary'}`}
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                {errors.instagram_link && <p className="text-[#ff0000] text-xs mt-1">{errors.instagram_link}</p>}
                                            </div>

                                            <div>
                                                <div className='text-xs font-semibold flex items-center gap-x-2 border border-primary/25 rounded-md'>
                                                    <div className='bg-primary p-2 rounded-l-md disabled:bg-primary/25'>
                                                        <svg id="fi_3128212" enableBackground="new 0 0 100 100" height="18" viewBox="0 0 100 100" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-white hover:fill-secondary"><path id="_x30_4.Twitter" d="m89.9 25.2c-3 1.3-6.1 2.2-9.4 2.6 3.4-2 6-5.2 7.2-9.1-3.2 1.9-6.7 3.2-10.4 4-3-3.2-7.3-5.2-12-5.2-9.1 0-16.4 7.4-16.4 16.4 0 1.3.1 2.5.4 3.7-13.6-.6-25.6-7.2-33.7-17.1-5.8 10.4.7 19 5 21.9-2.6 0-5.2-.8-7.4-2 0 8.1 5.7 14.8 13.1 16.3-1.6.5-5.2.8-7.4.3 2.1 6.5 8.2 11.3 15.3 11.4-5.6 4.4-13.8 7.9-24.3 6.8 7.3 4.7 15.9 7.4 25.2 7.4 30.2 0 46.6-25 46.6-46.6 0-.7 0-1.4-.1-2.1 3.4-2.5 6.2-5.4 8.3-8.7z"></path></svg>
                                                    </div>
                                                    <div className='w-full p-2'>
                                                        {/* <label>{isArabic ? 'تويتر' : 'Twitter'}</label> */}
                                                        <input
                                                            value={twitterLink}
                                                            placeholder={isArabic ? 'فيسبوك' : 'Enter link here...'}
                                                            onChange={(e) => setTwitterLink(e.target.value)}
                                                            className={`w-full bg-white text-xs font-normal text-black outline-none focus:ring-transparent 
                                                        ${errors.twitter_link ? 'border-[#ff0000]' : 'border-white-light focus:border-primary dark:focus:border-primary'}`}
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                {errors.twitter_link && <p className="text-[#ff0000] text-xs mt-1">{errors.twitter_link}</p>}
                                            </div>

                                            <div>
                                                <div className='text-xs font-semibold flex items-center gap-x-2 border border-primary/25 rounded-md'>
                                                    <div className='bg-primary p-2 rounded-l-md disabled:bg-primary/25'>
                                                        <svg height="20" viewBox="-21 -117 682.66672 682" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_1384028" className="fill-white hover:fill-secondary"><path d="m626.8125 64.035156c-7.375-27.417968-28.992188-49.03125-56.40625-56.414062-50.082031-13.703125-250.414062-13.703125-250.414062-13.703125s-200.324219 0-250.40625 13.183593c-26.886719 7.375-49.03125 29.519532-56.40625 56.933594-13.179688 50.078125-13.179688 153.933594-13.179688 153.933594s0 104.378906 13.179688 153.933594c7.382812 27.414062 28.992187 49.027344 56.410156 56.410156 50.605468 13.707031 250.410156 13.707031 250.410156 13.707031s200.324219 0 250.40625-13.183593c27.417969-7.378907 49.03125-28.992188 56.414062-56.40625 13.175782-50.082032 13.175782-153.933594 13.175782-153.933594s.527344-104.382813-13.183594-154.460938zm-370.601562 249.878906v-191.890624l166.585937 95.945312zm0 0"></path></svg>
                                                    </div>
                                                    <div className='w-full p-2'>
                                                        {/* <label>{isArabic ? 'يوتيوب' : 'Youtube'}</label> */}
                                                        <input
                                                            value={youtubeLink}
                                                            placeholder={isArabic ? 'فيسبوك' : 'Enter link here...'}
                                                            onChange={(e) => setYoutubeLink(e.target.value)}
                                                            className={`w-full bg-white text-xs font-normal text-black outline-none focus:ring-transparent 
                                                        ${errors.youtube_link ? 'border-[#ff0000]' : 'border-white-light focus:border-primary dark:focus:border-primary'}`}
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                {errors.youtube_link && <p className="text-[#ff0000] text-xs mt-1">{errors.youtube_link}</p>}
                                            </div>
                                        </div>
                                        <div className='flex justify-end mt-14'>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    const isValid: any = await saveUGCData();
                                                    if (isValid) setUploadModal(false);
                                                }}
                                                className="focus-visible:outline-none bg-[#004B7A] border border-[#004B7A] hover:bg-[#00446f] hover:border-[#00446f] text-white rounded-md px-5 py-2 text-sm font-medium">
                                                {isArabic ? 'حفظ' : 'Save'}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}