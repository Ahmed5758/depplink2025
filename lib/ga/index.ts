// // log the pageview with their URL
// export const pageview = (url) => {
//     // window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
//     //   page_path: url,
//     // })
//     console.log('working')
//   }
  
//   // log specific events happening.


declare global {
  interface Window {
    gtag: any;
  }
}


// export const GA_TRACKING_ID = 'GTM-XXXX'

// export default function trackPageView(url:any) {
//     try {
//       if (window.gtag)
//         window.gtag("config", GA_TRACKING_ID, {
//         page_location: url,
//       });
//   } catch (error) {
//     console.log("Error from the trackerPageView => ", error);
//   }
// }

// export const event = ({action, params}) => {
//   if (typeof window !== 'undefined') {
//     window.gtag('event', action, params)
//     console.log('123456')
//   }
// }


export const GA_TRACKING_ID = 'G-2SYCKK1YYT';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url:any) => {
  if (typeof window.gtag !== 'undefined'){

    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action:any) => {
  window.gtag("event", action.action, {
    event_category: action.category,
    event_label: action.label,
    value: action.value,
  });
};