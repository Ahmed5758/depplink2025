// app/api/revgeo/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { lat, lng } = await req.json().catch(() => ({}));
    if (typeof lat !== "number" || typeof lng !== "number") {
        return NextResponse.json({ ok: false, error: "invalid lat/lng" }, { status: 400 });
    }

    const key = process.env.GOOGLE_MAPS_SERVER_KEY;
    if (!key) return NextResponse.json({ ok: false, error: "missing key" }, { status: 500 });

    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
    url.searchParams.set("latlng", `${lat},${lng}`);
    url.searchParams.set("key", key);
    url.searchParams.set("language", "en");

    const r = await fetch(url.toString());
    const data = await r.json();

    // Pull a city-like locality
    let city: string | undefined;
    for (const res of data.results ?? []) {
        const comp = res.address_components as any[] | undefined;
        const hit = comp?.find((c) =>
            (c.types || []).some((t: string) =>
                ["locality", "postal_town", "sublocality", "administrative_area_level_2"].includes(t)
            )
        );
        if (hit?.long_name) { city = hit.long_name; break; }
    }

    return NextResponse.json({ ok: true, city: city ?? null });
}
