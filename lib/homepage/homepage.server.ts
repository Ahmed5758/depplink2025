import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getHomepageServerSide = cache(async (lang: string) => {
  const res = await fetch(`${Api}homepage-frontend?lang=${lang}&${cacheKey}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Failed to load homepage");
  const data = await res.json()
  return data || {}
})

export const getHomepageServerMenu = cache(async () => {
  const menuData = await fetch(`${Api}menu?${cacheKey}`, {
    next: { revalidate: 3600 },
  })
  if (!menuData.ok) throw new Error("Failed to load homepage");
  return menuData.json() || {}
})

