'use client'

import React from 'react'
import Lottie from "lottie-react"
import fullPageLoader from "../../../public/json/loader_ping_2.json"


export default function FullPageLoader(props: any) {
    return (
        <>
            {props.loader ? 
            <>
                <div className="flex items-center justify-center fixed z-50 w-full h-full">
                    <div className="fixed inset-0 bg-white/80 z-50" />
                    <div className='z-50 min-h-screen absolute top-[18%]'>
                        <Lottie animationData={fullPageLoader} loop={true} className="h-14" />
                    </div>
                </div>
            </>
            : null}
        </>
    );
}