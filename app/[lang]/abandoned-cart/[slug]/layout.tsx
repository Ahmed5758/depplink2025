import type { Metadata, ResolvingMetadata } from 'next'
import { get } from "../../api/ApiCalls";
import { headers } from 'next/headers'

type Props = {
  params: { slug: string }
}

const fetcher = async (params: any, query: any = false) => {
  const slug = params.slug
  var data;
  var url = 'abandoned-cart-get/' + slug
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


export default async function AbandonedCartLayout({
  children,
  params,
}: {
  children: any,
  params: {
    lang: string; devicetype:any, slug: string, data: any
  }
}) {
  var query = false;
  if (children.props.childProp.segment.indexOf('?') >= 0) {
    query = JSON.parse(children.props.childProp.segment.split('?')[1])
  }
  const cartdata = await fetcher(params, query);
  params.data = cartdata;
  return (
    <>
      {children}
    </>
  )
}