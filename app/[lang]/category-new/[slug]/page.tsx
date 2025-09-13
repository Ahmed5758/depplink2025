"use client"; // This is a client component 👈🏽

import React, { useRef, Fragment, useEffect, useState } from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { NewMedia } from '../../api/Api';
import { Api } from "../../api/Api";
import Landing from '../landing';
import Listing from '../listing';

export default function CategoryNew({ params, searchParams }: { params: { lang: string, slug: string, data: any, devicetype: any }, searchParams: any }) {
    const type = params?.data?.type ?? 1;
    const [data, setData] = useState<any>(params);
    const [data2, setData2] = useState<any>(searchParams);
    useEffect(() => {
        setData(params);
        setData2(searchParams);
    }, [params, searchParams])

    if (data?.data?.type === 0) {
        return <Listing params={data} searchParams={data2} />;
    } else {
        return <Landing params={params} searchParams={searchParams} />;
    }
}