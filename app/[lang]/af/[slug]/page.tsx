"use client"; // This is a client component 👈🏽
import React, { useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation"
import { get,post } from "../../api/ApiCalls"

export default function AF({ params,searchParams }: { params: { lang: string, slug: any } ,searchParams: any  }) {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (searchParams?.notifications?.length) {
            notificationCount()
          }

        checkAffiliation()

    }, [])

    const notificationCount = () => {
        if (searchParams?.notifications?.length) {
          var data = {
            id: searchParams?.notifications,
            mobileapp: true,
          }
          post('notificationsCounts', data).then((responseJson: any) => {
            if (responseJson?.success) {
              // console.log("responseJsonCount",responseJson?.success)
            }
          })
        }
      }

    const checkAffiliation = () => {

        get(`checkaffiliation/${params?.slug}`).then((responseJson: any) => {
            if(responseJson?.success){
                localStorage.setItem('affiliationCode', responseJson?.data?.slug_code.toString())

                if (typeof window !== 'undefined') {
                    window.location.href = responseJson?.data?.custom_link;
               }
                // router.push(`/${params?.lang}/${responseJson?.data?.custom_link}`);
            }else{
                router.push(`/`);
            }
            
        })
    }
    return (
        <>
        <h1>{params?.lang === 'ar' ? 'تحميل...' : 'loading...'}</h1>
        </>
    )
}