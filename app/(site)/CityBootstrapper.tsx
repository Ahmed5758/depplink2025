// app/(site)/CityBootstrapper.tsx
"use client";

import { useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { reverseGeocodeCity } from "@/lib/geocode.client";
import { setCityAction } from "@/app/actions/set-city";

export default function CityBootstrapper({ lang, googleApiKey }: { lang: string; googleApiKey: string }) {
    const didRun = useRef(false);
    const router = useRouter();
    const pathname = usePathname();
    const [pending, startTransition] = useTransition();

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        // If cookie already present, skip to avoid loops
        if (document.cookie.split("; ").some((c) => c.startsWith("city="))) return;

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const city = await reverseGeocodeCity({ latitude, longitude }, lang, googleApiKey);
                    if (!city) return;
                    startTransition(async () => {
                        await setCityAction(city, pathname); // sets cookie on server
                        router.refresh();                    // re-render with city in AppContext
                    });
                } catch {
                    // ignore
                }
            },
            () => {
                // user denied or failed — silently ignore
            },
            { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 }
        );
    }, [googleApiKey, lang, pathname, router]);

    return null;
}
