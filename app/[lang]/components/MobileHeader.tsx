'use client'

import Link from 'next/link'
import Image from 'next/image'
import { get } from '../api/ApiCalls'
import { RWebShare } from "react-web-share"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Dialog, Transition, RadioGroup, Tab } from '@headlessui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import GlobalContext from '../GlobalContext'

declare global {
    interface WindowEventMap {
        cartDataChanged: CustomEvent;
    }
}

export default function MobileHeader(props: any) {
    const router = useRouter()
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const [location, setLocation] = useState()
    const [selected, setSelected] = useState<any>('')
    const [selectedCity, setSelectedCity] = useState<any>('')
    const [useraddress, setuseraddress] = useState<any>('')
    const [cityList, setCityList] = useState<boolean>(false)
    const [cityData, setCityData] = useState<any>([])
    const [menuData, setMenuData] = useState<any>([])
    const [appDrawer, setAppDrawer] = useState<boolean>(false)
    const [subCategoriesDrop, setSubCategoriesDrop] = useState<boolean>(false)
    const [citySearch, setCitySearch] = useState<any>('')
    const [notificationsCount, setNotificationsCount] = useState<any>(false)
    const [subCategory, setSubCategory] = useState<any>(false)
    const [parentCategory, setParentCategory] = useState<any>(false)
    const [selectedCityData, setselectedCityData] = useState<any>({})
    const [citiesData, setcitiesData] = useState<any>([])

    const { globalCity, setglobalCity } = useContext<any>(GlobalContext);
    const { updateUser, setUpdateUser } = useContext(GlobalContext);
    const { updateCart, setUpdateCart } = useContext(GlobalContext);
    const { updateOrder, setUpdateOrder } = useContext(GlobalContext);
    const { updateWishlist, setUpdateWishlist } = useContext(GlobalContext);
    const { updateCompare, setUpdateCompare } = useContext(GlobalContext);
    const isArabic = props?.lang === 'ar';

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cartData') {
                setUpdateCart((prev: any) => prev == 0 ? 1 : 0);
            }
        };

        const handleCustomCartChange = (e: CustomEvent) => {
            setUpdateCart((prev: any) => prev == 0 ? 1 : 0);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('cartDataChanged', handleCustomCartChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cartDataChanged', handleCustomCartChange);
        };
    }, []);

    useEffect(() => {
        if(localStorage.getItem('langauge') && props?.lang != localStorage.getItem('langauge')){
            router.push(`/${localStorage.getItem('langauge')}`)
            router.refresh()
        }
        if(!localStorage.getItem("globalcity")) {
            setTimeout(function () {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('/firebase-messaging-sw.js');
                }
                if (localStorage.getItem("default_address") != 'yes') {
                    var live = localStorage.getItem('live_location')
                    if (live != 'false') {
                        if ('geolocation' in navigator) {
                            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
                            navigator.geolocation.getCurrentPosition(({ coords }) => {
                                setLatitude(coords.latitude)
                                setLongitude(coords.longitude)
                                const latitude = coords.latitude;
                                const longitude = coords.longitude;
                                // if (!localStorage.getItem("globalcity"))
                                fetchApiData({ latitude, longitude })
                            })
                        }
                    }
                }
            }, 5000)
        }
        // DataLocalStorage()
        // const intervalID = setInterval(() => {
        //     if (localStorage.getItem("userid"))
        //         getUserData()
        // }, 1000);
        // // if ('geolocation' in navigator) {
        // //     // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        // //     navigator.geolocation.getCurrentPosition(({ coords }) => {
        // //         setLatitude(coords.latitude)
        // //         setLongitude(coords.longitude)
        // //         const latitude = coords.latitude;
        // //         const longitude = coords.longitude;
        // //         if (!localStorage.getItem("globalcity"))
        // //             fetchApiData({ latitude, longitude })
        // //     })
        // // }
        // if (!localStorage.getItem("globalcity")) {
        //     localStorage.setItem("globalcity", "Jeddah")
        // }
        // const intervalID = setInterval(() => {
        //     if(localStorage.getItem("userid"))
        //         getUserData()
        // }, 1000);
        
        if(!localStorage?.getItem('globalcity')){
            var city = 'Jeddah'
            localStorage?.setItem('globalcity', city)
            // setglobalCity(city)
            setCityData(city)
            setselectedCityData(city)
        }
    }, [props]);

    const DataLocalStorage = async () => {
        if (cityData != localStorage.getItem("globalcity")) {
            var cdata: any = localStorage.getItem("globalcity");
            setCityData(cdata)
            setselectedCityData(cdata)
            setuseraddress(localStorage.getItem("globaladdress"))
        }   
    }

    const fetchApiData = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=${props.lang}&sensor=true&key=AIzaSyB3ekz5eMwuRZGvFy2HUADZVhxAzTWV5Ok`);
        const data = await res?.json();
        for (var a = 0; a < data?.results[0]["address_components"]?.length; a++) {
            if (
                data?.results[0]["address_components"][a]?.types[0] ==
                "administrative_area_level_2" &&
                data?.results[0]["address_components"][a]?.types[1] == "political"
            ) {
                // setCityData(data?.results[0]["address_components"][a]["long_name"]);
                // localStorage.setItem('globaladdress', data?.results[0]["formatted_address"])
                // setuseraddress(data?.results[0]["formatted_address"])
                // localStorage.setItem("globalcity", data?.results[0]["address_components"][a]["long_name"].toString());
                // setSelected(data?.results[0]["address_components"][a]["long_name"].toString())
                // setSelectedCity(data?.results[0]["address_components"][a]["long_name"].toString())
                var city = data?.results[0]["address_components"][a]["long_name"]
                setCityData(city);
                localStorage.setItem("globalcity", city.toString());
                setglobalCity(city);
            }
        };
    };

    const getUserData = () => {
        // if(!localStorage.getItem('userCompare')){
        //     get(`getcompareproduct/${localStorage.getItem("userid")}`).then((responseJson: any) => {
        //         localStorage.setItem('userCompare', JSON.stringify(responseJson.comparedata))
        //         window.dispatchEvent( new Event('storage') )
        //     })
        // }
        
        if(!localStorage.getItem('userWishlist')){
            get(`getwishlistproduct/${localStorage.getItem("userid")}`).then((responseJson: any) => {
                localStorage.setItem('userWishlist', JSON.stringify(responseJson.wishlistdata))
                window.dispatchEvent( new Event('storage') )
            })
        }
    }

    useEffect(() => {
        DataLocalStorage()
        if (localStorage.getItem("userid"))
            getUserData()
    }, [updateUser, updateCart, updateOrder, updateWishlist, updateCompare])

    // useEffect(() => {
    //     setSelected(localStorage.getItem("globalcity"))
    //     setSelectedCity(localStorage.getItem("globalcity"))
    //     setuseraddress(localStorage.getItem("globaladdress"))
    //     // getCity()
    //     // getNotificationsCount()
    //     // getMenu()
    // }, [])

    const MySwal = withReactContent(Swal);
    const topMessageAlartDanger = (title: any) => {
        MySwal.fire({
            icon: "error",
            title:
                <div className="text-xs">
                    <div className="uppercase">{title}</div>
                </div>
            ,
            toast: true,
            position: props.lang == 'ar' ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 15000,
            showCloseButton: true,
            background: '#DC4E4E',
            color: '#FFFFFF',
            timerProgressBar: true,
        });
    };

    const getCitiesData = () => {
        get(`getcities/${props?.lang}`).then((responseJson: any) => {
            setcitiesData(responseJson?.cities)
        })
    }

    const updateCity = () => {
        var sCty: any = localStorage?.getItem('globalcity')
        if (!sCty) {
            sCty = 'Jeddah'
        }
        get(`only-city/${sCty}`).then((responseJson: any) => {
            if (responseJson?.cities) {
                var city = 'Jeddah'
                if (isArabic) {
                    city = responseJson?.cities?.name_arabic
                }
                if (isArabic == false) {
                    city = responseJson?.cities?.name
                }
                localStorage?.setItem('globalcity', city)
                setglobalCity(city)
                setCityData(city)
                setselectedCityData(city)
            }
        })
    }

    useEffect(() => {
        var live: any = localStorage.getItem('live_location')
        if (live == 'false') {
            updateCity()
        }
    }, props?.lang)

    const setupCity = () => {
        if (!selectedCityData) {
            topMessageAlartDanger(props?.lang == 'ar' ? 'خطأ! الرجاء اختيار المدينة' : 'Error! Please select city')
            return false
        }
        setCityData(selectedCityData)
        localStorage.setItem('globalcity', selectedCityData)
        var city = selectedCityData
        setglobalCity(selectedCityData)
        localStorage.setItem('live_location', 'false')
        router.refresh()
        setCityList(false)
    }

    // const getCity = () => {
    //     get('get-city-list').then((responseJson: any) => {
    //         setCityData(responseJson?.data)
    //     })
    // }

    // const getNotificationsCount = () => {
    //     get(`notifications`).then((responseJson: any) => {
    //         setNotificationsCount(responseJson?.data?.length)
    //     })
    // }

    const getMenu = () => {
        if(!menuData?.length){
            get(`menu`).then((responseJson: any) => {
                setMenuData(responseJson?.menu)
            })
        }
    }

    const menuRedirection = (slug: any) => {
        router.push(`/${props.lang}/category/${slug}`)
    }

    const filteredCities = citiesData.filter((city: { label: string }) =>
        city.label.toLowerCase().includes(citySearch.toLowerCase())
    );

    return (
        <>
            {props.type === 'Main' ?
                <>
                    {/* This is main top Bar */}
                    <div className="bg-white pt-3.5 pb-2 top-0 z-30 px-4 w-full">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-4'>
                                <button className="focus-visible:outline-none" onClick={() => {
                                    getMenu()
                                    setAppDrawer(true)
                                }}>
                                    <svg fill="none" height="28" viewBox="0 0 20 20" width="28" xmlns="http://www.w3.org/2000/svg" id="fi_6995971"><path clipRule="evenodd" d="m3 5c0-.26522.10536-.51957.29289-.70711.18754-.18753.44189-.29289.70711-.29289h12c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711s-.1054.51957-.2929.70711c-.1875.18753-.4419.29289-.7071.29289h-12c-.26522 0-.51957-.10536-.70711-.29289-.18753-.18754-.29289-.44189-.29289-.70711zm0 5c0-.26522.10536-.51957.29289-.70711.18754-.18753.44189-.29289.70711-.29289h6c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711 0 .2652-.1054.5196-.2929.7071s-.4419.2929-.7071.2929h-6c-.26522 0-.51957-.1054-.70711-.2929-.18753-.1875-.29289-.4419-.29289-.7071zm0 5c0-.2652.10536-.5196.29289-.7071.18754-.1875.44189-.2929.70711-.2929h12c.2652 0 .5196.1054.7071.2929s.2929.4419.2929.7071-.1054.5196-.2929.7071-.4419.2929-.7071.2929h-12c-.26522 0-.51957-.1054-.70711-.2929-.18753-.1875-.29289-.4419-.29289-.7071z" fill="rgb(0,0,0)" fillRule="evenodd"></path></svg>
                                </button>
                                <button className='text-sm font-semibold border py-1.5 px-2 rounded-md border-primary/30 text-primary flex items-center gap-3 outline-none hover:outline-none focus-visible:outline-none' onClick={() => {
                                    getCitiesData()
                                    setCityList(true)
                                }}>
                                    {cityData}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.0549 12.1573 16.0549 12.3704 15.8351Z" fill="#004B7A50" />
                                    </svg>
                                </button>
                            </div>
                            <Link href={`/${props?.lang}/notifications`} className="relative">
                                {notificationsCount > 0 ?
                                    <span className="badge absolute -right-1 -top-1 bg-danger rounded-full bg-[#219EBC] text-[10px] text-white h-4 w-4 border-white border-2"></span>
                                    : null}
                                <svg id="fi_4991422" enableBackground="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m455.7 351.22-29.75-30.31c-4.16-4.23-6.45-9.83-6.45-15.76v-91.65c0-73.98-49.39-136.63-116.93-156.73.61-3.04.93-6.15.93-9.27 0-26.19-21.31-47.5-47.5-47.5s-47.5 21.31-47.5 47.5c0 3.15.31 6.25.9 9.28-67.52 20.11-116.9 82.75-116.9 156.72v91.65c0 5.93-2.29 11.53-6.45 15.76l-29.75 30.31c-16.52 16.82-21.12 40.78-11.99 62.53 9.12 21.74 29.44 35.25 53.02 35.25h87.69c4.22 35.43 34.43 63 70.98 63s66.76-27.57 70.98-63h87.69c23.58 0 43.9-13.51 53.02-35.25 9.13-21.75 4.53-45.71-11.99-62.53zm-212.2-303.72c0-6.89 5.61-12.5 12.5-12.5s12.5 5.61 12.5 12.5c0 1.08-.14 2.05-.36 2.95-4.01-.29-8.06-.45-12.14-.45s-8.13.16-12.14.45c-.22-.89-.36-1.87-.36-2.95zm12.5 429.5c-17.2 0-31.65-11.96-35.49-28h70.98c-3.84 16.04-18.29 28-35.49 28zm179.42-76.79c-1.36 3.24-6.87 13.79-20.75 13.79h-317.34c-13.88 0-19.39-10.56-20.75-13.79-1.36-3.24-5.03-14.56 4.69-24.47l29.76-30.31c10.62-10.82 16.47-25.12 16.47-40.28v-91.65c0-70.85 57.64-128.5 128.5-128.5s128.5 57.65 128.5 128.5v91.65c0 15.16 5.85 29.46 16.47 40.28l29.76 30.31c9.72 9.9 6.05 21.23 4.69 24.47z"></path></svg>
                            </Link>
                        </div>
                        <button className="focus-visible:outline-none border rounded-full p-2.5 flex items-center gap-x-3 border-[#9CA4AB50] bg-[#ECF1F6] mt-3.5 w-full" onClick={props.onClick}>
                            <svg id="fi_3287968" enableBackground="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-[#9CA4AB50]"><path clipRule="evenodd" d="m217.257.879c-119.988 0-217.257 97.269-217.257 217.257s97.269 217.257 217.257 217.257 217.257-97.269 217.257-217.257-97.269-217.257-217.257-217.257zm285.789 500.901c-12.089 12.302-31.975 12.476-44.277.388l-86.843-85.334c16.521-12.879 31.39-27.774 44.247-44.314l86.485 84.983c12.302 12.088 12.477 31.974.388 44.277zm-285.789-440.411c86.58 0 156.766 70.187 156.766 156.766s-70.187 156.766-156.766 156.766c-86.58 0-156.766-70.187-156.766-156.766 0-86.579 70.187-156.766 156.766-156.766z" fillRule="evenodd"></path></svg>
                            <p className="text-[#9CA4AB50] text-sm">{props.lang === 'ar' ? "ابحث هنا" : "What are you looking for?"}</p>
                        </button>
                    </div>
                    {useraddress ?
                        <div className='pt-2'>
                            <div className="bg-white py-3 px-4 shadow-md">
                                <small className="line-clamp-1 w-92 font-bold"><span className="font-normal">{props.lang === 'ar' ? 'توصيل إلى' : 'Deliver to'}</span>: {useraddress}</small>
                            </div>
                        </div>
                        : null}
                </>
                :
                props.type === "Secondary" ?
                    <>
                        {/* This is seconday topbar */}
                        <div className="focus-visible:outline-none bg-white shadow-md py-3.5 fixed top-0 z-30 w-full px-2 flex items-center justify-between">
                            <button className="w-16" onClick={() => {
                                // if (props?.notifications?.length) {
                                //     router.push(`/${props.lang}`)
                                // } else {
                                //     router.back()
                                // }
                                router.push(`/${props.lang}`)
                            }}>
                                <svg height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" id="fi_2722991" className={props.lang === 'ar' ? 'rotate-180' : ''}><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                            </button>
                            <h1 className="text-base font-bold line-clamp-1">{props.pageTitle}</h1>
                            <button className="focus-visible:outline-none fill-[#004B7A] text-[#004B7A]  font-semibold flex items-center gap-x-1.5" onClick={props.onClick}>
                                <svg id="fi_3839020" enableBackground="new 0 0 512 512" height="18" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg" className={props.lang === 'ar' ? '-rotate-90' : 'rotate-90'}><path d="m16 90.259h243.605c7.342 33.419 37.186 58.508 72.778 58.508s65.436-25.088 72.778-58.508h90.839c8.836 0 16-7.164 16-16s-7.164-16-16-16h-90.847c-7.356-33.402-37.241-58.507-72.77-58.507-35.548 0-65.419 25.101-72.772 58.507h-243.611c-8.836 0-16 7.164-16 16s7.164 16 16 16zm273.877-15.958c0-.057.001-.115.001-.172.07-23.367 19.137-42.376 42.505-42.376 23.335 0 42.403 18.983 42.504 42.339l.003.235c-.037 23.407-19.091 42.441-42.507 42.441-23.406 0-42.454-19.015-42.507-42.408zm206.123 347.439h-90.847c-7.357-33.401-37.241-58.507-72.77-58.507-35.548 0-65.419 25.102-72.772 58.507h-243.611c-8.836 0-16 7.163-16 16s7.164 16 16 16h243.605c7.342 33.419 37.186 58.508 72.778 58.508s65.436-25.089 72.778-58.508h90.839c8.836 0 16-7.163 16-16s-7.164-16-16-16zm-163.617 58.508c-23.406 0-42.454-19.015-42.507-42.408l.001-.058c0-.058.001-.115.001-.172.07-23.367 19.137-42.377 42.505-42.377 23.335 0 42.403 18.983 42.504 42.338l.003.235c-.034 23.41-19.089 42.442-42.507 42.442zm163.617-240.248h-243.605c-7.342-33.419-37.186-58.507-72.778-58.507s-65.436 25.088-72.778 58.507h-90.839c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16h90.847c7.357 33.401 37.241 58.507 72.77 58.507 35.548 0 65.419-25.102 72.772-58.507h243.611c8.836 0 16-7.163 16-16 0-8.836-7.164-16-16-16zm-273.877 15.958c0 .058-.001.115-.001.172-.07 23.367-19.137 42.376-42.505 42.376-23.335 0-42.403-18.983-42.504-42.338l-.003-.234c.035-23.41 19.09-42.441 42.507-42.441 23.406 0 42.454 19.014 42.507 42.408z"></path></svg>
                                <p className="">{props.lang === 'ar' ? "فلتر" : "Filter"}</p>
                            </button>
                        </div>
                    </>
                    :
                    props.type === "Third" ?
                        <>
                            {/* This is third topbar */}
                            <div className="bg-white shadow-md py-3.5 fixed top-0 z-20 w-full px-2 flex items-center">
                                <button className="focus-visible:outline-none w-16" onClick={() => {
                                    if (props.redirect) {
                                        router.push(`/${props.lang}/${props.redirect}`)
                                        router.refresh()
                                    }
                                    else {
                                        router.back()
                                    }
                                }}>
                                    <svg height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" id="fi_2722991" className={props.lang === 'ar' ? 'rotate-180' : ''}><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                                </button>
                                <h1 className="text-lg font-bold line-clamp-1 text-center w-64">{props.pageTitle}</h1>
                            </div>
                        </>
                        :
                        props.type === 'Product' ?
                            <>
                                <div className="bg-white shadow-md py-3.5 fixed top-0 z-30 w-full px-2 flex items-center justify-between">
                                    <button className="focus-visible:outline-none w-16" onClick={(e) => {
                                        if (props?.notifications?.length) {
                                            router.push(`/${props.lang}`)
                                        } else {
                                            router.back()
                                        }
                                    }}>
                                        <svg height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" id="fi_2722991" className={props.lang === 'ar' ? 'rotate-180' : ''}><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                                    </button>
                                    <RWebShare
                                        data={{
                                            title: props.title,
                                            text: props.text,
                                            url: props.url,
                                        }}
                                    >
                                        <button className="fill-[#004B7A]focus-visible:outline-none  text-[#004B7A]  font-semibold flex items-center gap-x-1.5" onClick={props.onClick}>
                                            <svg height="18" viewBox="-33 0 512 512.00102" width="18" xmlns="http://www.w3.org/2000/svg" id="fi_1358023"><path d="m361.824219 344.394531c-24.53125 0-46.632813 10.59375-61.972657 27.445313l-137.972656-85.453125c3.683594-9.429688 5.726563-19.671875 5.726563-30.386719 0-10.71875-2.042969-20.960938-5.726563-30.386719l137.972656-85.457031c15.339844 16.851562 37.441407 27.449219 61.972657 27.449219 46.210937 0 83.804687-37.59375 83.804687-83.804688 0-46.210937-37.59375-83.800781-83.804687-83.800781-46.210938 0-83.804688 37.59375-83.804688 83.804688 0 10.714843 2.046875 20.957031 5.726563 30.386718l-137.96875 85.453125c-15.339844-16.851562-37.441406-27.449219-61.972656-27.449219-46.210938 0-83.804688 37.597657-83.804688 83.804688 0 46.210938 37.59375 83.804688 83.804688 83.804688 24.53125 0 46.632812-10.59375 61.972656-27.449219l137.96875 85.453125c-3.679688 9.429687-5.726563 19.671875-5.726563 30.390625 0 46.207031 37.59375 83.800781 83.804688 83.800781 46.210937 0 83.804687-37.59375 83.804687-83.800781 0-46.210938-37.59375-83.804688-83.804687-83.804688zm-53.246094-260.589843c0-29.359376 23.886719-53.246094 53.246094-53.246094s53.246093 23.886718 53.246093 53.246094c0 29.359374-23.886718 53.246093-53.246093 53.246093s-53.246094-23.886719-53.246094-53.246093zm-224.773437 225.441406c-29.363282 0-53.25-23.886719-53.25-53.246094s23.886718-53.246094 53.25-53.246094c29.359374 0 53.242187 23.886719 53.242187 53.246094s-23.882813 53.246094-53.242187 53.246094zm224.773437 118.949218c0-29.359374 23.886719-53.246093 53.246094-53.246093s53.246093 23.886719 53.246093 53.246093c0 29.359376-23.886718 53.246094-53.246093 53.246094s-53.246094-23.886718-53.246094-53.246094zm0 0"></path></svg>
                                            <p className="">{props.lang === 'ar' ? "شارك" : "Share"}</p>
                                        </button>
                                    </RWebShare>
                                </div>
                            </>
                            : null
            }
            <Transition appear show={cityList} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setCityList(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom={props.lang === 'ar' ? "-translate-y-full" : "translate-y-full"}  // Start from bottom for 'ar', top for others
                        enterTo="translate-y-0"  // Transition to center
                    >
                        <div className="fixed inset-0 overflow-y-auto">
                            <Dialog.Panel className="w-full h-[-webkit-fill-available] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between py-3.5 px-4 bg-[#219EBC60]">
                                    <Dialog.Title
                                        as="h4"
                                        className="text-lg font-bold leading-6 text-gray-900"
                                    >
                                        {props.lang == 'ar' ? "اختر مدينة" : "Select City"}
                                    </Dialog.Title>
                                    <button onClick={() => setCityList(false)} className="focus-visible:outline-none">
                                        <svg height="16" viewBox="0 0 329.26933 329" width="16" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                    </button>
                                </div>
                                <div className="pb-4">
                                    <Tab.Group>
                                        <Tab.List className="flex border-b border-[#474B5230] bg-[#219EBC60]">
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`${selected ? '!border-primary text-primary !outline-none' : ''
                                                            } flex items-center justify-center border-b-2 text-base border-transparent bg-transparent py-3 before:inline-block hover:border-primary hover:text-primary font-bold w-full`}
                                                    >
                                                        {props?.lang == 'ar' ? 'التوصيل' : 'Deliver here'}
                                                    </button>
                                                )}
                                            </Tab>
                                            {/* <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`${selected ? '!border-primary text-primary !outline-none' : ''
                                                            } flex items-center justify-center border-b-2 text-base border-transparent bg-transparent py-3 before:inline-block hover:border-primary hover:text-primary font-bold w-1/2`}
                                                    >
                                                        Store Pickup
                                                    </button>
                                                )}
                                            </Tab> */}
                                        </Tab.List>
                                        <Tab.Panels>
                                            <Tab.Panel>
                                                <div className="p-4 pb-0">
                                                    <div className="border rounded px-2 flex items-center border-[#004B7A] focus::border-[#000] h-10 gap-2 relative z-20 bg-white">
                                                        <input id="productSearch" type="text" name="shipping-charge" className="form-input focus-visible:outline-none focus:ring-transparent text-sm h-9 border-none w-full"
                                                            placeholder={props.lang === 'ar' ? 'مدينة البحث' : 'Search City'}
                                                            value={citySearch}
                                                            onChange={(e: any) => {
                                                                setCitySearch(e.target.value)
                                                            }}
                                                        />
                                                        {citySearch.length >= 1 && (
                                                            <button
                                                                className="focus-visible:outline-none underline text-xs text-[#DC4E4E] font-semibold"
                                                                onClick={() => {
                                                                    setCitySearch(''); // Clear the search input
                                                                }}
                                                            >
                                                                {props.lang === 'ar' ? 'مسح' : 'Clear'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="overflow-y-auto h-[543px] pb-56 px-4 ios-scroll">
                                                    <RadioGroup value={selectedCityData} onChange={(e) => {
                                                        setselectedCityData(e)
                                                    }}>
                                                        <div className="space-y-3 mt-4 px-4">
                                                            {filteredCities?.map((data: any, i: any) => {
                                                                return (
                                                                <RadioGroup.Option
                                                                    key={data?.value}
                                                                    value={data.label}
                                                                    className={({ active, checked }) => `relative cursor-pointer focus:outline-none`}
                                                                >
                                                                    {({ active, checked }) => (
                                                                        <>
                                                                            <div className={`flex w-full items-center justify-between pb-3 ${i + 1 === citiesData.length ? '' : 'border-b border-[#9CA4AB50]'}`}>
                                                                                <label className={`font-normal text-sm ${checked ? 'text-[#219EBC]' : 'text-[#000000]'}`}>{data.label}</label>
                                                                                {checked ?
                                                                                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
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
                                                                                    <svg viewBox="0 0 24 24" fill="#219EBC60" className="h-6 w-6">
                                                                                        <circle cx={12} cy={12} r={12} fill="#219EBC60" opacity={0.2} />
                                                                                    </svg>
                                                                                }
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </RadioGroup.Option>
                                                            )})}
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                <div className="fixed z-20 bottom-16 w-full px-4 py-3 bg-white shadow-md border-t border-[#5D686F26]">
                                                    <button onClick={() => {
                                                        setupCity()
                                                    }} className="focus-visible:outline-none btn border border-[#004B7A] bg-[#004B7A] p-2.5 rounded-md w-full text-white fill-white font-medium">
                                                        {props.lang === 'ar' ? 'تغيير المدينة' : 'Change City'}
                                                    </button>
                                                </div>
                                            </Tab.Panel>
                                            {/* <Tab.Panel>
                                                <div className="panel rounded-t-none">
                                                    <div className='px-4'>
                                                        <h5 className='font-semibold text-sm my-3 line-clamp-1'>Selected Store: <span className='text-[#219EBC] font-bold uppercase'>Jeddah - Al Safa Dist</span></h5>
                                                        <div className="border rounded flex items-center border-[#004B7A] focus::border-[#000] h-9 gap-2 relative z-20 bg-white mt-3">
                                                            <input id="productSearch" type="text" name="shipping-charge" className="form-input focus-visible:outline-none focus:ring-transparent text-xs h-6 border-none w-full"
                                                                value={citySearch}
                                                                onChange={(e) => setCitySearch(e.target.value)}
                                                                placeholder={'Search Store'}
                                                            />
                                                        </div>
                                                        <hr className='opacity-10' />
                                                        <h5 className='font-semibold text-sm my-3 line-clamp-1'><span className='text-[#219EBC] font-bold uppercase'>50</span> Stores have availablity</h5>
                                                        <div className='overflow-y-auto h-[543px]'>
                                                            <div className="border border-[#20831E] rounded-md mt-2">
                                                                <div className='flex justify-between gap-4 items-center p-3'>
                                                                    <div className='flex gap-2'>
                                                                        <img src="https://cdn-icons-png.flaticon.com/512/726/726498.png" alt="warehouse" height='20' width='20' />
                                                                        <h6 className='text-xs font-semibold'>Jeddah - Old Airport</h6>
                                                                        <span className='border border-[#20831E] text-[#20831E] p-1 rounded text-[9px] font-semibold'>IN STOCK</span>
                                                                    </div>
                                                                    <h6 className='text-sm font-semibold text-[#004B7A]'>Select</h6>
                                                                </div>
                                                                <p className='text-xs px-3 mb-2.5'>Abdullah Sulaiman Street Old Airport Area, 1</p>
                                                                <Disclosure>
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Disclosure.Button className="tc__311mainDisclosureBtn">
                                                                                <div className='flex gap-x-1 justify-start items-center'>
                                                                                    <span className='bg-[#20831E] h-2 w-2 rounded-full'></span>
                                                                                    <p>Open</p>
                                                                                </div>
                                                                                <div className='flex gap-x-1.5 justify-start items-center'>
                                                                                    <p className='text-[#004B7A]'>Details</p>
                                                                                    <svg
                                                                                        height="14"
                                                                                        viewBox="0 0 24 24"
                                                                                        width="14"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className={`${open ? '-rotate-180' : ''} tc__311mainDisclosureBtnSvg`}
                                                                                    >
                                                                                        <path
                                                                                            clipRule="evenodd"
                                                                                            d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                                                                                            fillRule="evenodd"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="tc__311mainDisclosurePanel m-0">
                                                                                <div className='bg-[#EEF8FC] p-3'>
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 50 50">
                                                                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z"></path>
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Business hours</h6>
                                                                                            <p>Saturday to Thursday</p>
                                                                                            <p>09:00 am - 11:59 pm</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className='my-4 opcaity-5' />
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 50 50">
                                                                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z"></path>
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Evening Working Hours</h6>
                                                                                            <p>friday 04:30 pm - 11:59 pm</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className='my-4 opcaity-5' />
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                            />
                                                                                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Address</h6>
                                                                                            <p>Abdullah Sulaiman Street Old Airport Area, 1</p>
                                                                                            <a href="" className='text-[#004B7A] text-xs'>Get Direction</a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className='my-4 opcaity-5' />
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                            />
                                                                                            <path
                                                                                                d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                            />
                                                                                            <path
                                                                                                d="M16.1007 13.3589C16.1007 13.3589 15.0181 14.4353 12.0631 11.4971C9.10807 8.55886 10.1907 7.48242 10.1907 7.48242"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Contact the store</h6>
                                                                                            <p>Abdullah Sulaiman Street Old Airport Area, 1</p>
                                                                                            <a href="" className='text-[#004B7A] text-xs'>983629347</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            </div>
                                                            <div className="border border-[#20831E] rounded-md mt-2">
                                                                <div className='flex justify-between gap-4 items-center p-3'>
                                                                    <div className='flex gap-2'>
                                                                        <img src="https://cdn-icons-png.flaticon.com/512/726/726498.png" alt="warehouse" height='20' width='20' />
                                                                        <h6 className='text-xs font-semibold'>Jeddah - Old Airport</h6>
                                                                        <span className='border border-[#20831E] text-[#20831E] p-1 rounded text-[9px] font-semibold'>IN STOCK</span>
                                                                    </div>
                                                                    <div className='flex gap-x-1'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                                                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: 'normal' }}><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z" fill="#c8e6c9"></path><path d="M34.586,14.586l-13.57,13.586l-5.602,-5.586l-2.828,2.828l8.434,8.414l16.395,-16.414z" fill="#4caf50"></path></g></g>
                                                                        </svg>
                                                                        <h6 className='text-sm font-semibold text-[#20831E]'>Selected</h6>
                                                                    </div>
                                                                </div>
                                                                <p className='text-xs px-3 mb-2.5'>Abdullah Sulaiman Street Old Airport Area, 1</p>
                                                                <Disclosure>
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Disclosure.Button className="tc__311mainDisclosureBtn">
                                                                                <div className='flex gap-x-1 justify-start items-center'>
                                                                                    <span className='bg-[#20831E] h-2 w-2 rounded-full'></span>
                                                                                    <p>Open</p>
                                                                                </div>
                                                                                <div className='flex gap-x-1.5 justify-start items-center'>
                                                                                    <p className='text-[#004B7A]'>Details</p>
                                                                                    <svg
                                                                                        height="14"
                                                                                        viewBox="0 0 24 24"
                                                                                        width="14"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className={`${open ? '-rotate-180' : ''} tc__311mainDisclosureBtnSvg`}
                                                                                    >
                                                                                        <path
                                                                                            clipRule="evenodd"
                                                                                            d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                                                                                            fillRule="evenodd"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="tc__311mainDisclosurePanel m-0">
                                                                                <div className='bg-[#EEF8FC] p-3'>
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 50 50">
                                                                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z"></path>
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Business hours</h6>
                                                                                            <p>Saturday to Thursday</p>
                                                                                            <p>09:00 am - 11:59 pm</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className='my-4 opcaity-5' />
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 50 50">
                                                                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z"></path>
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Evening Working Hours</h6>
                                                                                            <p>friday 04:30 pm - 11:59 pm</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className='my-4 opcaity-5' />
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                            />
                                                                                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Address</h6>
                                                                                            <p>Abdullah Sulaiman Street Old Airport Area, 1</p>
                                                                                            <a href="" className='text-[#004B7A] text-xs'>Get Direction</a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <hr className='my-4 opcaity-5' />
                                                                                    <div className='flex gap-2 justify-start items-start'>
                                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                            />
                                                                                            <path
                                                                                                d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                            />
                                                                                            <path
                                                                                                d="M16.1007 13.3589C16.1007 13.3589 15.0181 14.4353 12.0631 11.4971C9.10807 8.55886 10.1907 7.48242 10.1907 7.48242"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="1.5"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                        </svg>
                                                                                        <div className='text-[#53616A] text-[10px]'>
                                                                                            <h6 className='p-0 text-xs mb-1'>Contact the store</h6>
                                                                                            <p>Abdullah Sulaiman Street Old Airport Area, 1</p>
                                                                                            <a href="" className='text-[#004B7A] text-xs'>983629347</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Panel> */}
                                        </Tab.Panels>
                                    </Tab.Group>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <Transition appear show={appDrawer} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setAppDrawer(false)}>
                    <div className="fixed inset-0 bg-dark/40" aria-hidden="true" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom={props.lang === 'ar' ? "translate-x-full" : "-translate-x-full"}
                            enterTo={props.lang === 'ar' ? "-translate-x-0" : "translate-x-0"}
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom={props.lang === 'ar' ? "-translate-x-0" : "translate-x-0"}
                            leaveTo={props.lang === 'ar' ? "translate-x-full" : "-translate-x-full"}
                        >
                            <Dialog.Panel className="w-80 h-[-webkit-fill-available] ltr:mr-auto rtl:ml-auto transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                                <div className="py-3.5 border-b mb-3 border-[#9CA4AB50]">
                                    <div className="container flex items-center justify-between ">
                                        <Dialog.Title
                                            as="h4"
                                            className="text-lg font-bold leading-6 text-gray-900"
                                        >
                                            {props.lang == 'ar' ? "فئات" : "Categories"}
                                        </Dialog.Title>
                                        <button onClick={() => setAppDrawer(false)} className="focus-visible:outline-none">
                                            <svg height="16" viewBox="0 0 329.26933 329" width="16" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-y-auto h-[-webkit-fill-available] pb-40 mt-4">
                                    {/* SubCategories */}
                                    {menuData?.map((data: any, i: number) => (
                                        <>
                                            <button key={i} className={`focus-visible:outline-none flex items-center justify-between py-3 border-b border-[#9CA4AB50] pl-4 pr-3 w-full`}
                                                onClick={() => {
                                                    if (data?.child?.length) {
                                                        if (parentCategory == data.id) {
                                                            setParentCategory(false)
                                                            setSubCategory(false)
                                                        } else {
                                                            setParentCategory(data.id)
                                                            setSubCategory(false)
                                                        }
                                                    } else {
                                                        menuRedirection(data?.slug)
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Image src={data?.image_link_app ? data?.image_link_app : "https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png"} alt="name" title="name" width={22} height={22} />
                                                    <label className={`text-sm font-semibold ${parentCategory == data.id ? 'text-[#219EBC]' : ''}`}>{props.lang === 'ar' ? data?.name_arabic : data?.name}</label>
                                                </div>
                                                {data?.child.length ?
                                                    <>
                                                        {parentCategory == data.id ?
                                                            <svg height="26" viewBox="0 0 24 24" width="26" className="-rotate-90 fill-[#219EBC]" xmlns="http://www.w3.org/2000/svg" id="fi_2722991"><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                                                            :
                                                            <svg height="26" viewBox="0 0 24 24" width="26" className={props.lang === 'ar' ? '' : 'rotate-180'} xmlns="http://www.w3.org/2000/svg" id="fi_2722991"><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                                                        }
                                                    </>
                                                    : null}
                                            </button>
                                            {data?.child.length ?
                                                <>
                                                    {/* SubSubCategories */}
                                                    {data?.child?.map((childcatgeory: any, i: number) => (
                                                        <>

                                                            <button key={i} className={`focus-visible:outline-none flex items-center justify-between py-3 border-b border-[#9CA4AB50] ltr:pl-8 rtl:pr-8 rtl:pl-3 ltr:pr-3 w-full ${parentCategory == data?.id ? 'scale-100' : 'scale-0 hidden'}`}
                                                                onClick={() => {
                                                                    if (childcatgeory?.child?.length) {
                                                                        if (subCategory === childcatgeory.id) {
                                                                            setSubCategory(false)
                                                                        } else {
                                                                            setSubCategory(childcatgeory.id)
                                                                        }
                                                                    } else {
                                                                        menuRedirection(childcatgeory?.slug)
                                                                    }
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <Image src={childcatgeory?.image_link_app ? childcatgeory?.image_link_app : "https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png"} alt="name" title="name" width={22} height={22} />
                                                                    <label className={`text-sm font-semibold ${subCategory === childcatgeory.id ? 'text-[#219EBC]' : ''}`}>{props.lang === 'ar' ? childcatgeory.name_arabic : childcatgeory.name}</label>
                                                                </div>
                                                                {childcatgeory?.child.length ?
                                                                    <>
                                                                        {subCategory === childcatgeory.id ?
                                                                            <svg height="26" viewBox="0 0 24 24" width="26" className="-rotate-90 fill-[#219EBC]" xmlns="http://www.w3.org/2000/svg" id="fi_2722991"><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                                                                            :
                                                                            <svg height="26" viewBox="0 0 24 24" width="26" className={props.lang === 'ar' ? '' : 'rotate-180'} xmlns="http://www.w3.org/2000/svg" id="fi_2722991"><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                                                                        }
                                                                    </>
                                                                    : null}
                                                            </button>

                                                            {childcatgeory?.child?.length ?
                                                                <>
                                                                    {childcatgeory?.child?.map((subcatgeory: any, i: number) => (
                                                                        <>
                                                                            <button
                                                                                key={i}
                                                                                className={`focus-visible:outline-none flex items-center gap-2 py-3 border-b border-[#9CA4AB50] w-full ltr:ml-4 ltr:pl-8 rtl:pr-8 ${subCategory == childcatgeory?.id ? 'scale-100' : 'scale-0 hidden'}`}
                                                                                onClick={() => {
                                                                                    menuRedirection(subcatgeory?.slug)
                                                                                }}
                                                                            >
                                                                                <Image src={subcatgeory?.image_link_app ? subcatgeory?.image_link_app : "https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png"} alt="name" title="name" width={22} height={22} />
                                                                                <label className="text-sm font-semibold">{props.lang === 'ar' ? subcatgeory.name_arabic : subcatgeory.name}</label>
                                                                            </button>

                                                                        </>
                                                                    ))}

                                                                </>
                                                                : null}
                                                        </>
                                                    ))}
                                                </>
                                                : null}
                                        </>
                                    ))}

                                </div >
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
