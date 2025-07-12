// components/GTM.tsx
'use client';

import Script from 'next/script';

export default function GTM() {
    return (
        <>
            {/* GTM Main Script */}
            <Script
                id="gtm"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-N37K37T');`,
                }}
            />

            {/* Custom Script for tracking UTM & tagtag_uid */}
            {/* <Script
                id="utm-parser"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            function getParam(name) {
                                const url = new URL(window.location.href);
                                return url.searchParams.get(name);
                            }

                            function setCookie(name, value, days) {
                                var expires = "";
                                if (days) {
                                    var date = new Date();
                                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                                    expires = "; expires=" + date.toUTCString();
                                }
                                document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=.tamkeenstores.com.sa";
                            }

                            var params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'tagtag_uid'];

                            params.forEach(function(param) {
                                var value = getParam(param);
                                if (value) {
                                    setCookie(param, value, 30);
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({ event: 'paramCaptured', [param]: value });
                                }
                            });
                        })();
                    `,
                }}
            /> */}
        </>
    );
}