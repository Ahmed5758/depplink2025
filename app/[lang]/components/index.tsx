import dynamic from "next/dynamic";

export const components = {
    Slider: dynamic(() => import("./Slider")),
    Products: dynamic(() => import("./Products")),
    CountDown: dynamic(() => import("./CountDown")),
    LoginSignup: dynamic(() => import("./LoginSignup")),
    MobileHeader: dynamic(() => import("./MobileHeader")),
    ProductLoader: dynamic(() => import("./ProductLoader")),
    // ProductSlider: dynamic(() => import("./ProductSlider")),
    AccountSidebar: dynamic(() => import("./AccountSidebar")),
    FullPageLoader: dynamic(() => import("./FullPageLoader")),
    ProductWishlist: dynamic(() => import("./ProductWishlist")),
    BrandSliderOther: dynamic(() => import("./BrandSliderOther")),
    BrandSliderLoader: dynamic(() => import("./BrandSliderLoader")),
    HomePageProductThumbnail: dynamic(() => import("./HomePageProductThumbnail")),
};