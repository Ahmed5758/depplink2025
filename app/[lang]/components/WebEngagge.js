'use client'

import { useEffect } from 'react'

export default function WebEngage() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            // Load WebEngage Script
            (function (w, d, s, e, n, g) {
                w[e] = w[e] || function () {
                    (w[e]._q = w[e]._q || []).push(arguments);
                };
                n = d.createElement(s);
                g = d.getElementsByTagName(s)[0];
                n.async = true;
                n.src = 'https://cdn.webengage.com/js/webengage-min-v-6.0.js';
                g.parentNode.insertBefore(n, g);
            })(window, document, 'script', 'webengage');

            // Initialize WebEngage with your license code
            window.webengage.init('ksa~~2024c087');

            // Optional: Debug or bridge to native WebView
            console.log('WE_MOBILE_BRIDGE', window.ReactNativeWebView);

            // Send bridge message only for mobile app WebViews
            if (window.ReactNativeWebView && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                const message = JSON.stringify({ type: 'WEBENGAGE_READY' });
                window.ReactNativeWebView.postMessage(message);
            }

        } catch (error) {
            console.error('WebEngage initialization failed:', error);
        }

    }, []);

    return null; // This is a headless component
}
