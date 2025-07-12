"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import { getDictionary } from "../../dictionaries";
import { get, post } from '../../api/ApiCalls';
import { getOrderId, removeCart } from '../../cartstorage/cart';
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic';
const FullPageLoader = dynamic(() => import('../../components/FullPageLoader'), { ssr: false })

export default function PaymentStatus({ params, searchParams }: { params: { lang: string, slug: any }, searchParams: any }) {
    const [dict, setDict] = useState<any>([]);
    const [paymentmethod, setpaymentmethod] = useState<any>(false);
    const [paymentid, setpaymentid] = useState<any>(false);
    const [orderId, setorderId] = useState<any>(false);
    const [type, settype] = useState<any>(false);
    const router = useRouter();
    const [loaderStatus, setLoaderStatus] = useState<any>(false)

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
        setupData()
        setLoaderStatus(true)
    }, [params])

    useEffect(() => {
        if (paymentid)
            submitOrder()
    }, [paymentid])

    useEffect(() => {
        if (orderId)
            submitProcess()
    }, [orderId])

    const submitOrder = () => {
        get('order-paymentupdate/' + orderId + '/' + paymentid).then(async (responseJson: any) => {
            removeCart()
            router.push(`/${params.lang}/checkout/congratulations/${orderId}`);
        })
    }

    const setupData = async () => {
        var paydata = params.slug.split('-')
        await setpaymentmethod(paydata[0])
        await settype(paydata[1])
        await setorderId(getOrderId())

    }

    function detectPlatform() {
        if (window.Android) return "Android-WebView";
        if (window.webkit?.messageHandlers?.iosBridge) return "iOS-WebView";
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) return "Android-Mobile-WebView";
        if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS-Mobile-WebView";
        return "Desktop";
    }

    const pushGTMEvent = () => {
    if (typeof window === 'undefined' || !window.dataLayer) return;
        window.dataLayer.push({ ecommerce: null });

        window.dataLayer.push({
            event: "Payment_failed",
            platform: detectPlatform(),
            method: paymentmethod,
            reason: "insufficent balance", // currency
            
        });
    }

    const submitProcess = async () => {
        // console.log('paymentmethod',paymentmethod)
        // console.log('type',type)
        // return false;
        if (paymentmethod == 'hyperpay') {
            await get(`hyperresponse/${orderId}/${searchParams.id}`).then(async (responseJson: any) => {
                if (responseJson.status === true) {
                    await setpaymentid(searchParams.id)
                }
                else {
                    pushGTMEvent();
                    router.push(`/${params.lang}/checkout`);
                }
            })
        }
        else if(paymentmethod == 'clickpay' || paymentmethod == 'clickpay_applepay'){
            if(searchParams?.respStatus == 'A'){
                await setpaymentid(searchParams?.tranRef)
            }
            else {
                pushGTMEvent();
                router.push(`/${params.lang}/checkout`);
            }
        }
        else if(paymentmethod == 'mispay'){
            await get(`mispayresponse/${orderId}/${searchParams._}`).then(async (responseJson: any) => {
                if (responseJson.status === true) {
                    await setpaymentid(responseJson.id)
                } 
                else {
                    pushGTMEvent();
                    router.push(`/${params.lang}/checkout`);
                }
            })
        }
        else {
            if (type != 'success') {
                pushGTMEvent();
                router.push(`/${params.lang}/checkout`);
            }
            else {
                if (paymentmethod == 'tamara') {
                    await setpaymentid(searchParams.orderId)
                }
                if (paymentmethod == 'tabby') {
                    await setpaymentid(searchParams.payment_id)
                }
                if (paymentmethod == 'madfu') {
                    await setpaymentid('madfu')
                }
            }
        }
    }

    return (
        <>
            <FullPageLoader loader={loaderStatus} Text={params.lang === 'ar' ? '' : `Please wait!`} TextTwo={params.lang === 'ar' ? '' : `While We Are Confirming Your Transaction ...`} />
        </>
    )
}
