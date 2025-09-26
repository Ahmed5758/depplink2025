import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getCustomerSurveryForm = cache(async (lang: string, query: any) => {
  
  let queryString = `?lang=${lang}&${cacheKey}`;
  
  if (typeof query === 'string') {
    const decodedQuery = decodeURIComponent(query);
    
    // Extract orderdetails from the URL
    const orderMatch = decodedQuery.match(/orderdetails=([^&]+)/);
    const orderDetails = orderMatch ? orderMatch[1] : '';
    
    if (orderDetails) {
      // Split the orderdetails (120211+S11047357)
      const parts = orderDetails.split('+');
      const ln_code = parts[0] || '';
      const order_no = parts[1] || '';
      
      if (ln_code && order_no) {
        queryString += `&ln_code=${ln_code}&order_no=${order_no}&survey_type=1`;
      }
    }
  } 
  // If query is an object with orderdetails property
  else if (query?.orderdetails) {
    const parts = query.orderdetails.split('+');
    const ln_code = parts[0] || '';
    const order_no = parts[1] || '';
    
    if (ln_code && order_no) {
      queryString += `&ln_code=${ln_code}&order_no=${order_no}&survey_type=1`;
    }
  } else if (query) {
    const searchParams = new URLSearchParams(query);
    if (searchParams.toString()) {
      queryString += '&' + searchParams.toString();
    }
  }
  
  const url = `${Api}getstorelocator-by-lncode${queryString}`;
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) throw new Error("Failed to load customer survey data");
  return await res.json();
});