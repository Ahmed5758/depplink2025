import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getmaintenanceSurveryForm = cache(async (lang: string, query: any) => {
  
  let queryString = `?lang=${lang}&${cacheKey}`;
  
  if (typeof query === 'string') {
    const decodedQuery = decodeURIComponent(query);
    const ticketMatch = decodedQuery.match(/ticket_no=([^&]+)/);
    const ticketNumber = ticketMatch ? ticketMatch[1] : '';
    
    if (ticketNumber) {
      queryString += `&ticket_no=${ticketNumber}&survey_type=2`;
    }
  } 
  // If query is an object with ticket_no property
  else if (query?.ticket_no) {
    const decodedTicketNo = decodeURIComponent(query.ticket_no);
    const ticketMatch = decodedTicketNo.match(/ticket_no=([^&]+)/);
    const ticketNumber = ticketMatch ? ticketMatch[1] : decodedTicketNo;
    
    queryString += `&ticket_no=${ticketNumber}&survey_type=2`;
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