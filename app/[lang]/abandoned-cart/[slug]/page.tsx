"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Select from 'react-select'
import Lottie from "lottie-react"
import dynamic from 'next/dynamic'
import { getDictionary } from "../../dictionaries";
import { useRouter, usePathname } from 'next/navigation'
import { getCart, setCart } from '../../cartstorage/cart';

export const fetchCache = 'force-no-store'

export default function AbandonedCart({ params }: { params: { lang: string, slug: string, data: any }}) {
  const router = useRouter()
  const [dict, setDict] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const translationdata = await getDictionary(params.lang);
      setDict(translationdata);
    })
    setCartWithReturn(params)
  }, [params])

  const setCartWithReturn = (data: {
      lang: string // This is a client component 👈🏽
      ; slug: string; data: any;
    }) => {
      if(localStorage.getItem("userid")) {
        localStorage.removeItem("userid")
        localStorage.setItem('userid', data?.data?.cart?.user_id)
      }
      else {
        localStorage.setItem('userid', data?.data?.cart?.user_id)
      }
      // getcart
      var cartdata = JSON.parse(data?.data?.cart?.cartdata)
      setCart(cartdata)
      router.push(`/${params.lang}/cart`)
  }
  return (
    <>
    </>
  )
}
