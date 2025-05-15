import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation'

const ProductsSliderSmallThumb = dynamic(() => import('../../components/ProductsSliderSmallThumb'), { ssr: false })

export default function SpecialProductThumnail(props: any) {
    const isArabic = props?.isArabic;
    const bgColor = props?.bgcolor;
    const topBottom = props?.typeLeft ? true : false;
    const router = useRouter();
    return (
        <div className={`flex ${isArabic ? 'flex-row-reverse' : ''} items-center ${bgColor ? "gridentBg" : "gridentBgPrimary"} items-center justify-center p-6 rounded-md gap-4`}>
            <div className={`w-5/6 ${isArabic ? 'order-1' : 'order-2'} relative`}>
                <ProductsSliderSmallThumb
                    products={props?.data?.products?.data}
                    lang={props?.lang}
                    dict={props?.dict}
                    origin={props?.origin}
                    userAgent={props?.userAgent}
                    title={props?.data?.title}
                    sec={props?.sec}
                />
            </div>
            <div className={`w-1/6 ${isArabic ? "order-2" : "order-1"}`}>
                <h2 className="headingHomeMain !text-white !text-xl">{props?.title}</h2>
                <p className="paraHomeMain mt-2 !text-white line-clamp-2">{props?.description}</p>
                <div className="mt-12">
                    <button className="btnWhiteSpecial"
                        onClick={() => {
                            router.push(`/${isArabic ? "ar" : "en"}/${props?.buttonLink}`)
                        }}
                    >{props?.buttonTitle}</button>
                </div>
            </div>
        </div>
    );
};
