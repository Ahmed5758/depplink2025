'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="0.375rem"
        color="linear-gradient(90deg, #004B7A 8.33%, #8C191B 21.27%, #FF7B34 91.81%)"
        options={{ showSpinner: false, parent: '#loader-spin', speed: 400 }}
        shallowRouting
      />
    </>
  );
};

export default Providers;