"use client";
import React, { useEffect, useState, useContext } from "react";

import Link from "next/link";
import Image from "next/image";
import { NewMedia } from "../../api/Api";
import GlobalContext from "../../GlobalContext";
import { post } from "../../api/ApiCalls";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next-nprogress-bar";
import { setCartItems } from "../../cartstorage/cart";

export default function product_component(props: any) {
  const router = useRouter();
  const origin = props?.origin;
  const isArabic = props?.lang;
  const isMobileOrTablet = props?.isMobileOrTablet;
  var productData: any = props?.productData;


  function calculateTimeLeft(endTime: any) {
    const now: any = new Date();
    const end: any = new Date(endTime);
    const difference: any = end - now;

    if (difference <= 0) {
      return { expired: true };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  }

  //Product Dynamic Data
  const expressIcon = isArabic
    ? "/icons/express_logo/express_ar_w.webp"
    : "/icons/express_logo/express_en_w.webp";
  const installmentMethodsImages = isArabic ? "/icons/installment-3.webp" : "/icons/installment-3.webp";
  const expressTitle = isArabic ? "توصيل سريع" : "Express Delivery";
  const productBadgeTop = isArabic
    ? productData?.badge_left_arabic
    : productData?.badge_left;
  const productBadgeInsideText = isArabic
    ? productData?.badge_right_arabic
    : productData?.badge_right;
  const productBadgeInsideColor = "#004B7A";
  const productBadgeBackgroundColor = "#d8f0ff";
  const productBadgeLeftBackgroundColor = productData?.badge_left_color ? productData?.badge_left_color : "#EA4335";
  const productBadgeRightBackgroundColor = productData?.badge_right_color ? productData?.badge_right_color : "#004B7A";
  const productSlug = `${origin}/${isArabic ? "ar" : "en"}/product/${productData?.slug
    }`;

  function isValidUrl(value: any) {
    return value != null && value !== "" && value !== undefined;
  }

  const productFeaturedImage = `${NewMedia}/${productData?.featured_image?.image}`;
  const productSpecificationImageOne: any = isValidUrl(productData?.specification_image_one) && productData?.specification_image_one ? `${productData?.specification_image_one}` : null;
  const productSpecificationImageTwo: any = isValidUrl(productData?.specification_image_two) && productData?.specification_image_two ? `${productData?.specification_image_two}` : null;
  const productSpecificationImageThree: any = isValidUrl(productData?.specification_image_three) && productData?.specification_image_three ? `${productData?.specification_image_three}` : null;
  const productSpecificationImageFour: any = isValidUrl(productData?.specification_image_four) && productData?.specification_image_four ? `${productData?.specification_image_four}` : null;
  const productSpecificationImageFive: any = isValidUrl(productData?.specification_image_five) && productData?.specification_image_five ? `${productData?.specification_image_five}` : null;
  const productSpecificationImageSix: any = isValidUrl(productData?.specification_image_six) && productData?.specification_image_six ? `${productData?.specification_image_six}` : null;
  const productTitle = isArabic ? productData?.name_arabic : productData?.name;
  const productBrand = isArabic
    ? productData?.brand?.name_arabic
    : productData?.brand?.name;

  var productFlashSalePriceStatus = 0; // 1 for flash sale price, 0 for no flash sale price
  var productFlashSalePrice = 0;
  // var productFlashSaleTimer = "10:41:04";
  var productFlashSaleTimer: any = false;

  if (productData?.flash_sale_expiry && productData?.flash_sale_price) {
    var timer = calculateTimeLeft(productData?.flash_sale_expiry);
    if (!timer?.expired) {
      productFlashSalePriceStatus = 1;
      productFlashSalePrice = productData?.flash_sale_price;
      productFlashSaleTimer = `${timer?.hours}{" "}:{" "}${timer?.minutes}{" "}:{" "}${timer?.seconds}`;
      if (productData) {
        productData.sale_price = productData.flash_sale_price;
      }
    }
  }

  const salePormotionPriceSatus =
    (productData?.promotional_price == null || productData?.promotional_price == 0) ? 0 : 1; // 1 for sale, 0 for no sale This is for dummy value only
  const salePormotionPriceOnly = productData?.promotional_price;
  const salePormotionText =
    salePormotionPriceSatus > 0 && productFlashSalePriceStatus == 0
      ? isArabic
        ? productData?.promo_title_arabic
        : productData?.promo_title
      : "";

  const productSalePrice =
    salePormotionPriceSatus > 0 && productFlashSalePriceStatus == 0
      ? Math.max(
        0,
        Number(productData?.sale_price > 0 ? productData?.sale_price : productData?.price) - Number(salePormotionPriceOnly)
      )
      : productData?.sale_price;
  const productRegularPrice = productData?.price;
  const regularPrice = Number(productRegularPrice);
  const salePrice = Number(productSalePrice);
  const flashSalePrice = Number(productFlashSalePrice);
  const percentage = productData?.save_type === "1" ? 1 : 0; // 1 for percentage, 0 for amount
  const sarIcon = () => (
    <svg
      className="riyal-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1124.14 1256.39"
      width={isMobileOrTablet ? "9" : "11"}
      height={isMobileOrTablet ? "10" : "12"}
    >
      <path
        fill="currentColor"
        d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
      ></path>
      <path
        fill="currentColor"
        d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
      ></path>
    </svg>
  );
  const discountPercentage =
    percentage > 0
      ? Math.round((salePrice / regularPrice) * 100)
      : Math.max(0, Number(productRegularPrice) - Number(productSalePrice));
  const productDiscountType = percentage > 0 ? (isArabic ? "خصم" : "OFF") : "";
  const productDiscountValue =
    percentage > 0
      ? isArabic ? `%${discountPercentage}` : `${discountPercentage}%`
      : isArabic
        ? <>وفر{" "}{discountPercentage.toLocaleString("en-US")}{" "}{sarIcon()}</>
        : <>Save{" "}{discountPercentage.toLocaleString("en-US")}{" "}{sarIcon()}</>;
  const installmentMethods = isArabic ? "طرق الدفع" : "Payment";
  const installmentMethodsText = isArabic
    ? "قسطها ع كيفك, إشتري الأن وإدفع لاحقا"
    : "Split it your way buy now pay later!";
  // var giftAvailable = 1; // 1 for available, 0 for not available
  // const giftAvailableIcon =
  //   giftAvailable > 0 ? "/icons/gift.svg" : "/icons/gift.svg";
  const giftAvailableText = isArabic ? "هدية" : "Gift";
  const buttonTextCheckout = isArabic ? "شراء الأن" : "Checkout Now";

  const [timeLeft, setTimeLeft] = useState("");
  const [countdownTarget] = useState(() => {
    // Set your custom countdown target here (e.g., 1 day, 3 hours, 15 minutes)
    const days = 1;
    const hours = 3;
    const minutes = 15;

    const futureTime = productData?.flash_sale_expiry;

    return new Date(futureTime);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = countdownTarget.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft("00:00:00");
        return;
      }

      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hrs.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTarget]);

  const [ProExtraData, setProExtraData] = useState<any>([]);
  const [ProWishlistData, setProWishlistData] = useState<any>([]);
  const [ProComparetData, setProComparetData] = useState<any>([]);
  const { updateCompare, setUpdateCompare } = useContext(GlobalContext);
  const { updateWishlist, setUpdateWishlist } = useContext(GlobalContext);
  const [buyNowLoading, setBuyNowLoading] = useState<number>(0)
  const [extraData, setExtraData] = useState<any>([]);
  const [selectedProductId, setSelectedProductId] = useState<any>(false)
  const [selectedProductKey, setSelectedProductKey] = useState<any>(false)
  const [selectedGifts, setselectedGifts] = useState<any>({})
  const [allowed_gifts, setallowed_gifts] = useState(0)
  const [cartid, setcartid] = useState(false)
  const [cartkey, setcartkey] = useState(false)

  useEffect(() => {
    setProExtraData(props?.ProExtraData);
    // if (props?.ProExtraData?.freegiftData) {
    //   giftAvailable = 1
    // }
    // else{
    //   giftAvailable = 0
    // }
  }, [props?.ProExtraData]);

  useEffect(() => {
    if (localStorage.getItem("userWishlist")) {
      var wdata: any = localStorage.getItem("userWishlist");
      setProWishlistData(JSON.parse(wdata));
    }
    if (localStorage.getItem("userCompare")) {
      var wdata: any = localStorage.getItem("userCompare");
      setProComparetData(JSON.parse(wdata));
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

  const MySwal = withReactContent(Swal);
  const topMessageAlartDanger = (title: any) => {
    MySwal.fire({
      icon: "error",
      title: (
        <div className="text-xs">
          <div className="uppercase">{title}</div>
        </div>
      ),
      toast: true,
      position: props.lang == "ar" ? "top-start" : "top-end",
      showConfirmButton: false,
      timer: 15000,
      showCloseButton: true,
      background: "#DC4E4E",
      color: "#FFFFFF",
      timerProgressBar: true,
    });
  };
  const topMessageAlartSuccess = (title: any, viewcart: boolean = false) => {
    MySwal.fire({
      icon: "success",
      title: (
        <div className="text-xs">
          <div className="uppercase">{title}</div>
          {viewcart ? (
            <>
              <p className="font-light mb-3">
                {props.lang == "ar"
                  ? "تمت إضافة العنصر إلى سلة التسوق الخاصة بك."
                  : "The item has been added into your cart."}
              </p>
              <button
                onClick={() => {
                  router.push(`/${isArabic ? "ar" : "en"}/cart`);
                  router.refresh();
                }}
                className="focus-visible:outline-none mt-2 underline"
              >
                {props.lang == "ar" ? "عرض العربة" : "View Cart"}
              </button>
            </>
          ) : null}
        </div>
      ),
      toast: true,
      position: props.lang == "ar" ? "top-start" : "top-end",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: false,
      background: "#20831E",
      color: "#FFFFFF",
      timerProgressBar: true,
      customClass: {
        popup: `bg-success`,
      },
    });
  };

  const refetch = () => {
    if (localStorage.getItem("userWishlist")) {
      var wdata: any = localStorage.getItem("userWishlist");
      setProWishlistData(JSON.parse(wdata));
    } else if (ProWishlistData.length) {
      setProWishlistData([]);
    }

    if (localStorage.getItem("userCompare")) {
      var wdata: any = localStorage.getItem("userCompare");
      setProComparetData(JSON.parse(wdata));
    } else if (ProComparetData.length) {
      setProComparetData([]);
    }
  };

  const WishlistProduct = (id: any, type: boolean) => {
    // var testing: any = ProWishlistData
    if (localStorage.getItem("userid")) {
      var data = {
        user_id: localStorage.getItem("userid"),
        product_id: id,
      };
      if (type) {
        post("removewishlist", data).then((responseJson: any) => {
          if (responseJson?.success) {
            // testing[id].wishlist = !type;
            // setProWishlistData({ ...testing })
            // var wishlistRemovetext = props.dict?.wishlistRemovedText
            //   ? props.dict?.wishlistRemovedText
            //   : props?.dict?.products?.wishlistRemovedText;
            var wishlistRemovetext = isArabic ? "تمت إزالة هذا المنتج من قائمة الرغبات." : "This product has been removed from wishlist."
            topMessageAlartDanger(wishlistRemovetext);
            if (localStorage.getItem("wishlistCount")) {
              var wishlistlength: any = localStorage.getItem("wishlistCount");
              wishlistlength = parseInt(wishlistlength) - 1;
              localStorage.setItem("wishlistCount", wishlistlength);
            }
            localStorage.removeItem("userWishlist");
            setUpdateWishlist(updateWishlist == 0 ? 1 : 0);
          }
        });
      } else {
        post("addwishlist", data).then((responseJson: any) => {
          if (responseJson?.success) {
            // testing[id].wishlist = !type;
            // setProWishlistData({ ...testing })
            // var wishlistAddtext = props.dict?.wishlistAddedText
            //   ? props.dict?.wishlistAddedText
            //   : props?.dict?.products?.wishlistAddedText;
            var wishlistAddtext = isArabic ? "تمت إضافة هذا المنتج إلى قائمة الرغبات." : "This product has been Added in the wishlist."
            topMessageAlartSuccess(wishlistAddtext);
            if (localStorage.getItem("wishlistCount")) {
              var wishlistlength: any = localStorage.getItem("wishlistCount");
              wishlistlength = parseInt(wishlistlength) + 1;
              localStorage.setItem("wishlistCount", wishlistlength);
            }
            localStorage.removeItem("userWishlist");
            setUpdateWishlist(updateWishlist == 0 ? 1 : 0);
          }
        });
      }
    } else {
      router.push(`/${isArabic ? "ar" : "en"}/login`);
    }
  };

  const CompareProduct = (id: any, type: boolean) => {
    // var testing: any = ProComparetData
    if (localStorage.getItem("userid")) {
      var data = {
        user_id: localStorage.getItem("userid"),
        product_id: id,
      };
      if (type) {
        post("removecompare", data).then((responseJson: any) => {
          if (responseJson?.success) {
            // testing[id].compare = !type;
            // setProComparetData({ ...testing })
            // var compareRemovetext = props.dict?.compareRemovedText
            //   ? props.dict?.compareRemovedText
            //   : props?.dict?.compareRemovedText;
            var compareRemovetext = isArabic ? "تمت إزالة هذا المنتج من المقارنة." : "This product has been removed from compare."
            topMessageAlartDanger(compareRemovetext);
            if (localStorage.getItem("compareCount")) {
              var comparelength: any = localStorage.getItem("compareCount");
              comparelength = parseInt(comparelength) - 1;
              localStorage.setItem("compareCount", comparelength);
              setUpdateCompare(updateCompare == 0 ? 1 : 0);
            }
            localStorage.removeItem("userCompare");
            setUpdateCompare(updateCompare == 0 ? 1 : 0);
          }
        });
      } else {
        post("addcompare", data).then((responseJson: any) => {
          if (responseJson?.success) {
            // testing[id].compare = !type;
            // setProComparetData({ ...testing })
            // var compareAddtext = props.dict?.compareAddedText
            //   ? props.dict?.compareAddedText
            //   : props?.dict?.compareAddedText;
            var compareAddtext = isArabic ? "تمت إضافة هذا المنتج في المقارنة." : "This product has been Added in the compare."
            topMessageAlartSuccess(compareAddtext);
            if (localStorage.getItem("compareCount")) {
              var comparelength: any = localStorage.getItem("compareCount");
              comparelength = parseInt(comparelength) + 1;
              localStorage.setItem("compareCount", comparelength);
              setUpdateCompare(updateCompare == 0 ? 1 : 0);
            }
            localStorage.removeItem("userCompare");
            setUpdateCompare(updateCompare == 0 ? 1 : 0);
          } else {
            topMessageAlartDanger(isArabic ? "لقد قمت بالفعل بإضافة 4 منتجات في المقارنة." : "You have already added 4 products in the compare.");
          }
        });
      }
    } else {
      router.push(`/${isArabic ? "ar" : "en"}/login`);
    }
  };
  const fGift = ProExtraData?.freegiftData
  const fGiftType = (fGift && fGift?.freegiftlist?.length == fGift?.allowed_gifts) ? 0 : 1

  const addToCart = (id: any, i: any, giftcheck = false, redirect = false) => {
    var discountpricevalue: any = 0;
    var addtionaldiscount: any = 0;
    var discounttype: any = 0;
    if (productData?.discounttypestatus == 1) {
      addtionaldiscount = productData.discounttypestatus;
      discounttype = productData.discountcondition;
      if (productData.discountcondition === 1) {
        discountpricevalue = productData.discountvalue;
      } else if (productData.discountcondition == 2) {
        if (productData.sale_price > 0) {
          discountpricevalue = (productData.sale_price / 100) * productData.discountvalue;
        } else {
          discountpricevalue = (productData.price / 100) * productData.discountvalue;
        }
        if (discountpricevalue > productData.discountvaluecap) {
          discountpricevalue = productData.discountvaluecap;
        }
      } else if (productData.discountcondition == 3) {
        if (productData.pricetypevat == 0) {
          discountpricevalue = productData.sale_price - ((productData.sale_price / 115) * 100);
        } else {
          discountpricevalue = productData.price - ((productData.price / 115) * 100);
        }
      }
    }
    var flashCalc = ProExtraData?.flash ? ProExtraData?.flash?.discount_type === 2 ? Math.round(productData?.sale_price * ProExtraData?.flash?.discount_amount / 100) : ProExtraData?.flash?.discount_amount : productData?.sale_price
    setBuyNowLoading(id);
    setSelectedProductId(id)
    setSelectedProductKey(i)
    setExtraData(ProExtraData)

    if (ProExtraData?.freegiftData?.freegiftlist?.length == ProExtraData?.freegiftData?.allowed_gifts && ProExtraData?.freegiftData?.freegiftlist?.filter((e: any) => e?.discount > 0)?.length <= 0) {
      var item: any = {
        id: productData.id,
        sku: productData.sku,
        name: productData.name,
        name_arabic: productData.name_arabic,
        image: productData?.featured_image ? NewMedia + productData?.featured_image?.image : 'https://images.tamkeenstores.com.sa/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png',
        price: flashCalc ? flashCalc : productData.sale_price ? productData.sale_price : productData.price,
        regular_price: productData.price,
        quantity: 1,
        total_quantity: productData.quantity,
        brand: productData?.brand,
        slug: productData?.slug,
        pre_order: productData?.pre_order,
        pre_order_day: productData?.pre_order != null ? productData?.no_of_days : false,
        discounted_amount: discountpricevalue,
        discounttype: discounttype,
        addtionaldiscount: addtionaldiscount,
      }
      var gifts: any = false
      if (ProExtraData?.freegiftData) {
        gifts = []
        for (let index = 0; index < ProExtraData?.freegiftData?.freegiftlist?.length; index++) {
          const element = ProExtraData?.freegiftData?.freegiftlist[index]; var amount = 0
          if (ProExtraData?.freegiftData?.discount_type == 2) {
            var fgprice = element?.productdetail?.sale_price ? element?.productdetail?.sale_price : element?.productdetail?.price;
            fgprice -= (element?.discount * fgprice) / 100;
          }
          else if (ProExtraData?.freegiftData?.discount_type == 3)
            amount = element.discount
          var giftitem: any = {
            id: element.productdetail.id,
            sku: element.productdetail.sku,
            name: element.productdetail.name,
            name_arabic: element.productdetail.name_arabic,
            image: element.productdetail?.featured_image ? NewMedia + element.productdetail?.featured_image?.image : 'https://images.tamkeenstores.com.sa/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png',
            price: element.productdetail.sale_price ? element.productdetail.sale_price : element.productdetail.price,
            regular_price: element.productdetail.price,
            quantity: 1,
            gift_id: ProExtraData?.freegiftData?.id,
            discounted_amount: amount,
            slug: element.productdetail?.slug,
            pre_order: 0,
            pre_order_day: false
          }
          gifts.push(giftitem)
        }
      }
      var fbt: any = false

      setCartItems(item, gifts, fbt)
      topMessageAlartSuccess(isArabic ? "اضـافـة الـي العـربــة" : "Add to Cart", true)
      setBuyNowLoading(0);
      if (redirect) {
        router.push(`/${isArabic ? "ar" : "en"}/${localStorage.getItem("userid") ? "checkout" : "login?type=checkout"}`); // Redirect to cart page
        router.refresh();
      }
      return false;
    }
    if (ProExtraData?.freegiftData && giftcheck) {
      setExtraData(ProExtraData)
      setallowed_gifts(ProExtraData?.freegiftData?.allowed_gifts)
      // openModal()
      setBuyNowLoading(0);
      setselectedGifts({})
      setcartid(id)
      setcartkey(i)
      return false
    } else {
      var item: any = {
        id: productData.id,
        sku: productData.sku,
        name: productData.name,
        name_arabic: productData.name_arabic,
        image: productData?.featured_image ? NewMedia + productData?.featured_image?.image : 'https://images.tamkeenstores.com.sa/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png',
        price: flashCalc ? flashCalc : productData.sale_price ? productData.sale_price : productData.price,
        regular_price: productData.price,
        quantity: 1,
        total_quantity: productData.quantity,
        brand: productData?.brand,
        slug: productData?.slug,
        pre_order: productData?.pre_order,
        pre_order_day: productData?.pre_order != null ? productData?.no_of_days : false,
        discounted_amount: discountpricevalue,
        discounttype: discounttype,
        addtionaldiscount: addtionaldiscount,
      }
      var gifts: any = false
      if (ProExtraData?.freegiftData) {
        if (Object.keys(selectedGifts).length > 0) {
          gifts = []
          for (let index = 0; index < extraData?.freegiftData?.freegiftlist?.length; index++) {
            const element = extraData?.freegiftData?.freegiftlist[index];
            if (selectedGifts[element.id]) {
              var amount = 0
              if (extraData?.freegiftData?.discount_type == 2) {
                var fgprice = element?.productdetail?.sale_price ? element?.productdetail?.sale_price : element?.productdetail?.price;
                fgprice -= (element?.discount * fgprice) / 100;
              }
              else if (extraData?.freegiftData?.discount_type == 3)
                amount = element.discount
              var giftitem: any = {
                id: element.productdetail.id,
                sku: element.productdetail.sku,
                name: element.productdetail.name,
                name_arabic: element.productdetail.name_arabic,
                image: element.productdetail?.featured_image ? NewMedia + element.productdetail?.featured_image?.image : 'https://images.tamkeenstores.com.sa/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png',
                price: element.productdetail.sale_price ? element.productdetail.sale_price : element.productdetail.price,
                regular_price: element.productdetail.price,
                quantity: 1,
                gift_id: extraData?.freegiftData?.id,
                discounted_amount: amount,
                slug: element.productdetail?.slug,
                pre_order: 0,
                pre_order_day: false
              }
              gifts.push(giftitem)
            }
          }
        }
      }
      // closeModal()
      var fbt: any = false


      setCartItems(item, gifts, fbt)

      topMessageAlartSuccess(isArabic ? "اضـافـة الـي العـربــة" : "Add to Cart", true)
      setBuyNowLoading(0);
      if (redirect) {
        router.push(`/${isArabic ? "ar" : "en"}/${localStorage.getItem("userid") ? "checkout" : "login?type=checkout"}`); // Redirect to cart page
        router.refresh();
      }
    }
  }

  const giftAvailableImage = ProExtraData?.freegiftData?.image ? NewMedia + ProExtraData?.freegiftData?.image : null
  return (
    <>
      <div className="tamkeenProduct_card relative w-full h-fit">
        <div className="flex items-end justify-between px-4 w-full">
          {productBadgeTop ? (
            <div className={`text-[0.589rem] md:text-[0.589rem] font-semibold py-[0.150rem] px-[0.308rem] rounded-tr-lg rounded-tl-lg w-auto text-center text-white`}
              style={{ backgroundColor: productBadgeLeftBackgroundColor }}
            >
              {productBadgeTop}
            </div>
          ) :
            // <div className="h-[22px] w-[72px] text-[0.60rem] font-semibold py-1 px-1.5 rounded-tr-lg rounded-tl-lg opacity-0 line-clamp-1">Hiddende</div>
            null
          }
          {ProExtraData?.expressdeliveryData ? (
            <div className="rtl:mr-auto ltr:ml-auto">
              <Image
                alt={expressTitle}
                title={expressTitle}
                loading="lazy"
                // width={isMobileOrTablet ? 60 : 70}
                // height={isMobileOrTablet ? 18 : 22}
                width={60}
                height={25}
                decoding="async"
                data-nimg="1"
                sizes="100vw"
                quality={100}
                className="object-cover object-center"
                src={expressIcon}
              />
            </div>
          ) :
            <div className="h-[1.2rem]"></div>
          }
        </div>
        <div className="proBox relative z-20 !min-h-full !rounded-2xl shadow-md">
          <div className="tamkeenProduct_card_header flex justify-between items-center px-2">
            <div className={`flex flex-col gap-1 items-start absolute z-10 ${productBadgeInsideText ? "top-0" : "top-[12px]"} rtl:right-0 ltr:left-0`}>
              {productBadgeInsideText ? (
                <div
                  className={`md:text-xs text-[0.55rem] font-semibold py-[.5px] md:px-[1.3rem] px-3 ltr:rounded-tl-xl ltr:rounded-br-xl rtl:rounded-bl-xl rtl:rounded-tr-xl w-fit`}
                  style={{
                    backgroundColor: `${productBadgeRightBackgroundColor}25`,
                    color: productBadgeRightBackgroundColor,
                  }}
                >
                  {productBadgeInsideText}
                </div>
              ) :
                <div className="h-[1.2rem]"></div>
              }
              {productData?.totalrating > 0 ? (
                <div className="flex items-center gap-x-1 bg-gray/10 px-2 py-1 ltr:rounded-tr-xl ltr:rounded-br-xl rtl:rounded-tl-xl rtl:rounded-bl-xl">
                  <svg
                    height="12"
                    width="12"
                    viewBox="0 -10 511.99143 511"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFC107"
                  >
                    <path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path>
                  </svg>
                  <span className="text-xs opacity-60">
                    {productData?.rating}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-x-2 z-10 absolute top-3 rtl:left-3 ltr:right-3">
              <button
                className={`productSliderBtns hover:!bg-red hover:!text !p-2 transition-all duration-300 ease-in-out ${ProWishlistData.filter((item: any) => item == productData?.id)
                  .length >= 1
                  ? "!bg-red !fill-white"
                  : "!bg-white"
                  }`}
                onClick={(e: any) => {
                  var type: boolean =
                    ProWishlistData.filter(
                      (item: any) => item == productData?.id
                    ).length >= 1;
                  WishlistProduct(productData?.id, type);
                }}
              >
                <svg
                  id="fi_3870922"
                  height="12"
                  viewBox="0 0 512 512"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                >
                  <path d="m489.864 101.1a130.755 130.755 0 0 0 -60.164-50.89c-28.112-11.8-59.687-13.924-91.309-6.127-28.978 7.146-57.204 22.645-82.391 45.129-25.189-22.486-53.418-37.986-82.4-45.131-31.623-7.8-63.2-5.674-91.312 6.134a130.755 130.755 0 0 0 -60.161 50.9c-15.02 23.744-22.661 52.619-22.097 83.5 2.504 137.285 207.006 262.122 247.976 285.755a16 16 0 0 0 15.989 0c40.974-23.636 245.494-148.495 247.976-285.779.558-30.879-7.086-59.751-22.107-83.491zm-9.887 82.916c-.8 44.388-30.39 96.139-85.563 149.655-51.095 49.558-109.214 86.912-138.414 104.293-29.2-17.378-87.31-54.727-138.4-104.287-55.176-53.512-84.766-105.259-85.576-149.646-.884-48.467 22.539-87.462 62.656-104.313a106.644 106.644 0 0 1 41.511-8.238c36.795 0 75.717 17.812 108.4 51.046a16 16 0 0 0 22.815 0c45.406-46.17 102.85-62.573 149.9-42.811 40.121 16.845 63.547 55.834 62.671 104.298z"></path>
                </svg>
              </button>
              <button
                className={`productSliderBtns hover:!bg-orange hover:!text-white !p-2 transition-all duration-300 ease-in-out hidden md:block ${ProComparetData.filter((item: any) => item == productData?.id)
                  .length >= 1
                  ? "!bg-orange !fill-white"
                  : "!bg-white"
                  }`}
                onClick={(e: any) => {
                  var type: boolean =
                    ProComparetData.filter(
                      (item: any) => item == productData?.id
                    ).length >= 1;
                  CompareProduct(productData?.id, type);
                }}
              >
                <svg
                  height="12"
                  viewBox="0 0 24 24"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                  id="fi_7182235"
                >
                  <g clipRule="evenodd">
                    <path d="m5 7.91303c1.43335-.33858 2.5-1.62624 2.5-3.16303 0-1.79493-1.45507-3.25-3.25-3.25s-3.25 1.45507-3.25 3.25c0 1.53679 1.06665 2.82445 2.5 3.16303v8.33697c0 2.0711 1.67893 3.75 3.75 3.75h4.0643l-1.2196 1.2197c-.29292.2929-.29292.7677 0 1.0606.2929.2929.7677.2929 1.0606 0l2.5-2.5c.2929-.2929.2929-.7677 0-1.0606l-2.5-2.5c-.2929-.2929-.7677-.2929-1.0606 0-.29292.2929-.29292.7677 0 1.0606l1.2196 1.2197h-4.0643c-1.24264 0-2.25-1.0074-2.25-2.25zm-.75-1.41303c.9665 0 1.75-.7835 1.75-1.75s-.7835-1.75-1.75-1.75-1.75.7835-1.75 1.75.7835 1.75 1.75 1.75z"></path>
                    <path d="m13.9053 2.78033c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-2.5 2.5c-.2929.29289-.2929.76777 0 1.06066l2.5 2.5c.2929.29289.7677.29289 1.0606 0s.2929-.76777 0-1.06066l-1.2196-1.21967h4.0643c1.2426 0 2.25 1.00736 2.25 2.25v8.337c-1.4333.3385-2.5 1.6262-2.5 3.163 0 1.7949 1.4551 3.25 3.25 3.25s3.25-1.4551 3.25-3.25c0-1.5368-1.0667-2.8245-2.5-3.163v-8.337c0-2.07107-1.6789-3.75-3.75-3.75h-4.0643zm4.0947 16.46967c0-.9665.7835-1.75 1.75-1.75s1.75.7835 1.75 1.75-.7835 1.75-1.75 1.75-1.75-.7835-1.75-1.75z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <Link prefetch={false} scroll={false} href={productSlug}>
            <div className="tamkeenProduct_card_img w-full !rounded-2xl">
              {productSpecificationImageOne || productSpecificationImageTwo || productSpecificationImageThree ||
                productSpecificationImageFour || productSpecificationImageFive || productSpecificationImageSix ? (
                <>
                  <div className="flex flex-col gap-1 absolute left-0 top-14">
                    {productSpecificationImageOne ?
                    <Image
                      src={productSpecificationImageOne}
                      alt={`specification-${productTitle}`}
                      decoding="async"
                      data-nimg="1"
                      title={`Specification ${productTitle}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      quality={100}
                      className="specificationImagesProduct md:w-[30px] md:h-[22px] w-[22px] h-[16px]"
                    />
                    : null}
                    {productSpecificationImageTwo ?
                    <Image
                      src={productSpecificationImageTwo}
                      alt={`specification-${productTitle}`}
                      decoding="async"
                      data-nimg="1"
                      title={`Specification ${productTitle}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      quality={100}
                      className="specificationImagesProduct md:w-[30px] md:h-[22px] w-[22px] h-[16px]"
                    />
                    : null}
                    {productSpecificationImageThree ?
                    <Image
                      src={productSpecificationImageThree}
                      alt={`specification-${productTitle}`}
                      decoding="async"
                      data-nimg="1"
                      title={`Specification ${productTitle}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      quality={100}
                      className="specificationImagesProduct md:w-[30px] md:h-[22px] w-[22px] h-[16px]"
                    />
                    : null}
                    {productSpecificationImageFour ?
                    <Image
                      src={productSpecificationImageFour}
                      alt={`specification-${productTitle}`}
                      decoding="async"
                      data-nimg="1"
                      title={`Specification ${productTitle}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      quality={100}
                      className="specificationImagesProduct md:w-[30px] md:h-[22px] w-[22px] h-[16px]"
                    />
                    : null}
                    {productSpecificationImageFive ?
                    <Image
                      src={productSpecificationImageFive}
                      alt={`specification-${productTitle}`}
                      decoding="async"
                      data-nimg="1"
                      title={`Specification ${productTitle}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      quality={100}
                      className="specificationImagesProduct md:w-[30px] md:h-[22px] w-[22px] h-[16px]"
                    />
                    : null}
                    {productSpecificationImageSix ?
                    <Image
                      src={productSpecificationImageSix}
                      alt={`specification-${productTitle}`}
                      decoding="async"
                      data-nimg="1"
                      title={`Specification ${productTitle}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      quality={100}
                      className="specificationImagesProduct md:w-[30px] md:h-[22px] w-[22px] h-[16px] hidden md:block"
                    />
                    : null}
                  </div>
                </>
              ) : null}
              <Image
                src={productFeaturedImage}
                alt={productTitle}
                title={productTitle}
                width={0}
                height={0}
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                className="mx-auto w-full max-w-[350px] sm:h-auto h-auto object-cover object-center rouneded-2xl"
                loading="eager"
              />
            </div>
            <div className="tamkeenProduct_card_body mb-1">
              <h2 className="md:mb-4 mb-1 text-[0.65rem] text-start sm:text-xs 2xl:text-sm line-clamp-2 font-semibold 2xl:h-[2.5rem] h-[2rem]">
                <span className='font-[900] after:content-["•"]'>
                  {productBrand}{" "}
                </span>{" "}
                {productTitle}
              </h2>
              <div className="px-2 pb-2 pt-1 rounded-md relative md:h-[63px] h-[56px]" style={{ backgroundColor: productBadgeBackgroundColor }}>
                <div className="align__center">
                  <div className="">
                    <h3 className="md:text-base text-sm font-[900] text-orangePrice">
                      <div className="flex gap-1 items-center">
                        {productSalePrice > 0 ?
                          <>
                            {productSalePrice.toLocaleString("en-US")}
                          </>
                          :
                          <>
                            {productRegularPrice.toLocaleString("en-US")}
                          </>
                        }
                        <svg
                          className="riyal-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1124.14 1256.39"
                          width="10"
                          height="11"
                        >
                          <path
                            fill="currentColor"
                            d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                          ></path>
                          <path
                            fill="currentColor"
                            d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                          ></path>
                        </svg>
                      </div>
                    </h3>
                    <div className="flex items-center mt-0.5]">
                      {productSalePrice > 0 ?
                        <>
                          <h3 className="md:text-xs text-[0.65rem] text-gray-500 line-through decoration-double decoration-red leading-3 flex items-center gap-x-0.5">
                            {productRegularPrice}
                            <svg
                              className="riyal-svg"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1124.14 1256.39"
                              width="7"
                              height="8"
                            >
                              <path
                                fill="currentColor"
                                d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                              ></path>
                              <path
                                fill="currentColor"
                                d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                              ></path>
                            </svg>
                          </h3>
                          <h4 className="absolute ltr:right-0 rtl:left-0 top-2">
                            <div className={`text-[0.65rem] md:text-xs font-bold px-1 md:px-2 py-1 bg-white ltr:rounded-tl-md rtl:rounded-br-md rtl:rounded-tr-md ltr:rounded-bl-md`}>
                              <span className="text-dark flex items-center gap-1">{productDiscountValue}{" "}{productDiscountType}</span>
                            </div>
                          </h4>
                        </>
                        : null}
                    </div>
                  </div>
                </div>
                <span className="text-orangePrice text-[0.55rem] md:text-xs font-bold animationImp">
                  {salePormotionText}
                </span>
              </div>
              <div className={`mt-1 flex items-center justify-between ${ProExtraData?.freegiftData && giftAvailableImage != null ? "gap-x-1" : ""}`}>
                <div
                  className={`rounded-md grow overflow-hidden p-1 w-full`}
                  style={{ backgroundColor: productBadgeBackgroundColor }}
                >
                  <h3 className={`font-bold md:text-[0.619rem] text-[0.50rem] mb-1 ${ProExtraData?.freegiftData && giftAvailableImage != null ? "" : "text-center"} line-clamp-1 overflow-hidden`}>
                    {installmentMethodsText}
                  </h3>
                  <Image
                    alt={installmentMethods}
                    title={installmentMethods}
                    loading="lazy"
                    width={0}
                    height={0}
                    quality={100}
                    decoding="async"
                    sizes="100vw"
                    className="rounded-md mt-1.5 w-28 h-5 md:w-32 md:h-6 mx-auto"
                    src={installmentMethodsImages}
                  />
                </div>
                <div>
                  <div className="overflow-hidden text-center rounded-md h-auto">
                    {ProExtraData?.freegiftData && giftAvailableImage != null ?
                      <Image
                        alt={giftAvailableText}
                        title={giftAvailableText}
                        loading="lazy"
                        width={0}
                        height={0}
                        decoding="async"
                        data-nimg="1"
                        quality={100}
                        className={`rounded-md h-[3.3rem] ${ProExtraData?.freegiftData && giftAvailableImage != null ? "w-14" : ""} lg:w-14 2xl:w-12`}
                        src={giftAvailableImage}
                        sizes="100vw"
                        style={{ color: "transparent" }}
                      />
                      :
                      <div className="rounded-md h-14 w-0 md:w-12 lg:w-14 2xl:w-12 bg-white"></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="tamkeenProduct_card_footer flex items-center gap-1 mb-1 mt-2">
            <button className="bestProButton selected bg-[#004B7A] !text-white grow transition-all duration-300 ease-in-out"
              onClick={() => {
                if (fGiftType == 0) {
                  addToCart(productData.id, 0, true, true)
                }
                else if (fGift) {
                  router.push(productSlug)
                }
                else {
                  addToCart(productData.id, 0, true, true)
                }
              }}
            >
              {buttonTextCheckout}
            </button>
            <button className="productSliderBtns !bg-white hover:!bg-primary hover:!text-white transition-all duration-300 ease-in-out"
              onClick={() => {
                if (fGiftType == 0) {
                  addToCart(productData.id, 0, true)
                }
                else if (fGift) {
                  router.push(productSlug)
                }
                else {
                  addToCart(productData.id, 0, true)
                }
              }}
            >
              <svg width={isMobileOrTablet ? "16" : "24"} height={isMobileOrTablet ? "16" : "24"} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_539_6631)">
                  <path d="M0.893663 1.34551H0.789006C0.529721 1.34551 0.317578 1.13336 0.317578 0.874077C0.317578 0.614792 0.529721 0.402649 0.789006 0.402649H1.73186C1.99115 0.402649 2.20329 0.614792 2.20329 0.874077C2.20329 1.06972 2.08261 1.23802 1.91242 1.30921L2.04301 1.81693H12.009C12.8387 1.81693 13.5176 2.49202 13.5176 3.35049L13.2724 7.35528C13.2017 8.54186 12.0844 9.16556 11.0803 9.24523L4.08806 9.79633C4.10126 10.0207 3.94522 10.2338 3.70998 10.289C3.44032 10.3507 3.17066 10.198 3.10561 9.94012L2.60401 7.99123C2.10052 8.14869 1.72573 8.69319 1.72573 9.30558V9.35979C1.72573 10.1178 2.29333 10.7741 2.96795 10.7741H13.0461C13.304 10.7741 13.5176 10.9542 13.5176 11.2248C13.5176 11.4954 13.3068 11.7169 13.049 11.7169H11.8676C12.0551 11.7169 12.235 11.7914 12.3676 11.9241C12.5002 12.0567 12.5747 12.2365 12.5747 12.4241C12.5747 12.6116 12.5002 12.7915 12.3676 12.9241C12.235 13.0567 12.0551 13.1312 11.8676 13.1312C11.68 13.1312 11.5002 13.0567 11.3676 12.9241C11.2349 12.7915 11.1604 12.6116 11.1604 12.4241C11.1604 12.2365 11.2349 12.0567 11.3676 11.9241C11.5002 11.7914 11.68 11.7169 11.8676 11.7169H3.38186C3.56941 11.7169 3.74927 11.7914 3.88189 11.9241C4.0145 12.0567 4.08901 12.2365 4.08901 12.4241C4.08901 12.6116 4.0145 12.7915 3.88189 12.9241C3.74927 13.0567 3.56941 13.1312 3.38186 13.1312C3.19432 13.1312 3.01445 13.0567 2.88184 12.9241C2.74922 12.7915 2.67472 12.6116 2.67472 12.4241C2.67472 12.2365 2.74922 12.0567 2.88184 11.9241C3.01445 11.7914 3.19432 11.7169 3.38186 11.7169H2.94862C1.75873 11.7169 0.789006 10.659 0.789006 9.35979V9.30558C0.789006 8.23638 1.46032 7.33501 2.36876 7.07666L0.893663 1.34551ZM4.27004 6.53122H5.03186V4.64551H3.80379L4.27004 6.53122ZM3.68735 4.17408H5.03186V2.76309L4.11258 2.76403C3.71658 2.76403 3.42901 3.12986 3.52329 3.50983L3.68735 4.17408ZM5.50329 2.76262V4.17408H7.56815V2.75979L5.50329 2.76262ZM8.03958 2.75932V4.17408H10.2081V2.75696L8.03958 2.75932ZM10.6796 2.75649V4.17408H12.5224L12.5747 3.32221C12.5747 3.00823 12.3201 2.75461 12.0043 2.75461L10.6796 2.75649ZM12.4932 4.64551H10.6796V6.53122H12.3767L12.4932 4.64551ZM12.348 7.00265H10.6796V8.33679L11.0001 8.31181C11.6319 8.25995 12.2919 7.89931 12.3296 7.29871L12.348 7.00265ZM10.2081 8.37451V7.00265H8.03958V8.54516L10.2081 8.37451ZM7.56815 8.58193V7.00265H5.50329V8.70922C5.50329 8.72148 5.50235 8.73342 5.50046 8.74505L7.56815 8.58193ZM5.03186 8.69979V7.00265H4.38648L4.70658 8.29766C4.7276 8.38461 4.76769 8.4658 4.82395 8.53535C4.88021 8.60489 4.95123 8.66106 5.03186 8.69979ZM7.56815 4.64551H5.50329V6.53122H7.56815V4.64551ZM10.2081 4.64551H8.03958V6.53122H10.2081V4.64551Z" fill="#004B7A" />
                </g>
                <defs>
                  <clipPath id="clip0_539_6631">
                    <rect width="13.2" height="13.2" fill="white" transform="matrix(-1 0 0 1 13.3184 0.00189209)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        {productFlashSalePriceStatus > 0 ? (
          <div className="bg-[#005da9] text-white shadow-md rounded-xl pt-4 pb-1 px-1 md:pb-2 md:px-2 w-16 md:w-[100px] -mt-[18px] text-center">
            {/* <span className="text-xs">{productFlashSaleTimer}</span> */}
            <span className="text-xs font-bold">{timeLeft}</span>
          </div>
        )
          :
          (
            <div className="bg-transparent text-white shadow-none rounded-xl pt-4 pb-2 px-2 w-[100px] -mt-[18px] text-center h-12"></div>
          )
        }
      </div>
    </>
  );
}
