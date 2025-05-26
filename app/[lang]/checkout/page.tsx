"use client"; // This is a client component 👈🏽

import React, { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getDictionary } from "../dictionaries"
import Select from 'react-select';
import '@next/third-parties/google'
import { RadioGroup, Transition, Dialog } from '@headlessui/react'
import { get, post } from "../api/ApiCalls";
import { usePathname } from "next/navigation"
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next-nprogress-bar';
import { getCartCount, getCart, recheckcartdata, getOrderId, getSummary, setShipping, setDiscountRule, setDiscountRuleBogo, setShippingAddress, setPaymentMethod, getPaymentMethod, getPaymentMethodStatus, getWrapper, setWrapper, unsetWrapper, getInstallation, unsetInstallation, setInstallation, getCoupon, setCoupon, unsetcoupon, proceedToCheckout, setExpressDelivery, getExpressDeliveryData, unsetExpressDelivery, getDoorStepData, setDoorStep, unsetDoorStep, setExtraFees, getSubtotalSale } from '../cartstorage/cart';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MobileHeader = dynamic(() => import('../components/MobileHeader'), { ssr: true })
const FullPageLoader = dynamic(() => import('../components/FullPageLoader'), { ssr: false })

export default function Checkout({ params }: { params: { lang: string, devicetype: any } }) {
    const router = useRouter();
    const path = usePathname();
    const [dict, setDict] = useState<any>([])
    const [selected, setSelected] = useState([])
    const [summary, setSummary] = useState<any>([])
    const [checkoutData, setCheckoutData] = useState<any>({})
    const [deliOrder, setDeliOrder] = useState(true)
    const [pickOrder, setPickOrder] = useState(false)
    const [activeTab4, setActiveTab4] = useState<any>(1);
    const [activeTab3, setActiveTab3] = useState<any>(1);
    const [isactive, setActive] = useState(false)
    const [addAddress, setAddAddress] = useState(false)
    const [addressData, setAddressData] = useState<any>([])
    const [user, setuser] = useState<any>({})
    const [paymentstatus, setpaymentstatus] = useState<any>({})
    const [addressid, setaddressid] = useState<any>(false)
    const [paymentMethod, setpaymentMethod] = useState<any>(false)
    const [editdata, seteditdata] = useState<any>(false)
    const [couponcode, setcouponcode] = useState<any>(null)
    const [expressDeliveryData, setExpressDeliveryData] = useState<any>(false)
    const [expressDeliveryDataStatus, setExpressDeliveryDataStatus] = useState<boolean>(true)
    const [doorStepData, setDoorStepData] = useState<any>(false)
    const [doorStepDataStatus, setDoorStepDataStatus] = useState<boolean>(false)
    const [userDevice, setUserDevice] = useState<any>(false)
    const [loader, setLoader] = useState(false)
    const [address, setAddress] = useState<any>('')
    const [city, setCity] = useState<any>('')
    const [shippinginstructions, setShippingInstructions] = useState<any>('')
    const [primaryAddress, setPrimaryAddress] = useState(false)
    const [typeHouse, setTypeHouse] = useState<String>('Home')
    const [regions, setRegions] = useState<any>([])
    const [selectedRegion, setSelectedRegion] = useState<any>([])
    const [cities, setCities] = useState<any>([])
    const [citiesData, setCitiesData] = useState<any>([])
    const [selectedCity, setSelectedCity] = useState<any>([])
    const [addresslabel, setAddressLabel] = useState(false)
    const [dataid, setId] = useState<any>('')
    const [ProceesBtn, setProceesBtn] = useState(false)
    const [wrapperStatus, setwrapperStatus] = useState(false)
    const [installationStatus, setinstallationStatus] = useState(false)
    const [installationQty, setinstallationQty] = useState(1)
    const [discountType, setDiscountType] = useState<any>(0)
    const [safari, setSafari] = useState<any>(false)
    const [loaderStatus, setLoaderStatus] = useState<any>(true)
    const [errormsg, setErrorMsg] = useState<any>('')
    const [changeAddressPopup, setchangeAddressPopup] = useState(false)
    const [checkTermCondition, setCheckTermCondition] = useState(false)


    // const [email, setEmail] = useState<any>(localStorage.getItem('eMail'))
    // const [phoneNumber, setPhoneNumber] = useState<any>(localStorage.getItem('phoneNumber'))
    // const [fullName, setFullName] = useState<any>(localStorage.getItem('fullName'))

    const [email, setEmail] = useState<any>(false)
    const [phoneNumber, setPhoneNumber] = useState<any>(false)
    const [fullName, setFullName] = useState<any>(false)

    const quantityInstallation = [
        { key: 1, value: '1' }
    ]
    
    // CURRENCY SYMBOL //
    const currencySymbol = <svg className="riyal-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="11" height="12">
        <path fill="currentColor" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path>
        <path fill="currentColor" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
    </svg>;

    const getCustomerAddressData = async () => {
        if (localStorage.getItem('userid')) {
            await get(`user-addresses/${localStorage.getItem('userid')}`).then((responseJson: any) => {
                if (responseJson?.addresses?.length) {
                    setAddressData(responseJson?.addresses)
                    if (!addressid) {
                        setaddressid(responseJson?.addresses[0]?.id)
                    }
                }
                else {
                    setAddAddress(true)
                    setLoaderStatus(false)
                }
            })
        }
        else {
            router.push(`/${params.lang}/login?type=checkout`)
        }
    }

    const getUser = () => {
        if (localStorage.getItem('userid')) {
            get(`user-profile/${localStorage.getItem("userid")}`).then((responseJson: any) => {
                setuser(responseJson.user)
                setEmail(responseJson.user?.email)
                setPhoneNumber(responseJson.user?.phone_number)
                setFullName(responseJson.user?.full_name)
                if (responseJson?.user?.shipping_address_data_default) {
                    if (params.lang == "ar") {
                        localStorage.setItem("globalcity", responseJson?.user?.shipping_address_data_default?.state_data?.name_arabic.toString());
                        //setaddressid(responseJson?.user?.shipping_address_data_default?.id)
                    } else {
                        localStorage.setItem("globalcity", responseJson?.user?.shipping_address_data_default?.state_data?.name.toString());
                        //setaddressid(responseJson?.user?.shipping_address_data_default?.id)
                    }
                } else {
                }
            })
        }
        else {
            router.push(`/${params.lang}/login?type=checkout`)
        }
    }

    useEffect(() => {
        if (getCartCount() < 1) {
            router.push(`/${params.lang}/`)
        }
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
            var recheck = await recheckcartdata()
            if (!recheck?.success) {
                topMessageAlartDangerNew(params.lang == 'ar' ? 'هناك بعض التحديثات في سلة التسوق الخاصة بك.' : 'There is some updates in your cart.')
                router.push(`/${params.lang}/cart`);
            }
        })();
        // getUser()
        if (typeof window !== 'undefined') {
            getUser()
            setwrapperStatus(!getWrapper() ? false : true)
            setinstallationStatus(!getInstallation() ? false : true)
            setcouponcode(getCoupon().title)
            setpaymentMethod(getPaymentMethod())
            // getCitiesData(params.lang)
            getCustomerAddressData()
            //couponApplied()
            //expressDelivery()
            //doorStep()
            //resetCheckout()
            getDiscountType()
            getDevice()
        }
    }, [params])

    const getDiscountType = async () => {
        get(`getdiscounttype`).then((responseJson: any) => {
            setDiscountType(responseJson?.data?.discount_type)
        })
    }
    const getpaymentData = async () => {
        var selectedaddres = addressData?.filter((element: any) => {
            return element.id == addressid
        })
        var city = ''
        if (selectedaddres?.length && selectedaddres[0].state_data?.name)
            city = selectedaddres[0].state_data?.name
        var pstatus = await getPaymentMethodStatus(city)
        setpaymentstatus(pstatus)
    }
    useEffect(() => {
        if (addressid) {
            setLoaderStatus(true)
            //doorStep()
            setShippingAddress(addressid)
            unsetExpressDelivery()
            setExpressDeliveryData(false)
            setExpressDeliveryDataStatus(true)
            expressDelivery()
            var selectedaddres = addressData?.filter((element: any) => {
                return element.id == addressid
            })
            var city = ''
            if (selectedaddres?.length && selectedaddres[0].state_data?.name)
                city = selectedaddres[0].state_data?.name

            if (city != localStorage.getItem("globalcity")) {
                (async () => {
                    await setDiscountRule(city);
                    await setDiscountRuleBogo(city);
                })();
            }
            resetCheckout()
            getpaymentData()
        }

    }, [addressid])

    useEffect(() => {
        setPaymentMethod(paymentMethod)
        if (paymentMethod) {
            resetCheckout()
        }
    }, [paymentMethod])

    useEffect(() => {
        if (activeTab3 == 3) {
            var paymentkey = paymentMethod == 'madapay' ? 'hyperpay' : paymentMethod
            if (!paymentkey || !paymentstatus[paymentkey + '_status']) {
                setActiveTab3(2)
            }
        }
    }, [activeTab3])

    const getDevice = () => {
        var deviceType: any = params.devicetype;
        var browserName: any = '';
        var mobileType: any = '';
        var detectBrowser: any = {
            Chrome: function () {
                return navigator.userAgent.match(/Chrome/i);
            },
            FireFox: function () {
                return navigator.userAgent.match(/FireFox/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera/i);
            },
            Safari: function () {
                return navigator.userAgent.match(/Safari/i);
            },
            Edg: function () {
                return navigator.userAgent.match(/Edg/i);
            },
        }
        if (detectBrowser.Edg()) {
            browserName = "Edg"
        }
        else if (detectBrowser.Opera()) {
            browserName = "Opera"
        }
        else if (detectBrowser.FireFox()) {
            browserName = "Mozilla"
        }
        else if (detectBrowser.Chrome()) {
            browserName = "Chrome"
        }
        else if (detectBrowser.Safari()) {
            browserName = "Safari"
            setSafari(true)
        }

        var isMobile: any = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
        };
        if (isMobile.iOS()) {
            mobileType = "iOS"
        }
        if (isMobile.Android()) {
            mobileType = "Android"
        }
        if (isMobile.Windows()) {
            mobileType = "Windows"
        }
        var UserDeviceData = '';
        if (deviceType == "mobile") {
            UserDeviceData = "Mobile - " + mobileType + ' ' + browserName;
        } else {
            UserDeviceData = "Desktop - " + browserName;
        }
        setUserDevice(UserDeviceData)
    }

    const DeleteAddress = (id: any) => {
        get(`user-address-delete/${id}`).then((responseJson: any) => {
            if (responseJson?.success) {
                getCustomerAddressData()
                resetCheckout()
                topMessageAlartDangerNew(dict?.address?.DeleteAddress)
                setaddressid(false)
            }
            else {
                topMessageAlartDangerNew(dict?.somethingwentwrong)
            }
        })
    }

    const addwrapper = async (status: boolean) => {
        if (status) {
            setWrapper()
            // setDoorStepDataStatus(true)
        } else {
            unsetWrapper()
            // setDoorStepDataStatus(false)
        }
        resetCheckout()
    }

    const addinstallation = async (status: boolean) => {
        if (status) {
            setInstallation(installationQty)
            // setDoorStepDataStatus(true)
        } else {
            unsetInstallation()
            // setDoorStepDataStatus(false)
        }
        resetCheckout()
    }

    useEffect(() => {

        if (installationStatus) {
            setInstallation(installationQty)
            resetCheckout()
        }

    }, [installationQty])

    // const addwrapper = () => {
    //     setWrapper()
    //     resetCheckout()
    // }

    const addExpressDelivery = async (status: boolean) => {
        if (status) {
            setExpressDelivery(expressDeliveryData)
            setExpressDeliveryDataStatus(true)
        } else {
            unsetExpressDelivery()
            setExpressDeliveryDataStatus(false)
        }
        resetCheckout()
    }

    useEffect(() => {
        addExpressDelivery(true)
    }, [expressDeliveryData])

    const addDoorStep = async (status: boolean) => {
        if (status) {
            setDoorStep(doorStepData)
            setDoorStepDataStatus(true)
        } else {
            unsetDoorStep()
            setDoorStepDataStatus(false)
        }
        resetCheckout()
    }


    const resetCheckout = async () => {
        if (addressid) {
            var selectedaddres = addressData?.filter((element: any) => {
                return element.id == addressid
            })
            var city = ''
            if (selectedaddres?.length && selectedaddres[0].state_data?.name)
                city = selectedaddres[0].state_data?.name
            setSummary(getSummary())
            setCheckoutData(getCart())
            await setShipping(city);
            // var pstatus = await getPaymentMethodStatus(city)
            // setpaymentstatus(pstatus)
            // await setDiscountRule(city);
            // await setDiscountRuleBogo(city);
            //await setExtraFees(paymentMethod);
        }
        else {
            setSummary(getSummary())
            setCheckoutData(getCart())
            await setShipping();
            // var pstatus = await getPaymentMethodStatus()
            // setpaymentstatus(pstatus)
            // await setDiscountRule();
            // await setDiscountRuleBogo();
            // await setExtraFees(paymentMethod);

        }

        setSummary(getSummary())
        setCheckoutData(getCart())
        setLoaderStatus(false)
    }

    const doorStep = async () => {
        var response = await getDoorStepData()
        if (response) {
            setDoorStepData(response)
        }
    }

    const expressDelivery = async () => {
        var city = false;
        var selectedaddres = addressData?.filter((element: any) => {
            return element.id == addressid
        })
        if (selectedaddres?.length && selectedaddres[0].state_data?.name)
            city = selectedaddres[0].state_data?.name
        var response = await getExpressDeliveryData(city)
        if (response) {
            setExpressDeliveryData(response)
        }
    }
    const couponApplied = async () => {
        if (!getCoupon().amount) {
            var city = false;
            var selectedaddres = addressData?.filter((element: any) => {
                return element.id == addressid
            })
            if (selectedaddres?.length && selectedaddres[0].state_data?.name)
                city = selectedaddres[0].state_data?.name
            var response = await setCoupon(city, couponcode)
            if (!response && couponcode) {
                topMessageAlartDangerNew(dict?.invalidcoupon)
            } else if (response) {
                await setDiscountRule(city);
                await setDiscountRuleBogo(city);
                topMessageAlartSuccess(dict?.setcoupon)
            }
            resetCheckout()
        }
    }

    const couponremove = async () => {
        unsetcoupon()
        setcouponcode('')
        topMessageAlartDangerNew(dict?.unsetcoupon)
        var city = false;
        var selectedaddres = addressData?.filter((element: any) => {
            return element.id == addressid
        })
        if (selectedaddres?.length && selectedaddres[0].state_data?.name)
            city = selectedaddres[0].state_data?.name
        await setDiscountRule(city);
        await setDiscountRuleBogo(city);
        resetCheckout()
    }

    const DataLayerCheckout = () => {
        // checkout layer
        var dataarry = [];
        for (let index = 0; index < checkoutData?.products?.length; index++) {
            const element = checkoutData?.products[index];
            var obj: any = {};
            obj["id"] = element?.sku;
            obj["name"] = params?.lang == "ar" ? element?.name_arabic : element?.name;
            obj["price"] = element?.regular_price;
            obj["quantity"] = element?.quantity;
            obj["salePrice"] = element?.price;
            dataarry.push(obj);
        }

        var address = addressData?.filter((items: any) => items?.make_default == 1)[0]
        var SHA256 = require("crypto-js/sha256");
        var encryptedEmail = SHA256(email);
        var splittedfinalEmail = encryptedEmail.words.join("");
        var finalEmail = splittedfinalEmail.split("-");

        var encryptedPhone = SHA256(phoneNumber);
        var splittedfinalPhone = encryptedPhone.words.join("");
        var finalPhone = splittedfinalPhone.split("-");

        var wind: any = typeof window !== "undefined" ? window.dataLayer : "";
        wind = wind || [];
        wind.push({ ecommerce: null }); // Clear the previous ecommerce object.
        wind.push({
            event: "checkout",
            // user_email: this.props.gtagData?.email,
            phone_number: phoneNumber,
            __INSERT_USER_PHONE__: phoneNumber,
            __INSERT_USER_EMAIL__: email,
            user_email: email,
            user_hashed_phone_number: finalPhone.join(""),
            user_hashed_email: finalEmail.join(""),
            address: {
                first_name: user?.first_name,
                last_name: user?.last_name,
                city: params.lang == 'ar' ? address?.state_data?.name_arabic : address?.state_data?.name,
                country: params.lang == 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia',
            },
            ecommerce: {
                currencyCode: "SAR",
                checkout: {
                    actionField: {
                        step: 1,
                        option: paymentMethod,
                        id: localStorage.getItem('orderId'), // Transaction ID. Required for purchases and refunds.
                        affiliation: "Tamkeen Stores Online Store",
                        value: summary?.filter((element: any) => element.key == 'total')[0]?.price, // Total transaction value (incl. tax and shipping)
                        tax: (summary?.filter((element: any) => element.key == 'total')[0]?.price - summary?.filter((element: any) => element.key == 'total')[0]?.price / 1.15).toFixed(2),
                        shipping: summary?.filter((element: any) => element.key == 'shipping')[0]?.price,
                        coupon: checkoutData?.discounts?.coupon?.title,
                    },
                    products: dataarry,
                },
            }
        });
        localStorage?.removeItem('orderId')
    }

    const submitOrder = async () => {
        setShippingAddress(addressid)
        var city = false;

        var selectedaddres = addressData?.filter((element: any) => {
            return element.id == addressid
        })
        if (selectedaddres?.length && selectedaddres[0].state_data?.name)
            city = selectedaddres[0].state_data?.name
        var recheck = await recheckcartdata(params.lang, city)
        if (recheck.success && getSubtotalSale() > 0) {

            await setDiscountRule(city);
            await setDiscountRuleBogo(city);
            if(expressDeliveryData) {
                setExpressDelivery(expressDeliveryData)
            }
            var response: any = await proceedToCheckout(city, params.lang, userDevice)
            if (response?.type == 'internal') {
                router.push(response.link)
            } else if (response.link) {
                window.location.href = response.link
            } else {
                topMessageAlartDangerNew(dict?.paymentmethod)
                // alert('payment method not available')
            }
            DataLayerCheckout()
        }
        else {
            topMessageAlartDangerNew(params.lang == 'ar' ? 'هناك بعض التحديثات في سلة التسوق الخاصة بك.' : 'There is some updates in your cart.')
            router.push(`/${params.lang}/cart`);
        }

    }

    function CheckIcon(props: any) {
        return (
            <svg viewBox="0 0 24 24" fill="none" {...props}>
                <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
                <path
                    d="M7 13l3 3 7-7"
                    stroke="#fff"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    const AddAddress = () => {
        if (primaryAddress == true) {
            localStorage.setItem('globalcity', city?.label?.toString())
        }
        var data = {
            user_id: localStorage.getItem("userid"),
            address: address,
            state_id: city?.value,
            shippinginstractions: shippinginstructions,
            make_default: primaryAddress == true ? 1 : 0,
            address_label: typeHouse == 'Home' ? 0 : 1,
        }
        if (!address || !city) {
            setErrorMsg('Error! Please fill ' + (!address ? 'Address, ' : '') + (!city ? 'City, ' : '') + '!')
            topMessageAlartDangerNew(errormsg)
            setLoader(false)
            return false;
        }
        post('addaddress', data).then(async (responseJson: any) => {
            if (responseJson?.success) {
                setAddAddress(false),
                    setLoader(false)
                await getCustomerAddressData()
                localStorage.setItem("globalcity", city?.label.toString());
                setaddressid(responseJson?.addressid)
                DataGo()
                topMessageAlartSuccess(dict?.address.AddAddress)
                resetCheckout()
            }
            else {
                setLoader(false)
                topMessageAlartDangerNew(dict?.somethingwentwrong)
            }
        })
    }

    function getCities(e: any) {
        get('address-region-cities/' + e.value).then((responseJson: any) => {
            if (params.lang == 'ar') {
                setCities(responseJson?.citiesarabic)
            }
            else {
                setCities(responseJson?.cities)
            }
        })
    }

    const UpdateAddress = (dataid: any) => {
        if (primaryAddress == true) {
            localStorage.setItem('globalcity', selectedCity?.label?.toString())
        }
        var data = {
            user_id: localStorage.getItem("userid"),
            address: address,
            state_id: selectedCity?.value,
            shippinginstractions: shippinginstructions,
            make_default: primaryAddress == true ? 1 : 0,
            address_label: typeHouse == 'Home' ? 0 : 1,
        }
        if (!address || !selectedCity) {
            setErrorMsg('Error! Please fill ' + (!address ? 'Address, ' : '') + (!selectedCity ? 'City, ' : '') + '!')
            topMessageAlartDangerNew(errormsg)
            setLoader(false)
            return false;
        }
        post('updateaddress/' + dataid, data).then((responseJson: any) => {
            if (responseJson?.success) {
                setLoader(false)
                getCustomerAddressData()
                setaddressid(dataid)
                DataGo()
                topMessageAlartSuccess(dict?.address.UpdateAddress)
            }
            else {
                setLoader(false)
                topMessageAlartDangerNew(dict?.somethingwentwrong)
            }

        })
    }

    function EditAddress(id: any) {
        get('user-address/' + id).then((responseJson: any) => {
            if (params.lang == 'ar') {
                setRegions(responseJson?.arabicregions)
            }
            else {
                setRegions(responseJson?.regions)
            }
            setAddress(responseJson?.address?.address)
            setShippingInstructions(responseJson?.address?.shippinginstractions)
            setPrimaryAddress(responseJson?.address?.make_default)
            if (responseJson?.address?.make_default == 1) {
                setActive(true)
            }
            else {
                setActive(false)
            }
            if (responseJson?.address?.address_label == 0) {
                setTypeHouse("Home")
            } else {
                setTypeHouse("Office")
            }
            setId(responseJson?.address?.id)

            if (params.lang == 'ar') {
                const CityData = responseJson.arabiccities?.filter((item: { value: any; }) => item?.value === responseJson?.address?.state_id);
                setSelectedCity(CityData[0])
            }
            else {
                const CityData = responseJson.cities?.filter((item: { value: any; }) => item?.value === responseJson?.address?.state_id);
                setSelectedCity(CityData[0])
            }
        })
    }

    const DataGo = () => {
        setAddress('')
        setShippingInstructions('')
        setAddressLabel(false)
        setSelectedRegion([])
        setSelectedCity([])
        setId('')
    }


    function getCitiesData(lang: string) {
        get('get-city-list-lang/' + lang).then((responseJson: any) => {
            setCitiesData(responseJson?.data)
            var selectcity = responseJson?.data?.filter((item: { label: string | null; }) => item.label == localStorage.getItem('globalcity'))[0]
            if (selectcity) {
                setCity(selectcity)
            }
        })
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

    const topMessageAlartDangerNew = (title: any) => {
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

    const paymentmethods = [
        {
            key: 'applepay',
            name: 'Apple Pay',
            image: '/images/applepay.webp'
        },
        {
            key: 'madapay',
            name: 'Mada Pay',
            image: '/images/mada.webp'
        },
        {
            key: 'hyperpay',
            name: 'Credit & Debit Card',
            image: '/images/master.webp'
        },
        {
            key: 'madfu',
            name: 'Madfu',
            image: '/images/madfu.webp'
        },
        {
            key: 'mispay',
            name: 'Mispay',
            image: '/images/misspay.webp'
        },
        {
            key: 'clickpay',
            name: 'Clickpay',
            image: '/images/clickpay.webp'
        },
        {
            key: 'clickpay_applepay',
            name: 'Apple Pay',
            image: '/images/applepay.webp'
        },
        {
            key: 'tamara',
            name: 'Tamara',
            image: params.lang == 'ar' ? '/images/tamara-ar.webp' : '/images/tamara-en.webp'
        },
        {
            key: 'tabby',
            name: 'Tabby',
            image: params.lang == 'ar' ? '/images/tabby-ar.webp' : '/images/tabby-en.webp'
        },
        {
            key: 'tasheel',
            name: 'Baseeta',
            image: '/images/baseeta.webp'
        },
        {
            key: 'cod',
            name: 'Cash on Delivery',
            image: '/images/cod.webp'
        },
    ];

    return (
        <>
            <FullPageLoader loader={loaderStatus} />
            <MobileHeader type="Third" lang={params.lang} redirect="cart" pageTitle={params.lang === 'ar' ? 'الدفع واكمال الطلب' : 'Checkout'} />
            <div className="container py-4 max-md:py-16">
                {/* Cart have Products */}
                <div className="md:flex items-start my-4 gap-x-5">
                    <div className="w-full">
                        {activeTab3 === 1 ?
                            <>
                                <div className="my-4">
                                    <h3 className="text-xl  font-semibold mb-3">{params.lang == 'ar' ? 'هلا!' : 'Hi!'} {fullName}</h3>
                                    <div className="flex items-start my-4 gap-x-5">
                                        <div className={`w-full ${addAddress == true ? 'block' : 'hidden'}`}>
                                            <div className="flex items-center justify-between mb-1 font-bold text-base mt-4">
                                                <h2>{params.lang == 'ar' ? 'اضف عنوان' : 'Add Address'}</h2>
                                                {addressData?.length ?
                                                    <button onClick={() => {
                                                        setAddAddress(false),
                                                            setProceesBtn(false)
                                                    }} className='focus-visible:outline-none text-[#219EBC] hover:underline text-sm'>{params.lang == 'ar' ? 'خلف' : 'Back'}</button>
                                                    : null}
                                            </div>
                                            <div className={`pb-3 ${addAddress == true ? 'block' : 'hidden'}`}>
                                                <div className="flex items-center rounded-md border border-[#dfdfdf] focus-visible:outline-[#004B7A] fill-primary pb-3 pt-2.5 px-3 text-sm gap-x-3 w-full mb-3 bg-white">
                                                    <svg id="fi_3514361" height="22" viewBox="0 0 256 256" width="22" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m128 138.184a5 5 0 0 1 -3.607-1.538c-2.075-2.16-50.808-53.259-50.808-82.228a54.415 54.415 0 1 1 108.83 0c0 28.969-48.733 80.068-50.808 82.228a5 5 0 0 1 -3.607 1.538zm0-128.184a44.465 44.465 0 0 0 -44.415 44.418c0 19.07 29.312 54.978 44.414 71.451 15.1-16.478 44.416-52.4 44.416-71.451a44.465 44.465 0 0 0 -44.415-44.418z"></path><path d="m128 76.153a21.735 21.735 0 1 1 21.735-21.735 21.759 21.759 0 0 1 -21.735 21.735zm0-33.47a11.735 11.735 0 1 0 11.735 11.735 11.748 11.748 0 0 0 -11.735-11.735z"></path><path d="m128.126 256a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.559a5 5 0 0 1 -2.5-4.331v-38.385a5 5 0 0 1 10 0v35.5l72.175 41.67 72.174-41.67v-35.88a5 5 0 0 1 10 0v38.765a5 5 0 0 1 -2.5 4.331l-77.174 44.556a4.992 4.992 0 0 1 -2.5.673z"></path><path d="m128.126 166.884a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.557a5 5 0 1 1 5-8.66l74.675 43.113 74.674-43.11a5 5 0 1 1 5 8.66l-77.174 44.557a4.992 4.992 0 0 1 -2.5.667z"></path><path d="m160.933 198.291a5 5 0 0 1 -3.459-1.389l-32.806-31.402a5 5 0 0 1 6.916-7.224l30.1 28.813 68.154-39.349-27.558-26.382-27.359-15.744a5 5 0 1 1 4.988-8.667l27.885 16.047a4.988 4.988 0 0 1 .964.721l32.806 31.407a5 5 0 0 1 -.958 7.942l-77.174 44.557a4.993 4.993 0 0 1 -2.499.67z"></path><path d="m95.067 198.525a4.985 4.985 0 0 1 -2.5-.67l-77.173-44.555a5 5 0 0 1 -.957-7.942l33.057-31.642a4.967 4.967 0 0 1 .957-.718l27.634-15.955a5 5 0 1 1 5 8.66l-27.112 15.653-27.807 26.616 68.154 39.348 30.349-29.048a5 5 0 1 1 6.914 7.224l-33.058 31.641a4.991 4.991 0 0 1 -3.458 1.388z"></path></svg>
                                                    <div className="h-5 w-[1px] bg-primary opacity-20" />
                                                    <input id="iconLeft" value={address} type="text" placeholder={params.lang == 'ar' ? 'رقم الشقة / رقم المبنى / المنطقة أو أقرب معلم' : 'Flat Number / Building Number / Area or Nearest Land Mark'} className="focus-visible:outline-none w-full font-regular"
                                                        onChange={(e: any) => {
                                                            setAddress(e.target.value)
                                                        }} />
                                                </div>
                                                <div className="flex items-center mb-3 gap-x-3">
                                                    <Select
                                                        styles={{
                                                            control: (provided: any, state: any) => ({
                                                                ...provided,
                                                                background: '#fff',
                                                                borderColor: '#dfdfdf',
                                                                minHeight: '44px',
                                                                height: '42px',
                                                                borderRadius: '6px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                boxShadow: state.isFocused ? null : null,
                                                            }),
                                                            valueContainer: (provided, state) => ({
                                                                ...provided,
                                                                height: '42px',
                                                                padding: '0 0.5rem',
                                                                overflow: 'visible',
                                                            }),
                                                            input: (provided, state) => ({
                                                                ...provided,
                                                                margin: '0px',
                                                            }),
                                                            indicatorSeparator: state => ({
                                                                alignSelf: 'stretch',
                                                                width: '1px',
                                                                backgroundColor: 'hsl(0, 0%, 80%)',
                                                                marginBottom: '12px',
                                                                marginTop: '12px',
                                                                boxSizing: 'border-box',
                                                            }),
                                                            indicatorsContainer: (provided, state) => ({
                                                                ...provided,
                                                                height: '42px',
                                                            }),
                                                        }}
                                                        placeholder={params.lang == 'ar' ? 'اختر المنطقة' : 'Select City'}
                                                        options={citiesData}
                                                        isSearchable={true}
                                                        value={editdata ? selectedCity : city}
                                                        className="text-primary font-regular text-sm focus-visible:outline-none w-full"
                                                        classNamePrefix="react-select"
                                                        onChange={(e: any) => {
                                                            setCity(e)
                                                            setSelectedCity(e)
                                                        }}
                                                    />
                                                </div>
                                                <div className="rounded-md border border-[#dfdfdf] focus-visible:outline-[#004B7A] pb-3 pt-2.5 px-3 text-sm w-full mb-3 bg-white">
                                                    <textarea id="iconLeft" rows={3} value={shippinginstructions} placeholder={params.lang == 'ar' ? 'تعليمات الشحن' : 'Shipping Instructions'} className="focus-visible:outline-none w-full font-regular"
                                                        onChange={(e: any) => {
                                                            setShippingInstructions(e.target.value)
                                                        }} />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="deafultAddress" className="focus-visible:outline-[#004B7A] fill-primary text-sm w-full items-center flex gap-x-2">
                                                        <input type="checkbox" className="h-5 w-5 hidden" id="deafultAddress" checked={primaryAddress} name="deafultAddress"
                                                            onChange={(e: any) => {
                                                                setActive(e.target.checked)
                                                                setPrimaryAddress(e.target.checked)
                                                            }} />
                                                        {isactive == true ?
                                                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                                                <circle cx={12} cy={12} r={12} fill="#219EBC" />
                                                                <path
                                                                    d="M7 13l3 3 7-7"
                                                                    stroke="#fff"
                                                                    strokeWidth={1.5}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            :
                                                            <svg viewBox="0 0 24 24" fill="#5D686F60" className="h-5 w-5">
                                                                <circle cx={12} cy={12} r={12} fill="#5D686F60" opacity={0.2} />
                                                            </svg>
                                                        }
                                                        {params.lang == 'ar' ? 'اجعله عنوانًا افتراضيًا' : 'Make as Primary?'}
                                                    </label>
                                                    <RadioGroup value={typeHouse} onChange={setTypeHouse} className="flex items-center justify-end gap-x-3 text-xs">
                                                        <RadioGroup.Option value="Home">
                                                            {({ active, checked }) => (
                                                                <button className={`${checked ? `focus-visible:outline-none border border-[#219EBC] bg-[#219EBC] text-white` : `border border-[#219EBC60] text-[#219EBC80]`} py-1.5 px-2 rounded-md flex items-center gap-x-2`}>
                                                                    {checked ?
                                                                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                                                                            <circle cx={12} cy={12} r={12} fill="#FFFFFF" />
                                                                            <path
                                                                                d="M7 13l3 3 7-7"
                                                                                stroke="#219EBC"
                                                                                strokeWidth={1.5}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                        :
                                                                        <svg viewBox="0 0 24 24" fill="#5D686F60" className="h-4 w-4">
                                                                            <circle cx={12} cy={12} r={12} fill="#5D686F60" opacity={0.2} />
                                                                        </svg>
                                                                    }
                                                                    {params.lang == 'ar' ? 'الــمنـــزل' : 'Home'}
                                                                </button>
                                                            )
                                                            }
                                                        </RadioGroup.Option>
                                                        <RadioGroup.Option value="Office">
                                                            {({ active, checked }) => (
                                                                <button className={`${checked ? `focus-visible:outline-none border border-[#219EBC] bg-[#219EBC] text-white` : `border border-[#219EBC60] text-[#219EBC80]`} py-1.5 px-2 rounded-md flex items-center gap-x-2`}>
                                                                    {checked ?
                                                                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                                                                            <circle cx={12} cy={12} r={12} fill="#FFFFFF" />
                                                                            <path
                                                                                d="M7 13l3 3 7-7"
                                                                                stroke="#219EBC"
                                                                                strokeWidth={1.5}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                        :
                                                                        <svg viewBox="0 0 24 24" fill="#5D686F60" className="h-4 w-4">
                                                                            <circle cx={12} cy={12} r={12} fill="#5D686F60" opacity={0.2} />
                                                                        </svg>
                                                                    }
                                                                    {params.lang == 'ar' ? 'مكتب' : 'Office'}
                                                                </button>
                                                            )
                                                            }
                                                        </RadioGroup.Option>
                                                    </RadioGroup>
                                                </div>
                                                {editdata ?
                                                    <button
                                                        type="button"
                                                        onClick={() => { setLoader(true), setAddAddress(false), UpdateAddress(dataid) }}
                                                        className={`focus-visible:outline-none bg-[#004B7A] border border-[#004B7A] hover:bg-[#00446f] hover:border-[#00446f] text-white md:w-80 w-full rounded-md p-3.5 text-base mt-10 font-bold flex items-center justify-center m-auto`}>
                                                        {loader == true ?
                                                            <svg height="24" viewBox="0 0 24 24" className="animate-spin h-6 w-6 fill-white" width="24" xmlns="http://www.w3.org/2000/svg" id="fi_7235860"><path d="m12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8v-2c-5.421 0-10 4.58-10 10 0 5.421 4.579 10 10 10z"></path></svg>
                                                            : null}
                                                        {params.lang == 'ar' ? 'حفظ العنوان' : 'Save Address'}
                                                    </button>
                                                    :
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            AddAddress()
                                                        }}
                                                        className={`focus-visible:outline-none bg-[#004B7A] border border-[#004B7A] hover:bg-[#00446f] hover:border-[#00446f] text-white w-full rounded-md p-3.5 text-base mt-10 font-bold flex items-center justify-center m-auto`}>
                                                        {loader == true ?
                                                            <svg height="24" viewBox="0 0 24 24" className="animate-spin h-6 w-6 fill-white" width="24" xmlns="http://www.w3.org/2000/svg" id="fi_7235860"><path d="m12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8v-2c-5.421 0-10 4.58-10 10 0 5.421 4.579 10 10 10z"></path></svg>
                                                            : null}
                                                        {params.lang == 'ar' ? 'استمرار' : 'Save'}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    {deliOrder === true ?
                                        <>
                                        <div className={`mt-4 ${addAddress == true ? 'hidden' : 'block'}`}>
                                            <span className="text-[#B15533] text-sm">{params.lang == 'ar' ? ' تفاصيل العنوان' : 'Address Details'}</span>
                                            {addressid ? 
                                            <div className="mt-2">
                                                <RadioGroup>
                                                    <div className="space-y-3">
                                                        <RadioGroup.Option
                                                            key={addressData?.filter((item: any) => item?.id == addressid)[0].id}
                                                            value={addressData?.filter((item: any) => item?.id == addressid)[0]?.id}
                                                            className={({ active, checked }) =>
                                                                `${checked
                                                                    ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                                                                    : 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                                                                }   
                                                            ${checked ? 'bg-[#219EBC] text-white border' : 'bg-[#219EBC] border border-[#219EBC80] text-white'}
                                                                relative flex cursor-pointer rounded-lg p-3 shadow-md focus:outline-none border-[#219EBC80]`
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <div className="flex w-full items-center justify-between">
                                                                        <div className="flex items-center gap-x-3 w-full">
                                                                            <div className="shrink-0 text-white">
                                                                                <CheckIcon className="h-6 w-6" />
                                                                            </div>
                                                                            <div className="w-full">
                                                                                <RadioGroup.Label as="p" className={`text-sm font-bold  mb-3 text-white`}>
                                                                                    {addressData?.filter((item: any) => item?.id == addressid)[0]?.make_default == 1 ? params.lang == 'ar' ? 'الــمنـــزل' : 'Home' : params.lang == 'ar' ? 'مكتب' : 'Office'}
                                                                                    {addressData?.filter((item: any) => item?.id == addressid)[0]?.make_default == 1 ?
                                                                                        <span className={`px-2 py-1 bg-[#219EBC30] text-xs rounded-sm text-[#219EBC] ml-2 rtl:mr-2 text-white bg-[#FFFFFF30]`}>{params.lang == 'ar' ? 'العنوان الرئيسي' : 'Primary Address'}</span>
                                                                                        : null}
                                                                                </RadioGroup.Label>
                                                                                <p className={`mt-1 text-xs text-white`}>{addressData?.filter((item: any) => item?.id == addressid)[0]?.address}</p>
                                                                                <p className={`mt-1.5 text-xs font-bold text-white`}>{params.lang == 'ar' ? addressData?.filter((item: any) => item?.id == addressid)[0]?.state_data?.region?.name_arabic : addressData?.filter((item: any) => item?.id == addressid)[0]?.state_data?.region?.name}, {params.lang == 'ar' ? addressData?.filter((item: any) => item?.id == addressid)[0]?.state_data?.name_arabic : addressData?.filter((item: any) => item?.id == addressid)[0]?.state_data?.name} | {params.lang == 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</p>
                                                                                {addressData?.filter((item: any) => item?.id == addressid)[0]?.shippinginstractions ?
                                                                                    <div className="mt-3">
                                                                                        <p className={`mt-3 text-xs font-bold text-white`}>{params.lang == 'ar' ? 'تعليمات الشحن' : 'Shipping Instructions'}:</p>
                                                                                        <p className={`mt-1 text-xs font-light text-white`}>
                                                                                            {addressData?.filter((item: any) => item?.id == addressid)[0]?.shippinginstractions}
                                                                                        </p>
                                                                                    </div>
                                                                                    : null}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    </div>
                                                </RadioGroup>
                                                <button
                                                onClick={() => {
                                                    // getRegions(),
                                                    seteditdata(false),
                                                        getCitiesData(params.lang),
                                                        DataGo(),
                                                        setAddAddress(true)
                                                }}
                                                // onClick={() => 
                                                //     // setAddAddress(!addAddress)
                                                //     router.push(`/${params.lang}/account/addressbook?addAddressCheckout=true`)
                                                // } 
                                                className={`focus-visible:outline-none underline text-sm mt-3 text-primary hover:text-[#B15533] rtl:pl-3 ltr:pr-3`}>+ {params.lang == 'ar' ? 'اضــافــة عــنوان جديد' : 'Add a new address'}
                                                </button>
                                                <button
                                                onClick={() => {
                                                    setchangeAddressPopup(true)
                                                }}
                                                    className="focus-visible:outline-none underline text-sm mt-3 text-primary hover:text-[#B15533]">{params.lang == 'ar' ? 'تغيير العنوان' : 'Change address'}
                                                </button>

                                                <div className="mt-4">
                                                    <span className="text-[#B15533] text-sm">{params.lang == 'ar' ? 'موعد التوصيل المحتمل' : 'Possible Delivery Date'}</span>
                                                    <div className="mt-2 text-[#004B7A] font-regular text-xs bg-white p-3 shadow-md rounded-md border border-[#219EBC] md:flex items-center gap-x-4">
                                                        
                                                        {expressDeliveryData?.data?.price >= 0 ?
                                                            <>
                                                                {/* <div className="inline-block md:h-20 md:w-0.5 md:min-h-[1em] w-full h-0.5 max-md:mt-2 self-stretch bg-[#219EBC] opacity-10"></div> */}
                                                                <div className="flex items-center justify-between gap-x-4 max-md:mt-1 w-full">
                                                                    <div className="font-bold text-sm">
                                                                        <Image
                                                                            src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                            width="65" height="0" alt="express_delivery" title='Express Delivery'
                                                                        />
                                                                        <h6 className="text-[#004B7A] text-sm">{params.lang == 'ar' ? expressDeliveryData?.data?.title_name : expressDeliveryData?.data?.title}</h6>
                                                                        <span className="text-xs font-medium text-[#5D686F]">{params.lang == 'ar' ? 'من المتوقع أن يتم التسليم يوم' : 'Delivery is expected to take place on'} <span className="font-bold">{moment().add(expressDeliveryData?.data?.num_of_days, 'days').locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY")}</span></span>
                                                                        {/* <p className="text-[#B15533] mt-2 text-lg">+ {expressDeliveryData?.data?.price} {params.lang == 'ar' ? 'ر.س' : 'SR'}</p> */}
                                                                    </div>
                                                                    {/* <label className="w-12 h-6 relative">
                                                                        <input onChange={(e) => {
                                                                            addExpressDelivery(e.target.checked)
                                                                        }}
                                                                            defaultChecked={expressDeliveryDataStatus}
                                                                            type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                                        <span className="bg-[#ebedf2] block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-[#219EBC] before:transition-all before:duration-300"></span>
                                                                    </label> */}
                                                                </div>
                                                            </>
                                                            : 
                                                            <div className="">
                                                                <svg id="fi_10112476" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                                                <label className="">{params.lang == 'ar' ? 'من المتوقع أن يتم التسليم يوم' : 'Delivery is expected to take place on'}{' '}
                                                                    <span className="font-bold">
                                                                        {moment().add(7, 'days').format("MMM  DD, YYYY")}</span></label>
                                                            </div>
                                                            }
                                                    </div>
                                                </div>
                                            </div>
                                            :null}
                                        </div>
                                        <Transition appear show={changeAddressPopup} as={Fragment}>
                                            <Dialog as="div" className="relative z-40" onClose={() => setchangeAddressPopup(!changeAddressPopup)}>
                                            <div className="fixed inset-0 bg-dark/40" aria-hidden="true" />
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="fixed inset-0 bg-black/25" />
                                            </Transition.Child>
        
                                            <div className="fixed inset-0 overflow-y-auto">
                                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100 scale-100"
                                                        leaveTo="opacity-0 scale-95"
                                                    >
                                                        <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                                            <div className="flex bg-white items-center justify-between px-5 pt-4">
                                                                <h5 className='text-base font-[600] flex items-center gap-x-2 text-[#004B7A] fill-[#004B7A]'>
                                                                    {params.lang == 'ar' ? 'تغيير العنوان' : 'Change address'}
                                                                </h5>
                                                                <button type="button" className="focus-visible:outline-none text-dark hover:text-dark fill-dark" onClick={() => setchangeAddressPopup(false)}>
                                                                    <svg height="16" viewBox="0 0 329.26933 329" width="16" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                                                </button>
                                                            </div>
                                                            <div className="p-5">
                                                                <div className="mx-auto w-full">
                                                                    <RadioGroup value={addressid} onChange={(e) => {
                                                                        setaddressid(e)
                                                                        setchangeAddressPopup(false)
                                                                    }}>
                                                                        <div className="space-y-3">
                                                                            {addressData?.map((data: any, i: any) => {
                                                                                return (
                                                                                    <RadioGroup.Option
                                                                                        key={data.id}
                                                                                        value={data?.id}
                                                                                        className={({ active, checked }) =>
                                                                                            `${checked
                                                                                                ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                                                                                                : ''
                                                                                            }   
                                                                                        ${checked ? 'bg-[#219EBC] text-white border' : 'bg-[#FFFFFF] border border-[#219EBC80] text-primary'}
                                                                                            relative flex cursor-pointer rounded-lg p-3 shadow-md focus:outline-none border-[#219EBC80]`
                                                                                        }
                                                                                    >
                                                                                        {({ active, checked }) => (
                                                                                            <>
                                                                                                <div className="flex w-full items-center justify-between">
                                                                                                    <div className="flex items-center gap-x-3 w-full">
                                                                                                        {checked ?
                                                                                                            <>
                                                                                                                <div className="shrink-0 text-white">
                                                                                                                    <CheckIcon className="h-6 w-6" />
                                                                                                                </div>
                                                                                                            </>
                                                                                                            :
                                                                                                            <div className='bg-primary h-6 w-6 border p-2 rounded-full opacity-10 border-primary'></div>
                                                                                                        }
                                                                                                        <div className="w-full">
                                                                                                            <RadioGroup.Label as="p" className={`text-sm font-bold  mb-3 ${checked ? 'text-white' : 'text-[#004B7A]'}`}>
                                                                                                                {data?.make_default == 1 ? params.lang == 'ar' ? 'الــمنـــزل' : 'Home' : params.lang == 'ar' ? 'مكتب' : 'Office'}
                                                                                                                {data?.make_default == 1 ?
                                                                                                                    <span className={`px-2 py-1 bg-[#219EBC30] text-xs rounded-sm text-[#219EBC] ml-2 rtl:mr-2 ${checked ? 'text-white bg-[#FFFFFF30]' : ''}`}>{params.lang == 'ar' ? 'العنوان الرئيسي' : 'Primary Address'}</span>
                                                                                                                    : null}
                                                                                                            </RadioGroup.Label>
                                                                                                            <p className={`mt-1 text-xs ${checked ? 'text-white' : 'text-[#5D686F]'}`}>{data?.address}</p>
                                                                                                            <p className={`mt-1.5 text-xs font-bold ${checked ? 'text-white' : 'text-[#5D686F]'}`}>{params.lang == 'ar' ? data?.state_data?.region?.name_arabic : data?.state_data?.region?.name}, {params.lang == 'ar' ? data?.state_data?.name_arabic : data?.state_data?.name} | {params.lang == 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</p>
                                                                                                            {data?.shippinginstractions ?
                                                                                                                <div className="mt-3">
                                                                                                                    <p className={`mt-3 text-xs font-bold ${checked ? 'text-white' : 'text-[#5D686F]'}`}>{params.lang == 'ar' ? 'تعليمات الشحن' : 'Shipping Instructions'}:</p>
                                                                                                                    <p className={`mt-1 text-xs font-light ${checked ? 'text-white' : 'text-[#5D686F]'}`}>
                                                                                                                        {data?.shippinginstractions}
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                                : null}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </>
                                                                                        )}
                                                                                    </RadioGroup.Option>
                                                                                )
                                                                            })
                                                                            }
                                                                        </div>
                                                                    </RadioGroup>
                                                                </div>
                                                            </div>
                                                        </Dialog.Panel>
                                                    </Transition.Child>
                                                </div>
                                            </div>
                                            </Dialog>
                                        </Transition>
                                        </>
                                        : null}
                                    {/* Order Pickup */}
                                    {/* {pickOrder === true ?
                                        <div>

                                        </div>
                                        : null} */}
                                </div>
                            </>
                            : null}
                        {activeTab3 === 2 ?
                            <div className='my-4'>
                                <span className="text-[#B15533] text-sm">{params.lang == 'ar' ? 'بيانات التواصل معك' : 'Contact information with you'}</span>
                                <div className="mt-2 border bg-white border-[#219EBC] rounded-md p-3">
                                    <div>
                                        <div className="flex items-center justify-between text-sm">
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'التواصل' : 'Communication'}</label>
                                        </div>
                                        <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-xs">
                                            <label className="">{email}</label>
                                            <label className="">-</label>
                                            <label className="" dir="ltr">{'+966 ' + (phoneNumber)?.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')}</label>
                                        </div>
                                        <hr className="opacity-10 my-3" />
                                    </div>
                                    {addressData.filter((element: any) => element.id == addressid).map((data: any, i: any) => {
                                        return (
                                            <div key={addressData?.id + 1}>
                                                <div className="flex items-center justify-between text-sm">
                                                    <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'العنوان' : 'Address'}</label>
                                                    <button className="focus-visible:outline-none text-[#FF671F] hover:underline" onClick={() => setActiveTab3(1)}>{params.lang == 'ar' ? 'تغــيــيـر' : 'Change'}</button>
                                                </div>
                                                <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] fill-[#004B7A] font-regular text-xs">
                                                    <svg id="fi_3514361" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m128 138.184a5 5 0 0 1 -3.607-1.538c-2.075-2.16-50.808-53.259-50.808-82.228a54.415 54.415 0 1 1 108.83 0c0 28.969-48.733 80.068-50.808 82.228a5 5 0 0 1 -3.607 1.538zm0-128.184a44.465 44.465 0 0 0 -44.415 44.418c0 19.07 29.312 54.978 44.414 71.451 15.1-16.478 44.416-52.4 44.416-71.451a44.465 44.465 0 0 0 -44.415-44.418z"></path><path d="m128 76.153a21.735 21.735 0 1 1 21.735-21.735 21.759 21.759 0 0 1 -21.735 21.735zm0-33.47a11.735 11.735 0 1 0 11.735 11.735 11.748 11.748 0 0 0 -11.735-11.735z"></path><path d="m128.126 256a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.559a5 5 0 0 1 -2.5-4.331v-38.385a5 5 0 0 1 10 0v35.5l72.175 41.67 72.174-41.67v-35.88a5 5 0 0 1 10 0v38.765a5 5 0 0 1 -2.5 4.331l-77.174 44.556a4.992 4.992 0 0 1 -2.5.673z"></path><path d="m128.126 166.884a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.557a5 5 0 1 1 5-8.66l74.675 43.113 74.674-43.11a5 5 0 1 1 5 8.66l-77.174 44.557a4.992 4.992 0 0 1 -2.5.667z"></path><path d="m160.933 198.291a5 5 0 0 1 -3.459-1.389l-32.806-31.402a5 5 0 0 1 6.916-7.224l30.1 28.813 68.154-39.349-27.558-26.382-27.359-15.744a5 5 0 1 1 4.988-8.667l27.885 16.047a4.988 4.988 0 0 1 .964.721l32.806 31.407a5 5 0 0 1 -.958 7.942l-77.174 44.557a4.993 4.993 0 0 1 -2.499.67z"></path><path d="m95.067 198.525a4.985 4.985 0 0 1 -2.5-.67l-77.173-44.555a5 5 0 0 1 -.957-7.942l33.057-31.642a4.967 4.967 0 0 1 .957-.718l27.634-15.955a5 5 0 1 1 5 8.66l-27.112 15.653-27.807 26.616 68.154 39.348 30.349-29.048a5 5 0 1 1 6.914 7.224l-33.058 31.641a4.991 4.991 0 0 1 -3.458 1.388z"></path></svg>
                                                    <div>
                                                        <p className="font-bold mb-1.5">{data.address_label == 1 ? params.lang == 'ar' ? 'الــمنـــزل' : 'Home' : params.lang == 'ar' ? 'مكتب' : 'Office'}</p>
                                                        <label className="">{data.address}</label>
                                                        <p className="font-medium text-xs">{params.lang == 'ar' ? data.state_data?.name_arabic : data.state_data?.name}, {params.lang == 'ar' ? data.state_data?.region?.name_arabic : data.state_data?.region?.name} | {params.lang == 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</p>
                                                    </div>
                                                </div>
                                                <hr className="opacity-10 my-3" />
                                            </div>
                                        )
                                    })
                                    }
                                    {expressDeliveryData?.data && expressDeliveryDataStatus ?

                                        <div className="text-sm font-medium">
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? expressDeliveryData?.data?.title_name : expressDeliveryData?.data?.title}</label>
                                            <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-xs">
                                                <label className="">{moment().add(expressDeliveryData?.data?.num_of_days, 'days').locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY")}</label>
                                            </div>
                                        </div>
                                        :
                                        <div className="text-sm font-medium">
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'الوقت المتوقع للتوصيل' : 'Expected time for delivery'}</label>
                                            <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-xs">
                                                <label className="">{moment().add(7, 'days').locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY")}</label>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="mt-8">
                                    <h6 className="text-[#B15533]">{params.lang == 'ar' ? 'الدفع' : 'Paying off'}</h6>
                                    <label className="text-[#004B7A] text-xs">{params.lang == 'ar' ? 'اختـار طريقة الدفع الخاصة بك' : 'Choose your payment method'}</label>

                                    <RadioGroup value={paymentMethod} onChange={setpaymentMethod} className="mt-3">
                                        <div className="grid grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 gap-x-3">
                                            {paymentmethods?.map((p: any, i) => {
                                                if (paymentstatus[p.key + '_status'] || (p.key == 'madapay' && paymentstatus['hyperpay_status'])) {
                                                    return (
                                                        <>
                                                            <RadioGroup.Option
                                                                key={p.key}
                                                                value={p.key}
                                                                className={({ active, checked }) => `${active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : ''}
                                                                        ${checked ? 'border-[#219EBC] text-white border bg-[#219EBC]' : 'bg-[#FFFFFF] border border-[#219EBC03]'}
                                                                            relative flex cursor-pointer rounded-lg p-2 shadow-md focus:outline-none border-[#219EBC80] mb-3`}
                                                            >
                                                                {({ active, checked }) => (
                                                                    <>
                                                                        <div className="flex-1 items-center justify-center">
                                                                            <div className='absolute top-3 z-10'>
                                                                                {checked ?
                                                                                    <>
                                                                                        {checked && (
                                                                                            <div className="shrink-0 text-white">
                                                                                                <CheckIcon className="h-6 w-6" />
                                                                                            </div>
                                                                                        )}
                                                                                    </>
                                                                                    :
                                                                                    <div className='bg-primary h-6 w-6 border p-2 rounded-full opacity-10 border-primary'></div>
                                                                                }
                                                                            </div>
                                                                            <Image
                                                                                src={p.image}
                                                                                alt={p.name}
                                                                                title={p.name}
                                                                                height={60}
                                                                                width={60}
                                                                                loading='lazy'
                                                                                className="rounded-md mx-auto max-md:mt-10"
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </RadioGroup.Option>
                                                        </>
                                                    )
                                                }
                                            })
                                            }

                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            : null}
                        {activeTab3 === 3 ?
                            <div className='my-4'>
                                <span className="text-[#B15533] text-sm">{params.lang == 'ar' ? 'بيانات التواصل معك' : 'Contact information with you'}</span>
                                <div className="mt-2 border bg-white border-[#219EBC] rounded-md p-3">
                                    <div>
                                        <div className="flex items-center justify-between text-sm">
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'التواصل' : 'Communication'}</label>
                                        </div>
                                        <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-xs">
                                            <label className="">{email}</label>
                                            <label className="">-</label>
                                            <label className="" dir="ltr">{'+966 ' + (phoneNumber)?.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')}</label>
                                        </div>
                                        <hr className="opacity-10 my-3" />
                                    </div>
                                    {addressData?.filter((element: any) => element.id == addressid).map((data: any, i: any) => {
                                        return (
                                            <div key={i * 3}>
                                                <div className="flex items-center justify-between text-sm">
                                                    <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'العنوان' : 'Address'}</label>
                                                    <button className="focus-visible:outline-none text-[#FF671F] hover:underline" onClick={() => setActiveTab3(1)}>{params.lang == 'ar' ? 'تغــيــيـر' : 'Change'}</button>
                                                </div>
                                                <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] fill-[#004B7A] font-regular text-xs">
                                                    <svg id="fi_3514361" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m128 138.184a5 5 0 0 1 -3.607-1.538c-2.075-2.16-50.808-53.259-50.808-82.228a54.415 54.415 0 1 1 108.83 0c0 28.969-48.733 80.068-50.808 82.228a5 5 0 0 1 -3.607 1.538zm0-128.184a44.465 44.465 0 0 0 -44.415 44.418c0 19.07 29.312 54.978 44.414 71.451 15.1-16.478 44.416-52.4 44.416-71.451a44.465 44.465 0 0 0 -44.415-44.418z"></path><path d="m128 76.153a21.735 21.735 0 1 1 21.735-21.735 21.759 21.759 0 0 1 -21.735 21.735zm0-33.47a11.735 11.735 0 1 0 11.735 11.735 11.748 11.748 0 0 0 -11.735-11.735z"></path><path d="m128.126 256a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.559a5 5 0 0 1 -2.5-4.331v-38.385a5 5 0 0 1 10 0v35.5l72.175 41.67 72.174-41.67v-35.88a5 5 0 0 1 10 0v38.765a5 5 0 0 1 -2.5 4.331l-77.174 44.556a4.992 4.992 0 0 1 -2.5.673z"></path><path d="m128.126 166.884a4.992 4.992 0 0 1 -2.5-.67l-77.175-44.557a5 5 0 1 1 5-8.66l74.675 43.113 74.674-43.11a5 5 0 1 1 5 8.66l-77.174 44.557a4.992 4.992 0 0 1 -2.5.667z"></path><path d="m160.933 198.291a5 5 0 0 1 -3.459-1.389l-32.806-31.402a5 5 0 0 1 6.916-7.224l30.1 28.813 68.154-39.349-27.558-26.382-27.359-15.744a5 5 0 1 1 4.988-8.667l27.885 16.047a4.988 4.988 0 0 1 .964.721l32.806 31.407a5 5 0 0 1 -.958 7.942l-77.174 44.557a4.993 4.993 0 0 1 -2.499.67z"></path><path d="m95.067 198.525a4.985 4.985 0 0 1 -2.5-.67l-77.173-44.555a5 5 0 0 1 -.957-7.942l33.057-31.642a4.967 4.967 0 0 1 .957-.718l27.634-15.955a5 5 0 1 1 5 8.66l-27.112 15.653-27.807 26.616 68.154 39.348 30.349-29.048a5 5 0 1 1 6.914 7.224l-33.058 31.641a4.991 4.991 0 0 1 -3.458 1.388z"></path></svg>
                                                    <div>
                                                        <p className="font-bold mb-1.5">{data.address_label == 1 ? params.lang == 'ar' ? 'الــمنـــزل' : 'Home' : params.lang == 'ar' ? 'مكتب' : 'Office'}</p>
                                                        <label className="">{data?.address}</label>
                                                        <p className="font-medium text-xs">{params.lang == 'ar' ? data.state_data?.name_arabic : data.state_data?.name}, {params.lang == 'ar' ? data.state_data?.region?.name_arabic : data.state_data?.region?.name} | {params.lang == 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</p>
                                                    </div>
                                                </div>
                                                <hr className="opacity-10 my-3" />
                                            </div>
                                        )
                                    })
                                    }
                                    {expressDeliveryData?.data && expressDeliveryDataStatus ?
                                        <div className="text-sm font-medium">
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? expressDeliveryData?.data?.title_name : expressDeliveryData?.data?.title}</label>
                                            <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-xs">
                                                <label className="">{moment().add(expressDeliveryData?.data?.num_of_days, 'days').locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY")}</label>
                                                {/* <label className="">-</label>
                                        <label className=""> {params.lang == 'ar' ? 'الاثنين' : 'Monday'} 13/11/2023</label> */}
                                            </div>
                                            <hr className="opacity-10 my-3" />
                                        </div>
                                        :
                                        <div className="text-sm font-medium">
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'الوقت المتوقع للتوصيل' : 'Expected time for delivery'}</label>
                                            <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] font-regular text-xs">
                                                <label className="">{moment().add(7, 'days').locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY")}</label>
                                                {/* <label className="">-</label>
                                            <label className=""> {params.lang == 'ar' ? 'الاثنين' : 'Monday'} 13/11/2023</label> */}
                                            </div>
                                            <hr className="opacity-10 my-3" />
                                        </div>
                                    }

                                    {doorStepDataStatus ?
                                        <>
                                            <div className="text-sm font-medium">
                                                <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? doorStepData?.title_arabic : doorStepData?.title}</label>
                                                <div className="mt-1 rtl:mt-2 text-[#004B7A] font-regular text-xs">
                                                    The item's will be delivered into your order step ...
                                                </div>
                                                <hr className="opacity-10 my-3" />
                                            </div>
                                        </>
                                        : null}

                                    <div className="text-sm font-medium flex items-center justify-between">
                                        <div>
                                            <label className="font-regular text-[#5D686F]">{params.lang == 'ar' ? 'الدفع عن طريق' : 'Payment via'}{' '}<span className="font-bold text-[#004B7A]">{paymentMethod}</span></label>
                                            <div className="flex items-center gap-x-2 mt-1 rtl:mt-2 text-[#004B7A] text-xs">
                                                <label>
                                                    {
                                                        paymentMethod == 'tamara' ? params.lang == 'ar' ? `غدا تقسيط علي 4 شهور بمبلغ ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} ريال في الشهر` : `Installments for 4 months at an amount of ${Intl.NumberFormat('en-US').format(summary?.price?.filter((element: any) => element.name == 'total')[0]?.price / 4)} per month`
                                                            : paymentMethod == 'tabby' ? params.lang == 'ar' ? `غدا تقسيط علي 4 شهور بمبلغ ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} ريال في الشهر` : `Installments for 4 months at an amount of ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} per month`
                                                                : paymentMethod == 'madfu' ? params.lang == 'ar' ? `غدا تقسيط علي 4 شهور بمبلغ ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} ريال في الشهر` : `Installments for 4 months at an amount of ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} per month`
                                                                    : paymentMethod == 'mispay' ? params.lang == 'ar' ? `غدا تقسيط علي 4 شهور بمبلغ ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} ريال في الشهر` : `Installments for 4 months at an amount of ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} per month`
                                                                        : paymentMethod == 'clickpay' ? params.lang == 'ar' ? `غدا تقسيط علي 4 شهور بمبلغ ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} ريال في الشهر` : `Installments for 4 months at an amount of ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 4)} per month`
                                                                            : paymentMethod == 'tasheel' ? params.lang == 'ar' ? `غدا تقسيط علي 36 شهور بمبلغ ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 36)} ريال في الشهر` : `Installments for 36 months at an amount of ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price / 36)} per month`
                                                                                : paymentMethod == 'madapay' ? params.lang == 'ar' ? `الدفع النقدي ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}` : `Instant pay ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}`
                                                                                    : paymentMethod == 'applepay' || paymentMethod == 'clickpay_applepay' ? params.lang == 'ar' ? `الدفع النقدي ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}` : `Instant pay ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}`
                                                                                        : paymentMethod == 'hyperpay' ? params.lang == 'ar' ? `الدفع النقدي ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}` : `Instant pay ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}`
                                                                                            : paymentMethod == 'cod' ? params.lang == 'ar' ? `الدفع عند الاستلام ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}` : `Paid upon delivery ${Intl.NumberFormat('en-US').format(summary?.filter((element: any) => element.key == 'total')[0]?.price)}`
                                                                                                : null
                                                    }
                                                </label>
                                                {currencySymbol}
                                            </div>
                                        </div>
                                        {paymentMethod == 'hyperpay' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/master.webp' : '/images/master.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'madapay' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/mada.webp' : '/images/mada.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'applepay' || paymentMethod == 'clickpay_applepay' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/applepay.webp' : '/images/applepay.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={params?.devicetype === 'mobile' ? 60 : 80}
                                                width={params?.devicetype === 'mobile' ? 60 : 80}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'cod' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/cod.webp' : '/images/cod.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'tabby' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/tabby-ar.webp' : '/images/tabby-en.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'madfu' ?
                                            <Image
                                                src={'/images/madfu.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'mispay' ?
                                            <Image
                                                src={'/images/misspay.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'clickpay' ?
                                            <Image
                                                src={'/images/clickpay.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={params?.devicetype === 'mobile' ? 60 : 80}
                                                width={params?.devicetype === 'mobile' ? 60 : 80}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'tamara' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/tamara-ar.webp' : '/images/tamara-en.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                        {paymentMethod == 'tasheel' ?
                                            <Image
                                                src={params.lang == 'ar' ? '/images/baseeta.webp' : '/images/baseeta.webp'}
                                                alt={paymentMethod}
                                                title={paymentMethod}
                                                height={60}
                                                width={60}
                                                loading='lazy'
                                                className="rounded-md"
                                            />
                                            : null}
                                    </div>
                                </div>
                                {doorStepData ?
                                    <div className="mt-2 text-[#004B7A] font-regular text-xs bg-white p-3 shadow-md rounded-md border border-[#219EBC] flex items-center justify-between gap-x-4">
                                        <div className="flex items-center gap-x-4">
                                            <svg id="fi_10112476" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                            <div className="font-bold">
                                                <h6 className="text-[#004B7A] text-sm">{params.lang == 'ar' ? doorStepData?.title_arabic : doorStepData?.title}</h6>
                                                <span className="text-xs font-medium text-[#5D686F]">{params.lang == 'ar' ? 'من المتوقع أن يتم التسليم يوم' : 'Delivery is expected to take place on'} <span className="font-bold">{moment().add(2, 'days').locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD, YYYY")}</span></span>
                                                <p className="text-[#B15533] mt-2 text-lg flex gap-1 items-center">+ {doorStepData?.price}{currencySymbol}</p>
                                            </div>
                                        </div>
                                        <label className="w-12 h-6 relative">
                                            <input onChange={(e) => {
                                                addDoorStep(e.target.checked)
                                            }}
                                                type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-[#219EBC] before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    : null}
                            </div>
                            : null}
                    </div>
                    <div className="md:w-1/2 w-full max-md:pb-10">
                        <h3 className='text-base mb-1 md:text-lg font-bold md:mb-3'>{params.lang == 'ar' ? 'تفاصيل الطلب الخاص بك' : 'Checkout Summary'}</h3>
                        <div className="bg-white rounded-md shadow-md p-3">
                            {summary?.map((s: any, i: number) => {
                                if (s?.key == 'total') {
                                    return (
                                        <>
                                            <hr className="opacity-10 mb-4" key={i} />
                                            <div className="flex items-center justify-between text-lg font-bold" key={i}>
                                                <h6 className="text-[#1C262D] capitalize">{params.lang === 'ar' ? s.title_arabic : s.title}</h6>
                                                <span className="text-[#004B7A] flex gap-1 items-center">{s?.price?.toLocaleString('EN-US')}{currencySymbol}</span>
                                            </div>
                                        </>
                                    )
                                }
                                return (
                                    <div className="flex items-center justify-between text-sm font-medium mb-3" key={i}>
                                        <h6 className={`text-[#1C262D] capitalize`}>{params.lang === 'ar' ? s?.title_arabic : s?.title}</h6>
                                       <span className={`flex gap-1 items-center ${s.key == 'save' || s?.key == 'discountRule' || s?.key == 'discountCoupon' ? 'text-[#20831E]' : 'text-[#004B7A]'}`}><span className="font-bold flex items-center gap-1">{s?.price?.toLocaleString('EN-US')}</span>{currencySymbol}</span>
                                    </div>
                                )
                            })
                            }
                            <div className="flex items-center justify-between gap-x-2 mt-4">
                                <div className="pb-3.5 pt-3 px-3 bg-white rounded-md border flex items-center border-[#5D686F30] gap-x-2 w-full">
                                    <input className="focus-visible:outline-none w-full text-sm font-normal active:border-primary focus-within:border-[#004B7A]" placeholder={params.lang == 'ar' ? 'رمز الكوبون' : 'Coupon Code'} type="text"
                                        disabled={typeof window !== 'undefined' && getCoupon().amount ? true : false} value={couponcode} onChange={(e) => { setcouponcode(e.target.value) }}
                                    />
                                </div>
                                {typeof window !== 'undefined' && getCoupon().amount ?
                                    <button onClick={() => couponremove()}
                                        className="focus-visible:outline-none btn bg-[#EB5757] rounded-md fill-white h-[3rem] border border-[#EB5757] w-14 flex items-center justify-center">
                                        <svg height="14" viewBox="0 0 329.26933 329" width="14" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                    </button>
                                    :
                                    <button onClick={() => couponApplied()} className="focus-visible:outline-none btn bg-[#004B7A] rounded-md fill-white h-[3rem] border border-[#004B7A] w-14 flex items-center justify-center">
                                        <svg id="fi_9249233" enableBackground="new 0 0 24 24" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg"><path d="m18.7 7.2c-.4-.4-1-.4-1.4 0l-7.5 7.5-3.1-3.1c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l3.8 3.8c.2.2.4.3.7.3s.5-.1.7-.3l8.2-8.2c.4-.4.4-1 0-1.4z"></path></svg>
                                    </button>
                                }

                            </div>
                        </div>
                        {activeTab3 === 1 || activeTab3 === 2 ?
                            null
                            :
                            <div className="space-y-3 mt-3 py-4">
                                <h3 className='text-base md:text-lg font-bold'>{params.lang == 'ar' ? 'قائمة المنتجات الخاصة بك' : 'Products'}</h3>
                                <span className="text-[#5D686F] text-xs font-light">{params.lang == 'ar' ? `لديك (${checkoutData?.products?.length}) منتجات في العربة` : `You have (${checkoutData?.products?.length}) products in the cart`}</span>
                                {checkoutData?.products?.map((pro: any, i: number) => {
                                    //if (!pro.bogo) {
                                    var prototalqty = []
                                    for (let index = 0; index < pro.total_quantity; index++) {
                                        prototalqty.push({ value: (index + 1), label: (index + 1) })
                                    }
                                    return (
                                        <>
                                            {/* Express Content Copy */}
                                            <div className="bg-white rounded-md shadow-md mb-4" key={pro.id}>
                                                <div className='flex items-center gap-x-4 relative'>
                                                    <div className="w-34">
                                                        <Image
                                                            src={pro.image}
                                                            alt={params.lang == 'ar' ? pro.name_arabic : pro.name}
                                                            title={params.lang == 'ar' ? pro.name_arabic : pro.name}
                                                            height={100}
                                                            width={100}
                                                            loading='lazy'
                                                            className="rounded-md mx-auto"
                                                        />
                                                    </div>
                                                    {pro.regular_price > pro.price ? <div className='absolute text-[#EA4335] text-xs moment ltr:left-0 rtl:right-0 top-0 bg-[#EA433520] px-3.5 py-1 rtl:rounded-bl-lg ltr:rounded-br-lg ltr:rounded-tl-lg w-34'>{params.lang == 'ar' ? Math.round(((pro.regular_price - pro.price) * 100) / pro.regular_price) + '% خصم' : Math.round(((pro.regular_price - pro.price) * 100) / pro.regular_price) + '% OFF'}</div> : null}
                                                    <div className="flex items-end justify-between w-full p-3">
                                                        <div>
                                                            {pro.pre_order ?
                                                                <>
                                                                    <p className="text-sm text-[#DC4E4E] font-medium">{params?.lang === 'ar' ? 'اطلب مسبقًا الآن' : 'Pre-Order Now'}</p>
                                                                    <p className="text-sm text-primary font-medium">{params?.lang === 'ar' ? 'سلمت بواسطة' : 'Delivered by'}: {moment().add(pro.pre_order_day, 'days').locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM DD, YYYY")}</p>
                                                                </>
                                                                : null}
                                                            <h4 className="text-primary text-xs line-clamp-2">{params.lang == 'ar' ? pro.name_arabic : pro.name}</h4>
                                                            <h2 className="text-base font-semibold text-dark mt-2 flex gap-1 items-center">{pro.bogo ? pro.discounted_amount.toLocaleString('EN-US') :  pro.price.toLocaleString('EN-US')}{'  '}{currencySymbol}{pro.regular_price > pro.price ? <span className="text-xs text-[#DC4E4E] line-through decoration-[#DC4E4E] decoration-2 font-medium">{pro.regular_price.toLocaleString('EN-US')}</span> : null}</h2>
                                                        </div>
                                                        <div className="flex items-center gap-x-2 text-xs">
                                                            <span className="font-medium">{params.lang == 'ar' ? 'عدد' : 'Qty'}:</span>
                                                            <p className="font-bold">{pro.quantity}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* {!pro?.bogo ?  */}
                                                <>
                                                    <hr className='my-2 opacity-5' />
                                                    {pro.express && pro?.express_qty >= pro?.quantity ?

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
                                                                            ? <>فقط <span className="text-[#219EBC] font-bold">{pro?.express_total_qty}</span> حبه متاحه للتوصيل السريع خلال 24 إلى 48 ساعة</>
                                                                            : <>Only <span className="text-[#219EBC] font-bold">{pro?.express_total_qty}</span> quantity is available in 24 to 48 hours express delivery</>
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    :
                                                    <div className='flex items-center gap-x-4 my-2'>
                                                        <svg id="fi_10112476" height="35" viewBox="0 0 512 512" width="35" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                                        <div className='text-xs font-normal'>
                                                            <h6 className='font-semibold text-sm'>{params?.lang == "ar" ? "ومن المتوقع أن يتم التسليم في " : "Delivery is expected to take place on " + moment().add(1, 'days').format('DD MMM')} {moment().add(5, 'days').format('DD MMM')}</h6>
                                                            <p>{params?.lang == "ar" ? `اطلب خلال ساعة و4 دقائق` : `Order in 1 h 4 m`}</p>
                                                        </div>
                                                    </div>
                                                    }
                                                </>
                                                {/* :null} */}
                                            </div>
                                            {pro?.gift?.length ?
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {pro?.gift?.map((giftData: any, i: number) => {
                                                        return (
                                                            <div className={`bg-[#EEF8FC] shadow-md rounded-md p-3`} key={i * 4}>
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
                                                                    <div>
                                                                        <h3 className="text-[#004B7A] mt-3 text-xs text-left rtl:text-right line-clamp-2">{params.lang == 'ar' ? giftData?.name_arabic : giftData?.name}</h3>
                                                                        <div className="flex items-center justify-between">
                                                                            <h6 className="font-bold text-[#EA4335] mt-1 text-xs text-left rtl:text-right flex gap-1 items-center">{giftData.discounted_amount.toLocaleString('EN-US')}{currencySymbol}</h6>
                                                                            <h6 className="font-normal mt-1 text-xs text-left rtl:text-right">{params.lang == 'ar' ? 'عدد' : 'Qty'}: {giftData?.quantity}</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr className='my-2 opacity-5' />
                                                                {(pro.express && pro?.express_qty >= pro?.quantity) && giftData.express && giftData?.express_qty >= giftData?.quantity ?
                                                                    <div className='flex items-center gap-x-4 mx-2 mt-2 bg-[#fde18d] rounded-md p-2 w-[-webkit-fit-content]'>
                                                                        <Image
                                                                            src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                            width="65" height="0" alt="express_delivery" title='Express Delivery' className='bg-white p-2.5 rounded-md'
                                                                        />
                                                                        <div className='text-sm font-normal'>
                                                                            <h6 className='font-bold text-base'>{params?.lang == "ar" ? "احصل عليه في غضون 24 الى 48 ساعة" : "Get it in 24 to 48 hours"}</h6>
                                                                            <p className=''>
                                                                                {params.lang === 'ar'
                                                                                    ? <>فقط <span className="text-[#219EBC] font-bold">{giftData?.express_total_qty}</span> حبه متاحه للتوصيل السريع خلال 24 إلى 48 ساعة</>
                                                                                    : <>Only <span className="text-[#219EBC] font-bold">{giftData?.express_total_qty}</span> quantity is available in 24 to 48 hours express delivery</>
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className='flex items-center gap-x-4'>
                                                                        <svg id="fi_10112476" height="35" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                                                        <div className='text-xs font-normal'>
                                                                            <h6 className='font-semibold text-sm'>{params?.lang == "ar" ? "احصل عليه خلال 24 ساعة" : "Delivery is expected to take place on " + moment().add(1, 'days').format('DD MMM')} {moment().add(5, 'days').format('DD MMM')}</h6>
                                                                            <p>{params?.lang == "ar" ? `فقط ${3} متاحة خلال 24 ساعة للتوصيل السريع` : `Order in 1 h 4 m`}</p>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                </div>
                                                : null}
                                            {pro?.fbt?.length ?
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {pro?.fbt?.map((giftData: any, i: number) => {
                                                        return (
                                                            <div className={`bg-[#EEF8FC] shadow-md rounded-md p-3 ${pro?.fbt?.length > 1 ? 'max-md:w-72' : 'w-full'}`} key={i * 6}>
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
                                                                    <div>
                                                                        {pro.pre_order ?
                                                                            <p className="text-sm text-[#DC4E4E] font-medium">{params.lang === 'ar' ? 'اطلب مسبقًا الآن' : 'Pre-Order Now'}</p>
                                                                            : null}
                                                                        <h3 className="text-[#004B7A] mt-3 text-xs text-left rtl:text-right line-clamp-2">{params.lang == 'ar' ? giftData?.name_arabic : giftData?.name}</h3>
                                                                        <div className="flex items-center justify-between">
                                                                            <p className="text-[#EA4335] text-sm">{params.lang == 'ar' ? pro.discounted_amount.toLocaleString('EN-US') + ' ر.س' : 'SR ' + giftData?.discounted_amount.toLocaleString('EN-US')}{'  '}</p>
                                                                            <h6 className="font-normal mt-1 text-xs text-left rtl:text-right">{params.lang == 'ar' ? 'عدد' : 'Qty'}: {giftData?.quantity}</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr className='my-2 opacity-5' />
                                                                {(pro.express && pro?.express_qty >= pro?.quantity) && giftData.express && giftData?.express_qty >= giftData?.quantity ?
                                                                    <div className='flex items-center gap-x-4 mx-2 mt-2 bg-[#fde18d] rounded-md p-2 w-[-webkit-fit-content]'>
                                                                        <Image
                                                                            src={params?.lang == 'ar' ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                                                                            width="65" height="0" alt="express_delivery" title='Express Delivery' className='bg-white p-2.5 rounded-md'
                                                                        />
                                                                        <div className='text-sm font-normal'>
                                                                            <h6 className='font-bold text-base'>{params?.lang == "ar" ? "احصل عليه في غضون 24 الى 48 ساعة" : "Get it in 24 to 48 hours"}</h6>
                                                                            <p className=''>
                                                                                {params.lang === 'ar'
                                                                                    ? <>فقط <span className="text-[#219EBC] font-bold">{giftData?.express_total_qty}</span> حبه متاحه للتوصيل السريع خلال 24 إلى 48 ساعة</>
                                                                                    : <>Only <span className="text-[#219EBC] font-bold">{giftData?.express_total_qty}</span> quantity is available in 24 to 48 hours express delivery</>
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className='flex items-center gap-x-4'>
                                                                        <svg id="fi_10112476" height="35" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m310.168 100.287c6.255 0 11.357 5.103 11.357 11.357v261.113h-264.358c-12.456 0-22.62-10.162-22.62-22.62v-238.494c0-6.254 5.102-11.357 11.357-11.357h264.264z" fill="#323e66"></path><path d="m321.525 372.757h-264.358c-12.459 0-22.62-10.162-22.62-22.62v-38.283h286.978v60.904z" fill="#e37500"></path><path d="m483.254 372.757h-161.729v-186.34h97.774c7.146 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#f9ac00"></path><path d="m467.005 372.757h-145.48v-186.34h81.524c7.147 0 13.298 2.704 18.13 7.97l39.349 42.88c4.331 4.72 6.477 10.231 6.477 16.637v118.854z" fill="#fdc72e"></path><path d="m368.851 257.715v-52.102h78.88l29.046 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812z" fill="#e9e9ff"></path><path d="m368.851 257.715v-52.102h62.63l29.047 31.653c4.331 4.72 6.477 10.231 6.477 16.637v3.812h-98.153z" fill="#f0f0ff"></path><path d="m483.254 350.966h-448.708v21.79h450.364c8.861 0 16.089-7.227 16.089-16.089v-29.336h-17.745z" fill="#7986bf"></path></g><path d="m34.546 332.788h23.169v18.178h-23.169z" fill="#323e66"></path><path d="m460.89 291.132h22.364v25.908h-22.364z" fill="#323e66"></path><circle cx="396.154" cy="372.757" fill="#323e66" r="38.953"></circle><path d="m396.154 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><circle cx="118.375" cy="372.757" fill="#323e66" r="38.953" transform="matrix(.987 -.162 .162 .987 -58.875 24.127)"></circle><path d="m118.375 391.897c10.542 0 19.14-8.598 19.14-19.14s-8.598-19.14-19.14-19.14-19.14 8.598-19.14 19.14 8.598 19.14 19.14 19.14z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 235.62h76.233v76.233h-76.233z" fill="#e6b17c"></path><path d="m178.996 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#fdc72e" fillRule="evenodd"></path><path d="m152.024 159.387h76.233v76.233h-76.233z" fill="#ba8047"></path><path d="m178.996 159.387h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#2dd62d" fillRule="evenodd"></path><path d="m228.257 235.62h76.233v76.233h-76.233z" fill="#dea368"></path><path d="m255.228 235.62h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#fb545c" fillRule="evenodd"></path><path d="m228.257 135.311h76.233v100.309h-76.233z" fill="#fdd7ad"></path><path d="m255.228 135.311h22.289v24.799l-11.144-5.593-11.145 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m75.791 235.62h76.233v76.233h-76.233z" fill="#fdd7ad"></path><path d="m102.763 235.62h22.289v24.799l-11.145-5.593-11.144 5.593z" fill="#5caeff" fillRule="evenodd"></path><path d="m321.525 186.416h93.116l-15.238-15.238c-2.093-2.093-4.64-3.148-7.599-3.148h-70.279z" fill="#e37500" fillRule="evenodd"></path><path d="m75.791 235.62h8.362v76.233h-8.362z" fill="#f2c496"></path><path d="m152.024 235.62h8.362v76.233h-8.362z" fill="#dea368"></path><path d="m228.257 235.62h8.362v76.233h-8.362z" fill="#d19458"></path><path d="m228.257 135.311h8.362v100.309h-8.362z" fill="#f2c496"></path><path d="m152.024 159.387h8.362v76.233h-8.362z" fill="#ab733a"></path><path d="m56.692 187.026h-41.059c-2.762 0-5-2.238-5-5s2.238-5 5-5h41.059c2.757 0 5 2.238 5 5s-2.243 5-5 5zm21.777 26.773h-57.117c-2.762 0-5-2.238-5-5s2.238-5 5-5h57.116c2.762 0 5 2.238 5 5s-2.238 5-5 5zm-48.188-67.832h33.202c2.757 0 5 2.238 5 5s-2.243 5-5 5h-33.202c-2.762 0-5-2.238-5-5s2.238-5 5-5zm-19.282-12.843c-2.757 0-5-2.243-5-5s2.243-5 5-5h42.84c2.762 0 5 2.238 5 5s-2.238 5-5 5zm107.371 253.768c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.139 6.348 14.139 14.139-6.338 14.139-14.139 14.139zm0-38.278c-13.31 0-24.139 10.829-24.139 24.139s10.829 24.139 24.139 24.139 24.139-10.829 24.139-24.139-10.829-24.139-24.139-24.139zm277.778 38.278c-7.791 0-14.139-6.338-14.139-14.139s6.348-14.139 14.139-14.139 14.143 6.348 14.143 14.139-6.343 14.139-14.143 14.139zm0-38.278c-13.305 0-24.139 10.829-24.139 24.139s10.834 24.139 24.139 24.139 24.144-10.829 24.144-24.139-10.834-24.139-24.144-24.139zm-37.168-51.288c0-2.762 2.229-5 5-5h21.491c2.757 0 5 2.238 5 5s-2.243 4.995-5 4.995h-21.491c-2.772 0-5-2.224-5-4.995zm137.02 59.336c0 6.124-4.981 11.091-11.091 11.091h-45.097c-.472-4.129-1.51-8.076-3.043-11.786h46.483c2.767 0 5-2.243 5-5v-18.634h7.748zm-99.851 50.054c18.72 0 33.963-15.244 33.963-33.963s-15.244-33.949-33.963-33.949-33.949 15.229-33.949 33.949 15.234 33.963 33.949 33.963zm-277.778 0c18.729 0 33.959-15.244 33.959-33.963s-15.229-33.949-33.959-33.949-33.949 15.229-33.949 33.949 15.229 33.963 33.949 33.963zm-78.817-50.75h38.206c-1.528 3.71-2.576 7.657-3.048 11.786h-35.159v-11.786zm13.167-10h-13.167v-8.181h13.167zm263.801-29.111v29.111h-163.34c-8.039-10.434-20.648-17.163-34.811-17.163s-26.758 6.729-34.801 17.163h-20.849v-13.181c0-2.762-2.238-5-5-5h-18.167v-10.929h276.967zm-235.734-76.236h16.972v19.8c0 1.733.9 3.343 2.381 4.253.8.495 1.71.748 2.619.748.772 0 1.538-.176 2.248-.533l8.9-4.467 8.9 4.467c1.552.776 3.391.7 4.872-.214 1.471-.909 2.372-2.519 2.372-4.253v-19.8h16.967v66.236h-66.231v-66.236zm26.972 0v11.695l3.9-1.957c1.419-.705 3.081-.705 4.491 0l3.9 1.957v-11.695zm49.259-76.232h16.982v19.801c0 1.733.89 3.343 2.367 4.252 1.471.91 3.324.99 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.529 2.238.529.924 0 1.833-.248 2.633-.743 1.481-.91 2.367-2.519 2.367-4.252v-19.801h16.981v66.231h-66.241zm26.982 0v11.696l3.9-1.957c1.41-.71 3.067-.71 4.481 0l3.895 1.957v-11.696h-12.277zm66.231-24.077v19.801c0 1.733.896 3.343 2.367 4.252 1.481.91 3.319.99 4.872.214l8.9-4.467 8.896 4.467c.714.357 1.481.533 2.252.533.91 0 1.819-.253 2.619-.748 1.481-.91 2.381-2.519 2.381-4.252v-19.801h16.972v90.308h-66.231v-90.308h16.972zm9.996 0v11.696l3.9-1.957c1.409-.71 3.071-.71 4.491 0l3.9 1.957v-11.696zm0 100.309h12.291v11.695l-3.9-1.957c-1.419-.705-3.081-.705-4.491 0l-3.9 1.957zm-83.861 24.053c1.471.91 3.324.991 4.872.214l8.901-4.467 8.9 4.467c.709.357 1.481.533 2.238.533.924 0 1.833-.252 2.633-.748 1.481-.909 2.367-2.519 2.367-4.253v-19.8h16.981v66.236h-66.241v-66.236h16.982v19.8c0 1.733.89 3.343 2.367 4.253zm7.634-24.053v11.695l3.9-1.957c1.41-.705 3.067-.705 4.481 0l3.895 1.957v-11.695h-12.277zm49.259 66.236h66.231v-66.236h-16.972v19.8c0 1.733-.9 3.343-2.381 4.253-1.467.914-3.319.991-4.872.214l-8.896-4.467-8.9 4.467c-.709.357-1.471.533-2.243.533-.91 0-1.819-.252-2.629-.748-1.471-.909-2.367-2.519-2.367-4.253v-19.8h-16.972v66.236zm158.54-133.825c1.629 0 2.919.533 4.067 1.686l6.7 6.7h-76.046v-8.386zm-232.81 182.936h196.551c-1.543 3.71-2.581 7.657-3.052 11.786h-190.46c-.466-4.129-1.509-8.076-3.038-11.786zm274.75-158.202c-3.862-4.214-8.719-6.348-14.439-6.348h-92.78v154.549h34.83c8.039-10.434 20.648-17.163 34.797-17.163s26.772 6.729 34.811 17.163h47.292v-23.925h-17.363c-2.757 0-5-2.238-5-4.995v-25.911c0-2.762 2.243-5 5-5h17.363v-23.42h-109.4c-2.762 0-5-2.238-5-5v-52.102c0-2.762 2.238-5 5-5h67.508zm44.459 54.95h-104.347v-42.102h71.679l27.558 30.034c3.2 3.486 4.872 7.448 5.11 12.067zm.052 59.331h-12.362v-15.91h12.362zm22.749 10.286h-12.748v-68.427c0-7.653-2.624-14.386-7.791-20.02l-39.354-42.878c-5.748-6.272-13.296-9.591-21.806-9.591h-2.591l-13.772-13.777c-3.019-3.014-6.867-4.61-11.139-4.61h-65.279v-51.388c0-9.019-7.333-16.358-16.353-16.358h-277.019c-2.757 0-5 2.243-5 5s2.243 5 5 5h277.021c3.505 0 6.353 2.852 6.353 6.357v195.213h-7.034v-171.543c0-2.757-2.238-5-5-5h-76.227c-2.762 0-5 2.243-5 5v19.077h-71.241c-2.757 0-5 2.238-5 5v71.231h-71.232c-2.757 0-4.995 2.238-4.995 5v71.236h-31.239v-78.556c0-2.762-2.243-5-5-5-2.772 0-5 2.238-5 5v144.454c0 2.762 2.229 5 5 5h40.159c2.5 21.891 21.12 38.964 43.659 38.964s41.168-17.072 43.659-38.964h190.461c2.49 21.891 21.12 38.964 43.659 38.964s41.173-17.072 43.664-38.964h45.097c11.629 0 21.091-9.457 21.091-21.091v-29.33c0-2.757-2.238-5-5-5z" fillRule="evenodd"></path></svg>
                                                                        <div className='text-xs font-normal'>
                                                                            <h6 className='font-semibold text-sm'>{params?.lang == "ar" ? "احصل عليه خلال 24 ساعة" : "Delivery is expected to take place on " + moment().add(1, 'days').format('DD MMM')} {moment().add(5, 'days').format('DD MMM')}</h6>
                                                                            <p>{params?.lang == "ar" ? `فقط ${3} متاحة خلال 24 ساعة للتوصيل السريع` : `Order in 1 h 4 m`}</p>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                </div>
                                                : null}
                                        </>
                                    )
                                    //}
                                })
                                }
                            </div >
                        }
                    </div>
                </div>
            </div>
            {addressData?.length ?
                <div className="fixed bottom-0 w-full p-3 bg-white shadow-md border-t border-[#5D686F26]">
                    {activeTab3 == 3 ?
                        <>
                            {/* <div className="text-xs pt-1 flex items-center">
                                <label htmlFor="termsandConditionseid">
                                    <span className="text-xs text-[#DC4E4E] decoration-[#DC4E4E] font-medium">{params?.lang === "ar" ? "عميلنا العزيز: يرجى العلم انه قد يكون بعض التأخير في التوصيل بسبب التزامن مع إجازة عيد الأضحى المبارك" : "Dear Customer: Kindly note that due to Eid holidays there might be a delay in the deliveries."}</span>
                                </label>
                            </div> */}
                            <div className="text-xs pt-1 flex items-center mb-3">
                                <input type="checkbox" id="termsandConditions" className="rtl:ml-2 ltr:mr-2 mb-0 h-5 w-5" checked={checkTermCondition} onChange={(e) => {
                                    setCheckTermCondition(e.target.checked)
                                }} />
                                <label htmlFor="termsandConditions">
                                    <span>{params?.lang === 'ar' ? 'عزيزي العميل: بالضغط على هذا الزر فإنك توافق على' : `Dear Customer: By clicking on this button you're agreeing with our`}{' '}</span>
                                    <span className="font-bold underline text-[#004B7A]"><Link href={`${origin}/${params?.lang}/terms-and-conditions`}>{params?.lang === 'ar' ? 'الشروط والأحكام' : `Terms & Condition.`}</Link></span>
                                    <span>{' '}{params?.lang === 'ar' ? 'الخاصة بنا.' : ""}</span>
                                </label>
                            </div>
                        </>
                        : null}
                    <button
                        type="button"
                        disabled={ProceesBtn && activeTab3 === 3 ? true : false}
                        onClick={() => {
                            if (activeTab3 == 1 && !addressid) {
                                topMessageAlartDangerNew(params?.lang === "ar" ? "يرجى اختيار العنوان" : "please select address")
                                return false
                            }
                            if (activeTab3 === 3) {
                                setProceesBtn(true)
                            }
                            setActiveTab3(activeTab3 === 1 ? 2 : 3)

                            if (activeTab3 === 2 && !paymentMethod) {
                                topMessageAlartDangerNew(dict?.paymentmethod)
                            }
                            // setAddAddress(!addAddress)
                            if (activeTab3 == 3) {
                                if (addressid === false) {
                                    topMessageAlartDangerNew(params?.lang === "ar" ? "يرجى اختيار العنوان" : "please select address")
                                    setaddressid(false)
                                    setActiveTab3(1)
                                    setProceesBtn(false)
                                    return false;
                                }
                                if (!checkTermCondition) {
                                    setProceesBtn(false)
                                    return topMessageAlartDangerNew(params.lang === 'ar' ? "يرجى قبول الشروط والأحكام" : "Please accept the terms & conditions")
                                }
                                submitOrder()
                            }
                        }}
                        className="focus-visible:outline-none bg-[#004B7A] border border-[#004B7A] hover:bg-[#00446f] hover:border-[#00446f] text-white w-full rounded-md p-3.5 text-base font-bold flex items-center justify-center">
                        {activeTab3 === 1 ? params.lang == 'ar' ? 'الانتقال الي الدفع' : 'Proceed to Payment' : ''}
                        {activeTab3 === 2 ? params.lang == 'ar' ? 'ادفع الان' : 'Review Order' : ''}
                        {activeTab3 === 3 && !ProceesBtn ? params.lang == 'ar' ? 'اكمال الطلب' : 'Checkout Now' : ''}
                        {activeTab3 === 3 && ProceesBtn ? <svg height="24" viewBox="0 0 24 24" className="animate-spin h-6 w-6 fill-white mx-auto" width="24" xmlns="http://www.w3.org/2000/svg" id="fi_7235860"><path d="m12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8v-2c-5.421 0-10 4.58-10 10 0 5.421 4.579 10 10 10z"></path></svg> : ''}
                        {/* {activeTab3 === 3 ? params.lang == 'ar' ? 'اكمال الطلب' : 'Checkout Now' : ''} */}
                    </button>
                </div>
                : null}
        </>
    )
}
