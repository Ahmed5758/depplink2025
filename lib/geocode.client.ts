// lib/geocode.client.ts
export type LatLng = { latitude: number; longitude: number };

function pickCityFromComponents(components: any[]): string | "" {
    for (const c of components) {
        const types: string[] = c.types || [];
        if (types.includes("locality")) return c.long_name;
        if (types.includes("administrative_area_level_2")) return c.long_name;
        if (types.includes("postal_town")) return c.long_name;
    }
    return "";
}

export async function reverseGeocodeCity(
    { latitude, longitude }: LatLng,
    lang: string,
    apiKey: string
): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=${lang}&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocode HTTP ${res.status}`);
    const data = await res.json();
    const first = data?.results?.[0];
    const city = first ? pickCityFromComponents(first.address_components || []) : "";
    return city || "";
}
