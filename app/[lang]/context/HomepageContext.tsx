// app/context/HomepageContext.tsx
'use client'

import { createContext, useContext } from 'react'

export const HomepageContext = createContext<any>(null)

export function useHomepage() {
  return useContext(HomepageContext)
}
