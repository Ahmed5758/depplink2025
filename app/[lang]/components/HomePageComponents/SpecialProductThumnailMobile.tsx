import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation'

const ProductSliderMobile = dynamic(() => import('./ProductSliderMobile'), { ssr: false })

export default function SpecialProductThumnailMobile(props: any) {
    const isArabic = props?.isArabic;
    const bgColor = props?.bgcolor;
    const topBottom = props?.typeLeft ? true : false;
    const router = useRouter();
    return (
        <div className={`${bgColor ? "gridentBg" : "gridentBgPrimary"} items-center justify-center p-3 rounded-md gap-4`}>
            <div className={`w-full ${isArabic ? "text-right" : "text-left"}`}>
                <h2 className="headingHomeMobile !text-white !text-xl">{props?.title}</h2>
                <p className="text-xs mt-2 !text-white">{props?.description}</p>
                <div className="mt-8">
                    <button className="btnWhiteSpecialMobile"
                    onClick={() => {
                        router.push(`/${isArabic ? "ar" : "en"}/${props?.buttonLink}`)
                    }}
                    >{props?.buttonTitle}</button>
                </div>
            </div>
            <div className="w-full relative mt-6">
                <ProductSliderMobile
                    classHeading="!hidden"
                    products={props?.data?.products?.data}
                    lang={props?.lang}
                    dict={props?.dict}
                    origin={props?.origin}
                    userAgent={props?.userAgent}
                />
            </div>
        </div>
    );
};
