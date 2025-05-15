import React from 'react';
import { useRouter } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import GlobalContext from '../GlobalContext'
import { useContext } from 'react';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const PickupStorePopup = (props: any) => {
    const isArabic = props?.isArabic
    const router = useRouter();

    // Pickup From Store
    const { globalStore, setglobalStore } = useContext<any>(GlobalContext);
    const [storeSearch, setstoreSearch] = useState<any>('')
    const [direction, setDirection] = useState<"left-to-right" | "right-to-left">(props?.direction);

    const filteredStores = props?.allStores.filter((city: any) =>
        city?.showroom_data?.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
        city?.showroom_data?.name_arabic.toLowerCase().includes(storeSearch.toLowerCase()) ||
        city.showroom_data?.address.toLowerCase().includes(storeSearch.toLowerCase())
    );

    const MySwal = withReactContent(Swal);
    const topMessageAlartSuccess = (title: any, viewcart: boolean = false) => {
        MySwal.fire({
            icon: "success",
            title:
                <div className="text-xs">
                    <div className="uppercase">{title}</div>
                    {viewcart ?
                        <>
                            <p className="font-light mb-3">{isArabic ? 'تمت إضافة العنصر إلى سلة التسوق الخاصة بك.' : 'The item has been added into your cart.'}</p>
                            <button
                                onClick={() => {
                                    router.push(`/${props.lang}/cart`)
                                    router.refresh();
                                }}
                                className="focus-visible:outline-none mt-2 underline">
                                {isArabic ? 'عرض العربة' : 'View Cart'}
                            </button>
                        </>
                        : null}
                </div>
            ,
            toast: true,
            position: isArabic ? 'top-start' : 'top-end',
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

    const isStoreOpen = (timeRange: string) => {
        if (!timeRange) return false;

        const [openTime, closeTime] = timeRange.split(" - ").map(time => {
            let [hours, minutes] = time.match(/\d+/g)?.map(Number) || [0, 0];
            const isPM = time.includes("PM");

            if (isPM && hours !== 12) hours += 12;
            if (!isPM && hours === 12) hours = 0;

            return hours * 60 + minutes; // Convert to total minutes for easy comparison
        });

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        return currentMinutes >= openTime && currentMinutes <= closeTime;
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return (
        <Transition appear show={props?.isOpenModal} as={Fragment}>
            <Dialog as="div" open={props?.isOpenModal} onClose={props.setModal}>
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
                            enter="transform transition ease-out duration-300"
                            enterFrom={
                                props?.direction === "left-to-right"
                                    ? "opacity-0 -translate-x-0"
                                    : "opacity-0 translate-x-full"
                            }
                            enterTo="opacity-100 translate-x-0"
                            leave="transform transition ease-in duration-200"
                            leaveFrom="opacity-100 translate-x-0"
                            leaveTo={
                                props?.direction === "left-to-right"
                                    ? "opacity-0 translate-x-full"
                                    : "opacity-0 -translate-x-full"
                            }
                        >
                            <Dialog.Panel as="div" className={`panel overflow-hidden w-full max-w-lg h-screen text-black bg-white absolute ${isArabic ? 'right-0 rounded-l-lg' : 'left-0 rounded-r-lg'}`}>
                                <div className="flex items-center justify-end px-3 py-4 bg-[#219EBC60]">
                                    <button type="button" className="focus-visible:outline-none text-dark hover:text-dark fill-dark" onClick={props.setModal}>
                                        <svg height="16" viewBox="0 0 329.26933 329" width="16" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                    </button>
                                </div>
                                <div className='pb-4'>
                                    <Tab.Group>
                                        <Tab.List className="w-full flex border-b border-[#474B5230] bg-[#219EBC60]">
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`!border-primary text-primary !outline-none flex items-center justify-center border-b-2 text-base border-transparent bg-transparent py-3 before:inline-block hover:border-primary hover:text-primary font-bold w-full`}
                                                    >
                                                        {isArabic ? 'التوصيل' : 'Store Pickup'}
                                                    </button>
                                                )}
                                            </Tab>
                                        </Tab.List>
                                        <Tab.Panels>
                                            <Tab.Panel className="focus-visible:outline-none">
                                                <div className="panel rounded-t-none">
                                                    <div className='px-4'>
                                                        <h5 className='font-semibold text-sm mt-3 line-clamp-1'>{isArabic ? 'المتجر المحدد:' : 'Selected Store:'} <span className='text-[#219EBC] font-bold uppercase'>{isArabic ? globalStore?.showroom_data?.name_arabic : globalStore?.showroom_data?.name}</span></h5>
                                                        <div className="border rounded flex items-center border-[#004B7A] focus::border-[#000] h-9 gap-2 relative z-20 bg-white mt-1">
                                                            <input id="productSearch" type="text" name="shipping-charge" className="form-input focus-visible:outline-none focus:ring-transparent text-xs h-6 border-none w-full"
                                                                value={storeSearch}
                                                                onChange={(e) => setstoreSearch(e.target.value)}
                                                                placeholder={'Search Store'}
                                                            />
                                                        </div>
                                                        <hr className='opacity-10' />
                                                        <h5 className='font-semibold text-sm my-3 line-clamp-1'><span className='text-[#219EBC] font-bold uppercase'>{filteredStores?.length}</span> {isArabic ? 'المتاجر لديها توافر' : 'Stores have availablity'}</h5>
                                                        <div className='overflow-y-auto h-[calc(100vh-15rem)]'>
                                                            {filteredStores?.map((item: any, i: any) => {
                                                                return (
                                                                    <div className="border border-[#20831E] rounded-md mt-2">
                                                                        <div className='cursor-pointer'
                                                                            onClick={() => {
                                                                                setglobalStore(item)
                                                                                localStorage.setItem('globalStore', item?.id)
                                                                                props?.setModal(false)
                                                                                topMessageAlartSuccess('Success! Pickup From Store Changed Successfully..')
                                                                            }}
                                                                        >
                                                                            <div className='flex justify-between gap-4 items-center p-3'>
                                                                                <div className='flex items-center gap-2'>
                                                                                    {/* <img src="/images/icons/storePickup.png" alt="warehouse" height='20' width='20' /> */}
                                                                                    <svg height="15pt" viewBox="-8 0 464 464.01771" width="15pt" xmlns="http://www.w3.org/2000/svg" id="fi_1356559"><path d="m16.007812 232.019531h416v232h-416zm0 0" fill="#668796"></path><path d="m304.007812 232.019531h16v232h-16zm0 0" fill="#4d6877"></path><path d="m48.007812 320.019531h232v72h-232zm0 0" fill="#fff"></path><path d="m16.007812 432.019531h296v32h-296zm0 0" fill="#4d6877"></path><path d="m408.007812 136.019531v-32h-368v32l-39.9999995 80v16h447.9999995v-16zm0 0" fill="#5cc4a6"></path><path d="m40.007812 104.019531h368v32h-368zm0 0" fill="#239172"></path><path d="m224.007812.0195312c-34.398437-.8007812-63.199218 25.5976568-64 59.9999998v5.597657c0 9.601562 2.402344 18.402343 6.402344 27.199218l57.597656 99.203125 57.601563-99.203125c4.800781-8 6.398437-17.597656 6.398437-27.199218v-5.597657c-.800781-34.402343-29.597656-60.800781-64-59.9999998zm0 0" fill="#ef4848"></path><path d="m248.007812 56.019531c0 13.253907-10.742187 24-24 24-13.253906 0-24-10.746093-24-24 0-13.257812 10.746094-24 24-24 13.257813 0 24 10.742188 24 24zm0 0" fill="#fff"></path><path d="m.0078125 232.019531v28c0 15.199219 12.8007815 28 27.9999995 28 15.199219 0 28-12.800781 28-28v-28" fill="#2ab793"></path><path d="m112.007812 232.019531v28c0 15.199219-12.800781 28-28 28-15.199218 0-28-12.800781-28-28v-28" fill="#f7d289"></path><path d="m168.007812 232.019531v28c0 15.199219-12.800781 28-28 28-15.199218 0-28-12.800781-28-28v-28" fill="#2ab793"></path><path d="m224.007812 232.019531v28c0 15.199219-12.800781 28-28 28-15.199218 0-28-12.800781-28-28v-28" fill="#f7d289"></path><path d="m224.007812 232.019531v28c0 15.199219 12.800782 28 28 28 15.199219 0 28-12.800781 28-28v-28" fill="#2ab793"></path><path d="m280.007812 232.019531v28c0 15.199219 12.800782 28 28 28 15.199219 0 28-12.800781 28-28v-28" fill="#f7d289"></path><path d="m336.007812 232.019531v28c0 15.199219 12.800782 28 28 28 15.199219 0 28-12.800781 28-28v-28" fill="#2ab793"></path><path d="m392.007812 232.019531v28c0 15.199219 12.800782 28 28 28 15.199219 0 28-12.800781 28-28v-28" fill="#f7d289"></path><g fill="#e4e7ea"><path d="m232.007812 392.019531h-32l72-72h8v24zm0 0"></path><path d="m168.007812 392.019531h-32l72-72h32zm0 0"></path><path d="m104.007812 392.019531h-32l72-72h32zm0 0"></path><path d="m48.007812 384.019531v-32l32-32h32zm0 0"></path></g><path d="m336.007812 304.019531h80v144h-80zm0 0" fill="#fff"></path><path d="m336.007812 352.019531h16v16h-16zm0 0" fill="#668796"></path><path d="m336.007812 432.019531v-32l80-80v32zm0 0" fill="#e4e7ea"></path><path d="m392.007812 448.019531h-32l56-56v32zm0 0" fill="#e4e7ea"></path></svg>
                                                                                    <h6 className='text-xs font-semibold'>{isArabic ? item?.showroom_data?.name_arabic : item?.showroom_data?.name}</h6>
                                                                                    <span className='border border-[#20831E] text-[#20831E] p-0.5 rounded text-[0.60rem] font-semibold'>{isArabic ? 'في الأوراق المالية' : 'IN STOCK'}</span>
                                                                                </div>
                                                                                {item?.id == globalStore?.id ?
                                                                                    <div className='flex items-center gap-1'>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0,0,256,256">
                                                                                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: 'normal' }}><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z" fill="#c8e6c9"></path><path d="M34.586,14.586l-13.57,13.586l-5.602,-5.586l-2.828,2.828l8.434,8.414l16.395,-16.414z" fill="#4caf50"></path></g></g>
                                                                                        </svg>
                                                                                        <h6 className='text-xs font-semibold text-[#20831E]'>{isArabic ? 'تم اختياره' : 'Selected'}</h6>
                                                                                    </div>
                                                                                    :
                                                                                    <h6 className='text-xs font-semibold text-[#004B7A]'>{isArabic ? 'يختار' : 'Select'}</h6>
                                                                                }

                                                                            </div>
                                                                            <p className='text-xs px-3 mb-2.5'>
                                                                                {item?.showroom_data?.address ? item?.showroom_data?.address : null}
                                                                            </p>
                                                                        </div>
                                                                        <Disclosure>
                                                                            {({ open }) => (
                                                                                <>
                                                                                    <Disclosure.Button className="tc__311mainDisclosureBtn rounded-b-none !mb-0">
                                                                                        <div className='flex gap-1 justify-start items-center text-xs'>
                                                                                            <span className={`${isStoreOpen(item?.showroom_data?.time) ? 'bg-[#20831E]' : 'bg-[#EF7E2C]'} h-2 w-2 rounded-full`}></span>
                                                                                            <p>{isStoreOpen(item?.showroom_data?.time) ?
                                                                                                isArabic ? 'يفتح' : 'Open'
                                                                                                :
                                                                                                isArabic ? 'مغلق' : 'Closed'
                                                                                            }</p>

                                                                                        </div>
                                                                                        <div className='flex gap-x-1.5 justify-start items-center text-xs'>
                                                                                            <p className='text-[#004B7A]'>{isArabic ? 'تفاصيل' : 'Details'}</p>
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
                                                                                    <Disclosure.Panel className="tc__311mainDisclosurePanel !mb-0">
                                                                                        <div className='bg-[#EEF8FC] p-3 rounded-b-md'>
                                                                                            <div className='flex gap-2 justify-start items-start'>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 50 50">
                                                                                                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z"></path>
                                                                                                </svg>
                                                                                                <div className='text-[#53616A] text-[10px]'>
                                                                                                    <h6 className='p-0 text-xs mb-1'>{isArabic ? 'ساعات العمل' : 'Working Hours'}</h6>
                                                                                                    <p>{isArabic ? 'ساعات العمل المسائية' : 'friday 04:30 PM - 11:59 PM'}</p>
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
                                                                                                    <h6 className='p-0 text-xs mb-1'>{isArabic ? 'ساعات العمل المسائية' : 'Address'}</h6>
                                                                                                    <p>{item?.showroom_data?.address ? item?.showroom_data?.address : null}</p>
                                                                                                    <a href={item?.showroom_data?.direction_button} className='text-[#004B7A] text-xs'>{isArabic ? 'ساعات العمل المسائية' : 'Get Direction'}</a>
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
                                                                                                    <h6 className='p-0 text-xs mb-1'>{isArabic ? 'اتصل بالمتجر' : 'Contact the store'}</h6>
                                                                                                    <p>{item?.showroom_data?.address ? item?.showroom_data?.address : null}</p>
                                                                                                    <a href={`tel:${item?.showroom_data?.phone_number}`} className='text-[#004B7A] text-xs'>{item?.showroom_data?.phone_number}</a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Disclosure.Panel>
                                                                                </>
                                                                            )}
                                                                        </Disclosure>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
export default PickupStorePopup;