import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getShipmentSurveryForm = cache(async (lang: string, query: any) => {
  
  let queryString = `?lang=${lang}&${cacheKey}`;
  
  if (typeof query === 'string') {
    const decodedQuery = decodeURIComponent(query);
    const ticketMatch = decodedQuery.match(/shipment_no=([^&]+)/);
    const ticketNumber = ticketMatch ? ticketMatch[1] : '';
    
    if (ticketNumber) {
      queryString += `&shipment_no=${ticketNumber}&survey_type=1`;
    }
  } 
  // If query is an object with shipment_no property
  else if (query?.shipment_no) {
    const decodedTicketNo = decodeURIComponent(query.shipment_no);
    const ticketMatch = decodedTicketNo.match(/shipment_no=([^&]+)/);
    const ticketNumber = ticketMatch ? ticketMatch[1] : decodedTicketNo;
    
    queryString += `&shipment_no=${ticketNumber}&survey_type=2`;
  } else if (query) {
    const searchParams = new URLSearchParams(query);
    if (searchParams.toString()) {
      queryString += '&' + searchParams.toString();
    }
  }
  
  const url = `${Api}check-survery-shipment-maintenance${queryString}`;
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) throw new Error("Failed to load maintenance survey data");
  return await res.json();
});