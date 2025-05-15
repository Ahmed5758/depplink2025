'use client'

import dynamic from 'next/dynamic'
import React, { useState, useEffect, Fragment } from 'react'
import { usePathname } from "next/navigation"
import { useRouter } from 'next-nprogress-bar'

export default function ProductLoader(props: any, request: any) {
    const router = useRouter()
    const path = usePathname()

    return (
        <div className="flex flex-col m-auto p-auto">
            <div className="flex overflow-x-scroll hide-scroll-bar pb-1">
                <div className="flex flex-nowrap items-center gap-x-3">
                    {[...Array(6)].map((_, i) => (
                        <div className="h-auto bg-white relative p-2 rounded-lg shadow-md min-w-64" key={i}>
                            <div className="animate-pulse">
                                <div className="rounded-md bg-dark/10 p-2.5 h-[260px] w-full"></div>
                                <div className="rounded-md bg-dark/10 p-2.5 h-[40px] mt-2"></div>
                                <div className="rounded-md bg-dark/10 p-2.5 h-[26px] mt-2"></div>
                                <div className="rounded-md bg-dark/10 p-2.5 mt-2"></div>
                                <div className="flex items-center justify-between gap-x-2">
                                    <div className="rounded-md bg-dark/10 p-2.5 h-[40px] w-1/2 flex items-end gap-x-2 mt-2"></div>
                                    <div className="rounded-md bg-dark/10 p-2.5 h-[40px] w-1/2 flex items-end gap-x-2 mt-2"></div>
                                </div>
                                <div className='flex items-center justify-between mt-3.5 gap-x-2'>
                                    <div className="rounded-md bg-dark/10 p-2.5 h-[40px] mt-3 w-1/2"></div>
                                    <div className="rounded-md bg-dark/10 p-2.5 h-[40px] mt-3 w-1/4"></div>
                                    <div className="rounded-md bg-dark/10 p-2.5 h-[40px] mt-3 w-1/4"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}