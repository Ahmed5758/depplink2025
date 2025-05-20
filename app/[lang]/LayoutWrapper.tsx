// app/components/LayoutWrapper.tsx
'use client'

import { ReactNode } from 'react'
import { HomepageContext } from './context/HomepageContext'

interface LayoutWrapperProps {
  homepageProps?: any
  children: ReactNode
}

export default function LayoutWrapper({ homepageProps, children }: LayoutWrapperProps) {
  return (
    <HomepageContext.Provider value={homepageProps}>
      {children}
    </HomepageContext.Provider>
  )
}
