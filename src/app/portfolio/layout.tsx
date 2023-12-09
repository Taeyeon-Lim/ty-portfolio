import { ReactNode } from 'react';

import Script from 'next/script';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Draco preLoad */}
      <Script src='https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_wasm_wrapper.js' />

      {children}
    </>
  );
}

export default Layout;
