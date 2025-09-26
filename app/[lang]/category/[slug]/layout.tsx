import { Api } from "../../api/Api";
import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { cacheKey } from '../../../GlobalVar';

type Props = {
  params: { slug: string, data: any, lang: string }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
}

const fetcher = async (params: any, query: any = false) => {
  const slug = params.slug
  var data;
  const cookieStore = cookies();
  const city = cookieStore.get('selectedCity')?.value || 'Jeddah';
  var url = `category-products-regional-new/${slug}/${city}?v=dataupdated&lang=${params.lang}&${cacheKey}`;
  var result = '';
  if (query) {
    result = '&' + new URLSearchParams(query).toString();
  }
  const res: any = await fetch(`${Api}${url}${result}`)
  return res.json()
}

// export const fetchCache = 'force-no-store'


export default async function CategoryLayout({
  children,
  params,
}: {
  children: any,
  params: {
    lang: string; slug: string, data: any
  }
}) {
  var query = false;
  if (children.props.childProp.segment.indexOf('?') >= 0) {
    query = JSON.parse(children.props.childProp.segment.split('?')[1])
  }
  const catdata = await fetcher(params, query);
  params.data = catdata;

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';


  if (catdata?.category?.redirection_link !== null && catdata?.category?.redirection_link !== "") {
    redirect(`${origin}/${params?.lang}/${catdata?.category?.redirection_link}`)
  }

  return (
    <>
      {children}
    </>
  )
}