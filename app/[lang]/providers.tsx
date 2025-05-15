'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
//   useGoogleReCaptcha 
// } from 'react-google-recaptcha-v3';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        {/* <GoogleReCaptchaProvider 
        reCaptchaKey='6LfGjE0qAAAAAGpEAn2m8wZ9wLqb4cfnYSANZ1xK'
        scriptProps={{
            async: false, // optional, default to false,
            defer: false, // optional, default to false
            appendTo: 'head', // optional, default to "head", can be "head" or "body",
            nonce: undefined // optional, default undefined
          }}
          container={{ // optional to render inside custom element
            element: "recaptcha",
            parameters: {
              badge: 'inline', // optional, default undefined
              theme: 'dark', // optional, default undefined
            }
          }}
        > */}
      {children}
      {/* </GoogleReCaptchaProvider> */}
      <ProgressBar
        height="0.375rem"
        color="#f0660c"
        options={{ showSpinner: false, parent: '#loader-spin', speed: 400 }}
        shallowRouting
      />
    </>
  );
};

export default Providers;