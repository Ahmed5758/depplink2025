import { Api } from "../../api/Api";
import { cacheKey } from '../../../GlobalVar';

type Props = {
  params: { slug: string, lang: string, data: any }
}

const fetcher = async (params: any) => {
  const slug = params.slug
  const res: any = await fetch(`${Api}/brands/${slug}?${cacheKey}`, { next: { revalidate: 7200 } })
  return res.json()
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function BrandLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string, } }) {
  const branddata = await fetcher(params);
  params.data = branddata;
  return (
    <>
      {children}
    </>
  )
}