import { get } from "../api/ApiCalls";
import { headers, cookies } from 'next/headers'

const fetcher = async (params: any, query: any = false) => {
    const cookieStore = cookies();
  const city = cookieStore.get('selectedCity')?.value || 'Jeddah';
  const slug = params.slug
  var data;
  var url = `newly-arrived-regional-new/${slug}/${city}` 
  var result = '';
  if (query) {
    result = '?' + new URLSearchParams(query).toString();
  }

  await get(url + result).then((responseJson: any) => {
    data = responseJson
  })
  return data
}

export const fetchCache = 'force-no-store'


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
  return (
    <>
      {children}
    </>
  )
}