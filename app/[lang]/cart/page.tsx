"use client"; // This is a client component 👈🏽

import React, { useEffect, useState, Fragment, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Lottie from "lottie-react"
import dynamic from 'next/dynamic'
import Select from 'react-select'
// import MaskedInput from 'react-text-mask'
import { getDictionary } from "../dictionaries"
import { usePathname } from "next/navigation"
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next-nprogress-bar';
import { Dialog, Transition } from '@headlessui/react'
import shoppingCart from "../../../public/json/shoppingCart.json"
import { NewMedia } from '../api/Api'
import { get, post } from "../api/ApiCalls"
import Swal from 'sweetalert2'
import '@next/third-parties/google'
import withReactContent from 'sweetalert2-react-content'
import { getCart, getCartCount, getSummary, removeCartItem, recheckcartdata, increaseQty, setShipping, setDiscountRule, setDiscountRuleBogo, getProductids, removecheckoutdata, removeCartItemFbt, updateCartItemFbtQty, getExpressDeliveryCart, getPickupStoreCart, setPickupStoreCart } from '../cartstorage/cart';
import moment from 'moment'
import PickupStorePopup from '../components/PickupStorePopup';
import GlobalContext from '../GlobalContext'

const MobileHeader = dynamic(() => import('../components/MobileHeader'), { ssr: true })
const ProductSlider = dynamic(() => import('../components/ProductSlider'), { ssr: false })
const FullPageLoader = dynamic(() => import('../components/FullPageLoader'), { ssr: false })


export default function Cart({ params }: { params: { lang: string } }) {
    const [dict, setDict] = useState<any>([]);
    const [selected, setSelected] = useState()
    const [loginPopup, setLoginPopup] = useState<any>(false)
    const [cartData, setcartData] = useState<any>({})
    const [cartCount, setCartCount] = useState(0)
    const [summary, setSummary] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false)
    const [storePickup, setstorePickup] = useState<any>(0);
    const [signUp, setSignUp] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [userid, setUserid] = useState<any>(false)
    const [wishlistProduct, setWishlistProduct] = useState<any>([])
    const [phoneNumber, setPhoneNumber] = useState<any>(false)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [dateOfBirth, setDateOfBirth] = useState<string>('')
    const [genderStatus, setGenderStatus] = useState<number>(0)
    const [ProWishlistData, setProWishlistData] = useState<any>([])
    const [relatedproducts, setRelatedproducts] = useState<any>([])
    const [quantityBox, setQuantityBox] = useState<boolean>(false)
    const router = useRouter();
    const path = usePathname();
    const [profileData, setProfileData] = useState<any>([])
    const [discountType, setDiscountType] = useState<any>(0)
    const [loaderStatus, setLoaderStatus] = useState<any>(true)
    const [expressData, setexpressData] = useState<any>([])
    const [storeData, setstoreData] = useState<any>([])
    const [showExpPopup, setshowExpPopup] = useState<any>(false)
    // Pickup From Store
    const { globalCity, setglobalCity } = useContext<any>(GlobalContext);
    const {globalStore, setglobalStore} = useContext<any>(GlobalContext);
    const [allStores, setallStores] = useState<any>([])
    const [storeSearch, setstoreSearch] = useState<any>('')
    const [storeUpdateStatus, setstoreUpdateStatus] = useState<any>(false)
    const { updateWishlist, setUpdateWishlist } = useContext(GlobalContext);
    const [gtmEventPushed, setGtmEventPushed] = useState<any>(false);
    const [direction, setDirection] = useState<"left-to-right" | "right-to-left">(
            "left-to-right"
        );

    // CURRENCY SYMBOL //
    const currencySymbol = <svg className="riyal-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="15" height="15">
        <path fill="currentColor" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path>
        <path fill="currentColor" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
    </svg>;

    useEffect(() => {
        if(localStorage.getItem('userWishlist')){
            var wdata:any = localStorage.getItem('userWishlist')
            setProWishlistData(JSON.parse(wdata))
        }
        
        window.addEventListener("storage", () => {
            refetch();
        });
        return () => {
            window.removeEventListener("storage", () => {
                refetch();
            });
        };
    }, []);

    useEffect(() => {
        (async () => {
            const exp = await getExpressDeliveryCart()
            setexpressData(exp)

            {/* Commented Pickup Store */}
            const store: any = await getPickupStoreCart()
            // if(store?.warehouses?.length < 1){
            //     topMessageAlartDanger('Error! No store available for store pickup.')
            //     updateDeliveryMethod(0)
            // }
            setglobalStore(store?.warehouse_single)
            localStorage.setItem('globalStore', store?.warehouse_single?.id)
            setallStores(store?.warehouses)
            
            setstoreData(store)
            
            // Display popup when express delivery is implemented
            const hasTrue = Object.values(exp)?.some((value: any) => value !== false);
            if (hasTrue) {
                // setshowExpPopup(true)
            }
        })();
        
    }, [cartData])

     {/* Commented Pickup Store */}
    useEffect(() => {
        if(storePickup != cartData?.storeType && cartData?.storeType != undefined && cartData?.storeType != null){
            updateDeliveryMethod(cartData?.storeType)
        }
    }, [cartData])

    const refetch = () => {
        if(localStorage.getItem('userWishlist')){
            var wdata:any = localStorage.getItem('userWishlist')
            setProWishlistData(JSON.parse(wdata))
        }
        else if(ProWishlistData.length){
            setProWishlistData([])
        }

        
    }

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
          
        resetCart()
        getDiscountType()
        getUser()
    }, [params])

    useEffect(() => {
        if(cartData?.products && !gtmEventPushed){
            pushGTMEvent()
            setGtmEventPushed(true)
        }
    },[cartData?.products, gtmEventPushed])


    const getDiscountType = async () => {
        get(`getdiscounttype`).then((responseJson: any) => {
            setDiscountType(responseJson?.data?.discount_type)
        })
    }

    function detectPlatform() {
        if (window.Android) return "Android";
        if (window.webkit?.messageHandlers?.iosBridge) return "iOS";
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) return "Android";
        if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS";
        return "Web";
    }

    const pushGTMEvent = () => {
        if (typeof window === 'undefined' || !window.dataLayer) return;

        const isList = 'view_cart';
        const productArray = Array.isArray(cartData.products) ? cartData.products : [];
        if (!productArray.length) return;
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            event: isList,
            value: Number(getSummary().filter((element: any) => element.key == 'total')[0]?.price), // sum of prices
            currency: "SAR", // currency
            platform: detectPlatform(),
            ecommerce: {
                items: productArray.map((item: any, index: number) => {
                    const price = item?.bogo === 1 ? 0 : (item?.price > 0 ? Number(item?.price) : Number(item?.regular_price));
                    const discountPrice: any = item?.regular_price - price;
                    return {
                        item_id: item?.sku,
                        item_name: params.lang == 'ar' ? item?.name_arabic : item?.name,
                        item_brand: params.lang == 'ar' ? item?.brand?.name_arabic : item?.brand?.name,
                        item_image_link: `${item?.image}`,
                        item_link: `${origin}/${params.lang == 'ar' ? 'ar' : 'en'}/${item?.slug}`,
                        price: Number(price),
                        shelf_price: Number(item?.regular_price),
                        discount: Number(discountPrice),
                        item_availability: "in stock",
                        item_list_id: item?.item_list_id ?? "50000",
                        item_list_name: item?.item_list_name ?? "direct",
                        index: index + 1,
                        quantity: item?.quantity ?? 1,
                        id: item?.sku,
                    }
                }),
            },
        });
    };

    const dataLayers = () => {
        window.dataLayer = window.dataLayer || [];
        var SHA256 = require("crypto-js/sha256");
        var encryptedEmail = SHA256(profileData?.userdata?.email);
        var splittedfinalEmail = encryptedEmail.words.join("");
        var finalEmail = splittedfinalEmail.split("-");
        var encryptedPhone = SHA256("+966" + profileData?.userdata?.phone_number);
        var splittedfinalPhone = encryptedPhone.words.join("");
        var finalPhone = splittedfinalPhone.split("-");
        var encryptedFirstName = SHA256(profileData?.userdata?.first_name);
        var encryptedLastName = SHA256(profileData?.userdata?.last_name);
        window.dataLayer.push({ ecommerce: null });
        if (localStorage.getItem("userid")) {
            window.dataLayer.push({
                event: "addToCart",
                phone_number: `+966${profileData?.userdata?.phone_number}`,
                __INSERT_USER_PHONE__: `+966${profileData?.userdata?.phone_number}`,
                __INSERT_USER_EMAIL__: profileData?.userdata?.email,
                user_email: profileData?.userdata?.email,
                user_hashed_phone_number: finalPhone.join(""),
                user_hashed_email: finalEmail.join(""),
                address: {
                    first_name: profileData?.userdata?.first_name,
                    last_name: profileData?.userdata?.last_name,
                    // city: params.lang == 'ar' ? orderDetails?.orderdata?.address?.state_data?.name_arabic : orderDetails?.orderdata?.address?.state_data?.name,
                    country: params.lang == 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia',
                },
                ecommerce: {
                    // add: {
                    //     // 'add' actionFieldObject measures.
                    //     // products: dataarry,
                    // },
                    affiliation: "Tamkeen Stores Online Store",
                    value: getSummary().filter((element: any) => element.key == 'total')[0]?.price, // Total transaction value (incl. tax and shipping)
                    tax: ((getSummary().filter((element: any) => element.key == 'total')[0]?.price) - (getSummary().filter((element: any) => element.key == 'total')[0]?.price) / 1.15).toFixed(2),
                    currency: "SAR",
                    shipping: cartData?.fees?.shipping?.amount,
                    no_of_items: cartData?.products?.length,
                },
            })
        } else {
            window.dataLayer.push({
                event: "addToCart",
                ecommerce: {
                    currencyCode: "SAR",
                    add: {
                        products: cartData?.products,
                    },
                    affiliation: "Tamkeen Stores Online Store",
                    value: getSummary().filter((element: any) => element.key == 'total')[0]?.price,
                    tax: ((getSummary().filter((element: any) => element.key == 'total')[0]?.price) - (getSummary().filter((element: any) => element.key == 'total')[0]?.price) / 1.15).toFixed(2),
                    no_of_items: cartData?.products?.length,
                },
            });
        }
    }

    const resetCart = async () => {
        removecheckoutdata()
        setcartData(getCart());
        setCartCount(getCartCount())
        setSummary(getSummary())
        await setShipping();
        await setDiscountRule();
        await setDiscountRuleBogo();
        setcartData(getCart());
        setCartCount(getCartCount())
        setSummary(getSummary())
        setLoaderStatus(false)
    }

    const removeItem = (key: any) => {
        setLoaderStatus(true)
        removeCartItem(key)
        resetCart()
    }

    const removeItemFbt = (prokey: any, fbtkey: any) => {
        removeCartItemFbt(prokey, fbtkey)
        resetCart()
    }

    const updateCartFbtQty = (qty: any ,prokey: any, fbtkey: any) => {
        setLoaderStatus(true)
        updateCartItemFbtQty(qty, prokey, fbtkey)
        resetCart()
    }

    const updateQty = async (qty: any, key: any) => {
        setGtmEventPushed(false)
        setLoaderStatus(true)
        if (cartData && cartData.products && cartData.products[key] && cartData.products[key].fbt && cartData.products[key].fbt.length >= 1) {
            const fbtArray = cartData.products[key].fbt;
            for (let index = 0; index < fbtArray.length; index++) {
                const element = fbtArray[index];
                if (element) {
                    element.quantity = element.total_quantity >= qty ? qty : element.total_quantity;
                }
            }
        } 
        await increaseQty(cartData, qty, key, true)
        resetCart()
    }

    const getUser: any = async () => {
        if (localStorage.getItem("userid")) {
            setUserid(localStorage.getItem("userid"))
            // setIsOpen(false)

            var proid: any = getProductids();
            // get(`checkmultiwishlistproduct/${proid.id.join(",")}/${localStorage.getItem("userid")}`).then((responseJson: any) => {
            //     setProWishlistData(responseJson.data)
            // })

            await get(`user/${localStorage.getItem('userid')}`).then((responseJson: any) => {
                setProfileData(responseJson)
            })
        }

    }

    const getCheckout: any = async () => {

        setLoaderStatus(true)
        // abandoned cart work
        var data = {
            user_id: localStorage.getItem("userid"),
            cart_data: getCart(),
        }
        post('abandoned-cart-store', data).then((responseJson: any) => {
            // console.log('abandoned cart response', responseJson)
        })
        // abandoned cart work
        if (localStorage.getItem("userid")) {
            router.push(`/${params.lang}/checkout`);
            // var recheck = await recheckcartdata()
            // if(recheck.success)
            //     router.push(`/${params.lang}/checkout`);
            // else{
            //     resetCart()
            //     topMessageAlartDanger(params.lang == 'ar' ? 'هناك بعض التحديثات في سلة التسوق الخاصة بك.' : 'There is some updates in your cart.')
            // }
        } else {
            // setIsOpen(true)
            // router.push(`/${params.lang}/login`)
            // GlobalService.loginPopup = true
            router.push(`/${params.lang}/login?type=checkout`)
        }
    }

    const WishlistProduct = (i: number, id: number) => {

        if (localStorage.getItem("userid")) {
            var data = {
                user_id: localStorage.getItem("userid"),
                product_id: id,
            }
            post('addwishlist', data).then((responseJson: any) => {
                if (responseJson?.success) {
                    if (localStorage.getItem("wishlistCount")) {
                        topMessageAlartSuccess(dict?.products?.wishlistAddedText)
                        var wishlistlength: any = localStorage.getItem('wishlistCount');
                        wishlistlength = parseInt(wishlistlength) + 1;
                        localStorage.setItem('wishlistCount', wishlistlength);
                    }
                    getUser()
                    localStorage.removeItem('userWishlist')
                    setUpdateWishlist(updateWishlist == 0 ? 1 : 0)
                }
            })
        } else {
            // setIsOpen(true)
            router.push(`/${params.lang}/login`)
        }
    }

    const RemoveWishlistProduct = (i: number, id: number) => {

        if (localStorage.getItem("userid")) {
            var data = {
                user_id: localStorage.getItem("userid"),
                product_id: id,
            }
            post('removewishlist', data).then((responseJson: any) => {
                if (responseJson?.success) {
                    if (localStorage.getItem("wishlistCount")) {
                        topMessageAlartSuccess(dict?.products?.wishlistRemovedText)
                        var wishlistlength: any = localStorage.getItem('wishlistCount');
                        wishlistlength = parseInt(wishlistlength) - 1;
                        localStorage.setItem('wishlistCount', wishlistlength);
                    }
                    getUser()
                    localStorage.removeItem('userWishlist')
                    setUpdateWishlist(updateWishlist == 0 ? 1 : 0)
                }
            })
        } else {
            // setIsOpen(true)
            router.push(`/${params.lang}/login`)
        }
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

    {/* Commented Pickup Store */}
    const updateDeliveryMethod = (method: any) => {
        setstorePickup(method)
        var storeId: any = false
        var storetype: any = 0
        var storeCity: any = false
        if(method == 1){
            storeId = globalStore?.id
            storetype = method
            // storeCity = globalStore?.showroom_data?.waybill_city
            storeCity = params?.lang == 'ar' ? globalStore?.showroom_data?.store_city?.name_arabic : globalStore?.showroom_data?.store_city?.name
        }
        setPickupStoreCart(storeId, storetype, storeCity)
        resetCart()
    }

    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
    return (
        <>
            <FullPageLoader loader={loaderStatus} />
            <MobileHeader type="Third" lang={params.lang} pageTitle={params.lang === 'ar' ? 'العربة' : 'Cart'} />
            <div className="container py-4 max-md:py-16">
                {cartData?.products?.length < 1 ?
                    <div className="container my-10 flex items-center justify-center">
                        <div className='text-center'>
                            <Lottie animationData={shoppingCart} loop={true} className="h-80 my-[-50px]" />
                            <p className="text-center text-xs md:text-sm text-[#5D686F] w-full md:w-[72%] m-auto">{params.lang == 'ar' ? 'لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك بعد، تصفح المنتجات وأضفها إلى سلة التسوق الخاصة بك لعملية دفع سريعة تصفح المنتجات وقم باضافتها الي العربة الان.' : 'You have not added any products to your shopping cart yet. Browse the products and add them to your shopping cart for a quick checkout process. Browse the products and add them to the cart now.'}</p>
                            <div className="w-72 mt-6 mx-auto">
                                <Link href={`${origin}/${params.lang}`} className="focus-visible:outline-none btn bg-[#004B7A] py-2.5 px-4 rounded-md text-sm 2xl:text-base text-white">{params.lang == 'ar' ? 'تسوق المنتجات' : 'Shop products'}</Link>
                            </div>
                        </div>
                    </div>
                    : null}

                {/* Cart have Products */}
                {cartData?.products?.length >= 1 ?
                    <div className="md:flex items-start md:my-4 md:gap-x-5">
                        <div className="w-full">
                            <div className="bg-white shadow-md rounded-md relative p-3 mb-3">
                                <h6 className='text-sm font-semibold'>{params?.lang == 'ar' ? 'كيف ترغب في الحصول على طلبك؟' : 'How would you like to get your order?'}</h6>
                                <div className="space-y-3 mt-3">
                                    <div className='border border-[#004B7A] rounded-md p-3 flex justify-between items-center w-full'>
                                        <div className="flex gap-2 justify-start items-center">
                                            <input value={0} checked={storePickup == 0} onChange={(e: any) => {
                                                {/* Commented Pickup Store */}
                                                updateDeliveryMethod(e.target.value)
                                                topMessageAlartSuccess(params?.lang == 'ar' ? 'تم اختيار التوصيل المنزلي بنجاح.' : 'Success! Home Delivery Selected Successfully..')
                                            }} type="radio" name='delivery' id='delivery' className='form-radio' />
                                            <label className='text-sm'>{params?.lang == 'ar' ? 'التوصيل إلى المنازل' : 'Home delivery'}</label>
                                        </div>
                                        {/* <h6 className='text-sm text-[#EF7E2C]'>{cartData?.products?.length} of {cartData?.products?.length} {params.lang == 'ar' ? 'العناصر المتاحة' : 'items available'}</h6> */}
                                    </div>
                                    {/* Commented Pickup Store */}
                                    {storeData?.warehouses?.length >= 1 ?
                                    <div className='border border-[#004B7A] rounded-md p-3 flex justify-between items-cente w-full'>
                                        <div className="flex gap-2 justify-start items-center">
                                            <input value={1} checked={storePickup == 1} onChange={(e: any) => {
                                                updateDeliveryMethod(e.target.value)
                                                topMessageAlartSuccess(params?.lang == 'ar' ? 'تم اختيار استلام الطلب من المتجر بنجاح.' : 'Success! Store Pickup Selected Successfully..')
                                            }} type="radio" name='storePickup' id='storePickup' className='form-radio' />
                                            <label className='text-sm'>{params?.lang == 'ar' ? 'الاستلام من المتجر' : 'Store pickup'}</label>
                                        </div>
                                        <h6 className='text-sm text-[#EF7E2C]'>{storeData?.success ? cartData?.products?.length : 0} {params.lang == 'ar' ? 'ل' : 'of'} {cartData?.products?.length} {params.lang == 'ar' ? 'العناصر المتاحة' : 'items available'}</h6>
                                    </div>
                                    :null}
                                </div>
                                {/* Commented Pickup Store */}
                                {storePickup == 1 ?
                                <>
                                <hr className='opacity-5 my-3 w-full' />
                                <div className='flex gap-3 justify-start items-center text-sm'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/726/726498.png" alt="warehouse" height='18' width='18' />
                                    <button onClick={() => {
                                        setIsOpenModal(true)
                                    }}>
                                        <p className='flex gap-x-1'>{params?.lang == 'ar' ? 'جمع من' : 'Collect from'} 
                                            <button className="text-[#219EBC] font-semibold">{params?.lang == 'ar' ? globalStore?.showroom_data?.name_arabic : globalStore?.showroom_data?.name}</button>
                                            <svg
                                                height="12"
                                                viewBox="0 0 24 24"
                                                width="12"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className='mt-1'
                                            >
                                                <path
                                                    clipRule="evenodd"
                                                    d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                                                    fillRule="evenodd"
                                                    stroke='lightgray'
                                                    strokeWidth='0.5'
                                                    fill='lightgray'
                                                ></path>
                                            </svg>
                                        </p>
                                    </button>
                                </div>
                                <p className='text-[12px] mt-2'>{params.lang == 'ar' ? 'يمكنك استلام طلبك خلال ساعة واحدة خلال ساعات عمل المتجر' : 'You can collect your order within 1 hour(s) during store work hours'}</p>
                                </>
                                :null}
                            </div>
                            {storePickup == 0 ?
                            <div className={`bg-white rounded-md shadow-md flex items-start gap-x-2 mb-3 p-4 w-full text-xs font-semibold`}>
                                <img src="https://cdn-icons-png.flaticon.com/512/9720/9720868.png" alt="errorMark" height='18' width='18' />
                                {params.lang == 'ar' ? 'خيارات توصيل أسرع حسب المنتجات المختارة والمنطقة والوقت. اخترها عند إتمام عملية الشراء.' : 'Faster delivery options depending on the selected items, area, and time. Choose when you checkout.'}
                            </div>
                            :null}
                            {cartData?.products?.map((pro: any, i: number) => {
                                //if (!pro?.bogo) {
                                var prototalqty = []
                                for (let index = 0; index < pro.total_quantity; index++) {
                                    prototalqty.push({ value: (index + 1), label: (index + 1) })
                                }
                                var checkExp = expressData[pro?.id]
                                return (
                                    <>
                                        <div className="bg-white shadow-md rounded-md relative py-2 mb-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <div className="w-1/4">
                                                            <Image
                                                                src={pro?.image}
                                                                alt={params.lang == 'ar' ? pro?.name_arabic : pro?.name}
                                                                title={params.lang == 'ar' ? pro?.name_arabic : pro?.name}
                                                                height={85}
                                                                width={85}
                                                                loading='lazy'
                                                                className="rounded-md mx-auto"
                                                            />
                                                        </div>
                                                        <div className="px-2 w-full">
                                                            <h4 className="text-primary text-xs line-clamp-2">{params.lang == 'ar' ? pro?.name_arabic : pro?.name} </h4>
                                                            <div className="align__center gap-x-3">
                                                            <div className='flex gap-1.5 items-center'>
                                                                <h2 className="text-base font-semibold text-dark flex gap-1 items-center">
                                                                    {pro?.bogo ? pro?.discounted_amount?.toLocaleString('EN-US') : pro?.price?.toLocaleString('EN-US')}
                                                                    {'  '}{currencySymbol}
                                                                </h2>
                                                                    {pro?.regular_price > pro?.price ?
                                                                        <span className="text-xs text-[#DC4E4E] line-through decoration-[#DC4E4E] decoration-2 font-medium flex items-center gap-1">
                                                                            { pro?.regular_price?.toLocaleString('EN-US')}{currencySymbol}
                                                                        </span>
                                                                        : null}
                                                            </div>
                                                                <p className="text-[#5D686F] text-sm flex items-center gap-x-2">
                                                                    {pro?.brand?.brand_media_image ?
                                                                        <Image
                                                                            src={pro?.brand?.brand_media_image ? NewMedia + pro?.brand?.brand_media_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                                                            alt={params.lang == 'ar' ? pro?.brand?.name_arabic : pro?.brand?.name}
                                                                            title={params.lang == 'ar' ? pro?.brand?.name_arabic : pro?.brand?.name}
                                                                            height={85}
                                                                            width={85}
                                                                            className="h-full"
                                                                            loading='lazy'
                                                                        />
                                                                        :
                                                                        <p>{params.lang == 'ar' ? pro?.brand?.name_arabic : pro?.brand?.name}</p>
                                                                    }
                                                                </p>
                                                            </div>
                                                            {!pro?.bogo ?
                                                                <div className="mt-4 align__center">
                                                                    <div className="flex items-center gap-x-4">
                                                                        <button className="focus-visible:outline-none btn fill-[#004B7A] font-medium"
                                                                            onClick={() => {

                                                                                if (ProWishlistData.filter((item: any) => item == pro?.id).length >= 1) {
                                                                                    RemoveWishlistProduct(i, pro?.id)
                                                                                } else {
                                                                                    WishlistProduct(i, pro?.id)
                                                                                }

                                                                            }}
                                                                        >
                                                                            {ProWishlistData.filter((item: any) => item == pro?.id).length >= 1 ?
                                                                                <svg id="fi_4240564" enableBackground="new 0 0 512 512" height="18" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m256 469.878c-86.27-49.763-253.779-170.182-255.971-290.334-2.395-131.178 145.05-190.67 255.971-77.883 110.905-112.771 258.343-53.318 255.971 77.86-2.171 120.16-169.697 240.59-255.971 290.357z" fillRule="evenodd"></path></svg>
                                                                                :
                                                                                <svg id="fi_3870922" height="18" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m489.864 101.1a130.755 130.755 0 0 0 -60.164-50.89c-28.112-11.8-59.687-13.924-91.309-6.127-28.978 7.146-57.204 22.645-82.391 45.129-25.189-22.486-53.418-37.986-82.4-45.131-31.623-7.8-63.2-5.674-91.312 6.134a130.755 130.755 0 0 0 -60.161 50.9c-15.02 23.744-22.661 52.619-22.097 83.5 2.504 137.285 207.006 262.122 247.976 285.755a16 16 0 0 0 15.989 0c40.974-23.636 245.494-148.495 247.976-285.779.558-30.879-7.086-59.751-22.107-83.491zm-9.887 82.916c-.8 44.388-30.39 96.139-85.563 149.655-51.095 49.558-109.214 86.912-138.414 104.293-29.2-17.378-87.31-54.727-138.4-104.287-55.176-53.512-84.766-105.259-85.576-149.646-.884-48.467 22.539-87.462 62.656-104.313a106.644 106.644 0 0 1 41.511-8.238c36.795 0 75.717 17.812 108.4 51.046a16 16 0 0 0 22.815 0c45.406-46.17 102.85-62.573 149.9-42.811 40.121 16.845 63.547 55.834 62.671 104.298z"></path></svg>
                                                                            }
                                                                        </button>
                                                                        <button className="focus-visible:outline-none btn fill-[#EB5757] font-medium" onClick={() => removeItem(i)}>
                                                                            <svg height="18" viewBox="-40 0 427 427.00131" width="18" xmlns="http://www.w3.org/2000/svg" id="fi_1214428"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"></path><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button
                                                                            onClick={() => setQuantityBox(quantityBox == pro?.id ? false : pro?.id)}
                                                                            className="focus-visible:outline-none border rounded-md py-1.5 px-2 h-auto w-16 border-[#004B7A] text-[#004B7A] fill-[#004B7A]  font-semibold text-sm bg-[#5D686F05] align__center"
                                                                        >
                                                                            {pro.quantity}
                                                                            <div className="flex items-center gap-x-1.5">
                                                                                {/* <div className="border-l h-5 opacity-40"></div> */}
                                                                                <svg height="14" viewBox="0 0 32 32" width="14" className={`transform ease-out duration-150 ${quantityBox == pro?.id ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" id="fi_9126125"><path clipRule="evenodd" d="m4.93934 10.9393c.58579-.5857 1.53553-.5857 2.12132 0l8.93934 8.9394 8.9393-8.9394c.5858-.5857 1.5356-.5857 2.1214 0 .5857.5858.5857 1.5356 0 2.1214l-10 10c-.5858.5857-1.5356.5857-2.1214 0l-9.99996-10c-.58579-.5858-.58579-1.5356 0-2.1214z" fillRule="evenodd"></path></svg>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                : null}
                                                        </div>
                                                    </div>
                                                    {quantityBox == pro?.id ?
                                                        <div className="flex flex-col mt-3 px-2">
                                                            <div className="flex overflow-x-scroll hide-scroll-bar pb-1">
                                                                <div className="flex flex-nowrap items-center">
                                                                    <div className="text-[#5D686F] flex gap-x-2">
                                                                        {[...Array(parseInt(pro?.total_quantity))].map((_, g) => (
                                                                            <button className={`focus-visible:outline-none border rounded-md p-2 w-12 ${i === 1 ? 'border-[#004B7A]' : 'border-[#5D686F]'} text-sm`}
                                                                                onClick={() => {
                                                                                    updateQty(g + 1, i)
                                                                                    setQuantityBox(false)
                                                                                }}>{g + 1}</button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : null}
                                                    {/* {!pro?.bogo ?  */}
                                                        <>
                                                        <hr className='my-2 opacity-5' />
                                                        {checkExp && checkExp?.qty >= pro?.quantity ?
                                                            <>
                                                                <div className='flex items-center gap-x-4 mx-2 mt-2 bg-[#fde18d] rounded-md p-2 w-[-webkit-fit-content]'>
                                                                    <Image
                                                                        src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                        width="65" height="0" alt="express_delivery" title='Express Delivery' className='bg-white p-2.5 rounded-md'
                                                                    />
                                                                    <div className='text-sm font-normal'>
                                                                        <h6 className='font-bold text-base'>{params?.lang == "ar" ? "احصل عليه في غضون 24 الى 48 ساعة" : "Get it in 24 to 48 hours"}</h6>
                                                                        <p className=''>
                                                                            {params.lang === 'ar'
                                                                                ? <>فقط <span className="text-[#219EBC] font-bold">{checkExp?.qty}</span> حبه متاحه للتوصيل السريع خلال 24 إلى 48 ساعة</>
                                                                                : <>Only <span className="text-[#219EBC] font-bold">{checkExp?.qty}</span> quantity is available in 24 to 48 hours express delivery</>
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className='flex items-center gap-x-4 px-2.5 py-1'>
                                                                <svg id="fi_10112476" height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                                                <div className='text-[0.65rem] font-normal'>
                                                                    <h6 className='font-semibold text-sm'>{params?.lang == "ar" ? "ومن المتوقع أن يتم التسليم في " : "Delivery is expected to take place on " + moment().add(1, 'days').format('DD MMM')} {moment().add(5, 'days').format('DD MMM')}</h6>
                                                                    <p>{params?.lang == "ar" ? `اطلب خلال ساعة و4 دقائق` : `Order in 1 h 4 m`}</p>
                                                                </div>
                                                            </div>
                                                        }
                                                        </>
                                                    {/* :null} */}
                                                </div>
                                        {pro?.gift?.length ?
                                            <div className="flex flex-col my-3">
                                                <div className="flex overflow-x-scroll hide-scroll-bar pb-1">
                                                    <div className="flex flex-nowrap items-center gap-x-4">
                                                        {pro?.gift?.map((giftData: any, i: number) => {
                                                            var checkExpGift = expressData[giftData?.id]
                                                            return (
                                                                <div className={`bg-[#EEF8FC] shadow-md rounded-md p-3 w-72`}>
                                                                    <div className="flex items-center gap-x-3">
                                                                        <Image
                                                                            src={giftData?.image ? giftData?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                                                            alt={giftData?.image ? params.lang == 'ar' ? giftData?.name_arabic : giftData?.name : ''}
                                                                            title={giftData?.image ? params.lang == 'ar' ? giftData?.name_arabic : giftData?.name : ''}
                                                                            height={65}
                                                                            width={65}
                                                                            loading='lazy'
                                                                            className="rounded-md"
                                                                        />
                                                                        <div className="w-full">
                                                                            {/* {checkExp != null ?
                                                                            <Image
                                                                                src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                                width="45" height="0" alt="express_delivery" title='Express Delivery'
                                                                            />
                                                                            : null} */}
                                                                            <h3 className={`text-[#004B7A] ${checkExp != null ? 'mt-1' : 'mt-3'} text-xs text-left rtl:text-right line-clamp-2`}>{params.lang == 'ar' ? giftData?.name_arabic : giftData?.name}</h3>
                                                                            <div className="flex items-center justify-between mt-1 font-bold text-xs">
                                                                                <h6 className="text-[#EA4335] flex items-center gap-1">{giftData?.discounted_amount?.toLocaleString('EN-US')}{'  '}{currencySymbol}</h6>
                                                                                <h6>{params.lang == 'ar' ? "كمية" : "Qty"} {giftData?.quantity}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr className='my-2 opacity-5' />
                                                                    {checkExpGift && checkExpGift?.qty >= giftData?.quantity ?
                                                                        <>
                                                                            <div className='flex items-center gap-x-4 mx-2 mt-2 bg-[#fde18d] rounded-md p-2 w-[-webkit-fit-content]'>
                                                                                <Image
                                                                                    src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                                    width="65" height="0" alt="express_delivery" title='Express Delivery' className='bg-white p-2.5 rounded-md'
                                                                                />
                                                                                <div className='text-sm font-normal'>
                                                                                    <h6 className='font-bold text-base'>{params?.lang == "ar" ? "احصل عليه في غضون 24 الى 48 ساعة" : "Get it in 24 to 48 hours"}</h6>
                                                                                    <p className=''>
                                                                                        {params.lang === 'ar'
                                                                                            ? <>فقط <span className="text-[#219EBC] font-bold">{checkExpGift?.qty}</span> حبه متاحه للتوصيل السريع خلال 24 إلى 48 ساعة</>
                                                                                            : <>Only <span className="text-[#219EBC] font-bold">{checkExpGift?.qty}</span> quantity is available in 24 to 48 hours express delivery</>
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <div className='flex items-center gap-x-4 px-2.5 py-1'>
                                                                            <svg id="fi_10112476" height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                                                            <div className='text-[0.65rem] font-normal'>
                                                                                <h6 className='font-semibold text-sm'>{params?.lang == "ar" ? "ومن المتوقع أن يتم التسليم في " : "Delivery is expected to take place on " + moment().add(1, 'days').format('DD MMM')} {moment().add(5, 'days').format('DD MMM')}</h6>
                                                                                <p>{params?.lang == "ar" ? `اطلب خلال ساعة و4 دقائق` : `Order in 1 h 4 m`}</p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>
                                            </div >
                                        : null}
                                        {pro?.fbt?.length ?
                                            <>
                                            {pro?.fbt?.map((giftData: any, g: number) => {
                                                var checkExpFbt = expressData[giftData?.id]
                                                return (
                                                <div className="bg-white shadow-md rounded-md relative py-2 mb-3">
                                                    <div className="grid grid-cols-6 gap-2">
                                                        <div className="col-span-1">
                                                            <Image
                                                                src={giftData?.image}
                                                                alt={params.lang == 'ar' ? giftData?.name_arabic : giftData?.name}
                                                                title={params.lang == 'ar' ? giftData?.name_arabic : giftData?.name}
                                                                height={80}
                                                                width={80}
                                                                loading='lazy'
                                                                className="rounded-md mx-auto"
                                                            />
                                                        </div>
                                                        <div className="px-2 col-span-5">
                                                            <hr className='my-2 opacity-5' />
                                                            {checkExpFbt && checkExpFbt?.qty >= giftData?.quantity ?
                                                                <>
                                                                    <div className='flex items-center gap-x-4 mx-2 mt-2 bg-[#fde18d] rounded-md p-2 w-[-webkit-fit-content]'>
                                                                        <Image
                                                                            src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                            width="65" height="0" alt="express_delivery" title='Express Delivery' className='bg-white p-2.5 rounded-md'
                                                                        />
                                                                        <div className='text-sm font-normal'>
                                                                            <h6 className='font-bold text-base'>{params?.lang == "ar" ? "احصل عليه في غضون 24 الى 48 ساعة" : "Get it in 24 to 48 hours"}</h6>
                                                                            <p className=''>
                                                                                {params.lang === 'ar'
                                                                                    ? <>فقط <span className="text-[#219EBC] font-bold">{checkExpFbt?.qty}</span> حبه متاحه للتوصيل السريع خلال 24 إلى 48 ساعة</>
                                                                                    : <>Only <span className="text-[#219EBC] font-bold">{checkExpFbt?.qty}</span> quantity is available in 24 to 48 hours express delivery</>
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <div className='flex items-center gap-x-4 px-2.5 py-1'>
                                                                    <svg id="fi_10112476" height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                                                    <div className='text-[0.65rem] font-normal'>
                                                                        <h6 className='font-semibold text-sm'>{params?.lang == "ar" ? "ومن المتوقع أن يتم التسليم في " : "Delivery is expected to take place on " + moment().add(1, 'days').format('DD MMM')} {moment().add(5, 'days').format('DD MMM')}</h6>
                                                                        <p>{params?.lang == "ar" ? `اطلب خلال ساعة و4 دقائق` : `Order in 1 h 4 m`}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <h4 className="text-primary text-sm line-clamp-2">{params.lang == 'ar' ? giftData?.name_arabic : giftData?.name} </h4>
                                                            <div className="flex items-center justify-between mt-4 gap-x-3">
                                                                <h2 className="text-lg  font-semibold text-dark flex gap-1">
                                                                    <div className='flex gap-1 items-center'>
                                                                        {giftData?.discounted_amount?.toLocaleString('EN-US')}
                                                                    </div>
                                                                    {giftData?.regular_price > giftData?.discounted_amount ?
                                                                        <span className="text-sm text-[#DC4E4E] line-through decoration-[#DC4E4E] decoration-2 font-medium">
                                                                            {giftData?.regular_price?.toLocaleString('EN-US')}
                                                                        </span>
                                                                        : null}
                                                                    {currencySymbol}
                                                                </h2>
                                                                {/* <p className="text-[#5D686F] text-sm flex items-center gap-x-2"> */}
                                                                    {/* {params.lang == 'ar' ? 'العلامة' : 'Brand'}: */}
                                                                    {/* {pro?.brand?.brand_media_image ?
                                                                        <Image
                                                                            src={pro?.brand?.brand_media_image ? NewMedia + pro?.brand?.brand_media_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                                                            alt={params.lang == 'ar' ? pro?.brand?.name_arabic : pro?.brand?.name}
                                                                            title={params.lang == 'ar' ? pro?.brand?.name_arabic : pro?.brand?.name}
                                                                            height={65}
                                                                            width={65}
                                                                            className="h-full"
                                                                            loading='lazy'
                                                                        />
                                                                        :
                                                                        <p>{params.lang == 'ar' ? pro?.brand?.name_arabic : pro?.brand?.name}</p>
                                                                    } */}
                                                                {/* </p> */}
                                                                {/* <div className="text-xs text-[#20831E]  font-semibold mt-1">
                                                                    {params.lang == 'ar' ? Math.round(((pro?.regular_price - pro?.price) * 100) / pro?.regular_price) + 'خصم %' : Math.round(((pro?.regular_price - pro?.price) * 100) / pro?.regular_price) + '% OFF'}
                                                                </div> */}
                                                            </div>
                                                            {/* <p className="text-[#5D686F] text-xs">{params.lang == 'ar' ? 'قسط شهري يبدا من ' + (pro?.price / 36).toLocaleString('EN-US') + ' ريال' : 'Monthly installment starts from SR ' + (pro?.price / 36).toLocaleString('EN-US')}</p> */}
                                                            {!giftData?.bogo ?
                                                                <div className="mt-4 flex items-center justify-between">
                                                                    <div className="flex items-center gap-x-4">
                                                                        <button className="focus-visible:outline-none btn fill-[#004B7A] font-medium"
                                                                            onClick={() => {

                                                                                if (ProWishlistData.filter((item: any) => item == giftData?.id).length >= 1) {
                                                                                    RemoveWishlistProduct(i, giftData?.id)
                                                                                } else {
                                                                                    WishlistProduct(i, giftData?.id)
                                                                                }

                                                                            }}
                                                                        >
                                                                            {ProWishlistData.filter((item: any) => item == giftData?.id).length >= 1 ?
                                                                                <svg id="fi_4240564" enableBackground="new 0 0 512 512" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m256 469.878c-86.27-49.763-253.779-170.182-255.971-290.334-2.395-131.178 145.05-190.67 255.971-77.883 110.905-112.771 258.343-53.318 255.971 77.86-2.171 120.16-169.697 240.59-255.971 290.357z" fillRule="evenodd"></path></svg>
                                                                                :
                                                                                <svg id="fi_3870922" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m489.864 101.1a130.755 130.755 0 0 0 -60.164-50.89c-28.112-11.8-59.687-13.924-91.309-6.127-28.978 7.146-57.204 22.645-82.391 45.129-25.189-22.486-53.418-37.986-82.4-45.131-31.623-7.8-63.2-5.674-91.312 6.134a130.755 130.755 0 0 0 -60.161 50.9c-15.02 23.744-22.661 52.619-22.097 83.5 2.504 137.285 207.006 262.122 247.976 285.755a16 16 0 0 0 15.989 0c40.974-23.636 245.494-148.495 247.976-285.779.558-30.879-7.086-59.751-22.107-83.491zm-9.887 82.916c-.8 44.388-30.39 96.139-85.563 149.655-51.095 49.558-109.214 86.912-138.414 104.293-29.2-17.378-87.31-54.727-138.4-104.287-55.176-53.512-84.766-105.259-85.576-149.646-.884-48.467 22.539-87.462 62.656-104.313a106.644 106.644 0 0 1 41.511-8.238c36.795 0 75.717 17.812 108.4 51.046a16 16 0 0 0 22.815 0c45.406-46.17 102.85-62.573 149.9-42.811 40.121 16.845 63.547 55.834 62.671 104.298z"></path></svg>
                                                                            }
                                                                        </button>
                                                                        <button className="focus-visible:outline-none btn fill-[#EB5757] font-medium" onClick={() => removeItemFbt(i,g)}>
                                                                            <svg height="24" viewBox="-40 0 427 427.00131" width="24" xmlns="http://www.w3.org/2000/svg" id="fi_1214428"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"></path><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button
                                                                            onClick={() => setQuantityBox(quantityBox == giftData?.id ? false : giftData?.id)}
                                                                            className="focus-visible:outline-none border rounded-md p-2 h-auto w-20 border-[#004B7A] text-[#004B7A] fill-[#004B7A]  font-semibold text-base bg-[#5D686F05] flex items-center justify-between"
                                                                        >
                                                                            {giftData.quantity}
                                                                            <div className="flex items-center gap-x-1.5">
                                                                                <div className="border-l h-5 opacity-40"></div>
                                                                                <svg height="18" viewBox="0 0 32 32" width="18" className={`transform ease-out duration-150 ${quantityBox == giftData?.id ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" id="fi_9126125"><path clipRule="evenodd" d="m4.93934 10.9393c.58579-.5857 1.53553-.5857 2.12132 0l8.93934 8.9394 8.9393-8.9394c.5858-.5857 1.5356-.5857 2.1214 0 .5857.5858.5857 1.5356 0 2.1214l-10 10c-.5858.5857-1.5356.5857-2.1214 0l-9.99996-10c-.58579-.5858-.58579-1.5356 0-2.1214z" fillRule="evenodd"></path></svg>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                : null}
                                                        </div>
                                                    </div>
                                                    {quantityBox == giftData?.id ?
                                                    <div className="flex flex-col mt-3 px-2">
                                                        <div className="flex overflow-x-scroll hide-scroll-bar pb-1">
                                                            <div className="flex flex-nowrap items-center">
                                                                <div className="text-[#5D686F] flex gap-x-2">
                                                                    {[...Array(giftData?.total_quantity >= pro?.quantity ? pro?.quantity : giftData?.total_quantity)].map((_, e) => (
                                                                        <button className={`focus-visible:outline-none border rounded-md p-2 w-12 ${i === 1 ? 'border-[#004B7A]' : 'border-[#5D686F]'} text-sm`}
                                                                            onClick={() => {
                                                                                updateCartFbtQty(e + 1, i, g)
                                                                                setQuantityBox(false)
                                                                            }}>{e + 1}</button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}
                                                </div>
                                                )
                                            })}
                                            </>    
                                        : null}
                                    </>
                                )
                                //}
                            })
                            }
                        </div>
                        <div className="md:w-1/2 w-full max-md:pb-32">
                            <h3 className='text-base mb-1 md:text-lg font-bold md:mb-3'>{params.lang == 'ar' ? 'تفاصيل الطلب الخاص بك' : 'Cart Summary'}</h3>
                            <div className="bg-white rounded-md shadow-md p-3">
                                {summary?.map((s: any, i: number) => {
                                    if (s?.key == 'total') {
                                        return (
                                            <>
                                                <hr className="opacity-10 mb-6" />
                                                <div className="flex items-center justify-between mb-1 text-lg font-bold">
                                                    <h6 className="text-[#1C262D] capitalize">{params.lang === 'ar' ? s.title_arabic : s.title}</h6>
                                                    <span className="text-[#004B7A] flex items-center gap-1">{params.lang == 'ar' ? s?.price?.toLocaleString('EN-US') : s?.price?.toLocaleString('EN-US')}{currencySymbol}</span>
                                                </div>
                                            </>
                                        )
                                    }
                                    return (
                                        <div className="flex items-center justify-between text-sm font-medium mb-3" key={i}>
                                            <h6 className={`text-[#1C262D] capitalize`}>{params.lang === 'ar' ? s?.title_arabic : s?.title}</h6>
                                            <span className={`flex gap-1 items-center ${s.key == 'save' || s?.key == 'discountRule' || s?.key == 'discountCoupon' ? 'text-[#20831E]' : 'text-[#004B7A]'}`}><span className="font-bold flex items-center gap-1">{s?.price?.toLocaleString('EN-US')}</span>{' '}{currencySymbol}</span>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                    : null}
            </div>

            <Transition appear show={showExpPopup} as={Fragment}>
                <Dialog as="div" open={showExpPopup} onClose={() => setshowExpPopup(false)}>
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
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-md my-8 text-black bg-white">
                                    <div className="flex bg-white items-center justify-between px-5 pt-4">
                                        <h5 className='text-base font-[600] flex items-center gap-x-2 text-[#004B7A] fill-[#004B7A]'>
                                            {params.lang == 'ar' ? 'Express Delivery' : 'Express Delivery'}
                                        </h5>
                                        <button type="button" className="focus-visible:outline-none text-dark hover:text-dark fill-dark" onClick={() => setshowExpPopup(false)}>
                                            <svg height="16" viewBox="0 0 329.26933 329" width="16" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                        </button>
                                    </div>
                                    <hr className='my-2 opacity-5' />
                                    <div className="p-5">
                                        <div className="mx-auto w-full text-center">
                                            {params?.lang == 'ar' ? `Congratulations! You're eligible for express delivery within 24 hours to 48 hours delivery` : `Congratulations! You're eligible for express delivery within 24 hours to 48 hours delivery`}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>


            {cartCount > 0 ?
                <div className="fixed bottom-[4rem] w-full p-3 bg-white shadow-md border-t border-[#5D686F26] pb-14">
                    <button
                        type="button"
                        onClick={() => getCheckout()}
                        className="focus-visible:outline-none bg-[#004B7A] border border-[#004B7A] hover:bg-[#00446f] hover:border-[#00446f] text-white w-full rounded-md p-3.5 text-base font-bold flex items-center justify-center">
                        {params.lang == 'ar' ? 'اكمال شراء الطلب' : 'Proceed to Checkout'}
                    </button>
                </div>
                : null}
            {/* Commented Pickup Store */}
            <PickupStorePopup lang={params?.lang} allStores={allStores} setModal={() => setIsOpenModal(false)} isOpenModal={isOpenModal} direction={direction} isArabic={params?.lang == 'ar' ? true : false} />
            
            {relatedproducts?.length >= 1 ?
                <div className='mb-4 container'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-[24px] font-[600]'>{params.lang == 'ar' ? 'العروض الحالية' : 'This is English'}</h3>
                        <Link href="#" className='text-[#219EBC] hover:underline'>{params.lang == 'ar' ? 'عـرض الكــل' : 'Show all'}</Link>
                    </div>
                    <div className='mt-4 pb-2'>
                        <ProductSlider lang={params.lang} dict={dict.products} />
                    </div>
                </div>
                : null
            }
        </>
    )
}