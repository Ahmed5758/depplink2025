// app/api/ip-geo/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const resp = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        const data = await resp.json();
        const city = data?.city || data?.region || null;
        return NextResponse.json({ ok: true, city });
    } catch {
        return NextResponse.json({ ok: false, city: null });
    }
}
