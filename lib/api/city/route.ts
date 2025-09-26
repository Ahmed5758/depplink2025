// app/api/city/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { city } = await req.json().catch(() => ({ city: "" }));
    if (!city || typeof city !== "string") {
        return NextResponse.json({ ok: false, error: "invalid city" }, { status: 400 });
    }
    const res = NextResponse.json({ ok: true, city });
    // HttpOnly cookie so SSR can trust it; adjust domain if needed
    res.cookies.set("city", city, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
}
