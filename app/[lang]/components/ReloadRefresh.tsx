// app/components/ReloadAfter5sIdle.tsx
'use client';

import { useEffect } from 'react';

export default function ReloadAfter5sIdle({
    lang = 'en',
    idleMs = 30 * 60 * 1000, // 30 minutes
}: {
    lang?: string;
    idleMs?: number;
}) {
    const KEY = 'idle:hiddenAt';
    const RELOAD_GUARD = 'idle:lastReloadAt';

    useEffect(() => {
        const now = () => Date.now();
        const isSensitivePath = (path: string) =>
            /(\/|^)(cart|checkout|login|signup)(\/|$)/i.test(path);
        const isFirefox =
            typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);

        const markInactive = () => {
            sessionStorage.setItem(KEY, String(now()));
        };

        const navigateHomeFFSafe = () => {
            // add a cache-busting param so Firefox treats it as a distinct navigation
            const target = new URL(`/${lang}`, window.location.origin);
            target.searchParams.set('__resume', '1');
            target.searchParams.set('t', String(Date.now()));

            // Defer to escape bfcache resume; slightly longer delay on Firefox
            const delay = isFirefox ? 120 : 0;
            requestAnimationFrame(() =>
                setTimeout(() => {
                    try {
                        window.location.replace(target.toString());
                    } catch {
                        window.location.href = target.toString();
                    }
                }, delay)
            );
        };

        const hardReloadFFSafe = () => {
            const delay = isFirefox ? 60 : 0;
            requestAnimationFrame(() => setTimeout(() => window.location.reload(), delay));
        };

        const maybeAct = (why: string) => {
            const t = Number(sessionStorage.getItem(KEY) || 0);
            const elapsed = t ? now() - t : 0;

            // debounce multiple resume events
            const last = Number(sessionStorage.getItem(RELOAD_GUARD) || 0);
            if (now() - last < 3000) return;

            if (elapsed > idleMs) {
                sessionStorage.setItem(RELOAD_GUARD, String(now()));
                sessionStorage.removeItem(KEY);

                const path = window.location.pathname;
                if (isSensitivePath(path)) {
                    navigateHomeFFSafe();   // ✅ works on Firefox & Chrome
                } else {
                    hardReloadFFSafe();     // ✅ full reload
                }
            } else {
                sessionStorage.removeItem(KEY);
            }
        };

        // Leaving (tab hidden or app switched)
        const onVisibility = () => {
            if (document.visibilityState === 'hidden') markInactive();
            else if (document.visibilityState === 'visible') maybeAct('visibilitychange');
        };
        const onBlur = () => markInactive();

        // Returning
        const onFocus = () => maybeAct('focus');
        const onPageShow = (e: PageTransitionEvent) => {
            // If bfcache restore, Firefox especially needs the deferral above.
            maybeAct(`pageshow${(e as any).persisted ? ':persisted' : ''}`);
        };

        document.addEventListener('visibilitychange', onVisibility, { passive: true });
        window.addEventListener('blur', onBlur, { passive: true });
        window.addEventListener('focus', onFocus, { passive: true });
        window.addEventListener('pageshow', onPageShow as any, { passive: true });

        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('blur', onBlur);
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('pageshow', onPageShow as any);
        };
    }, [idleMs, lang]);

    return null;
}