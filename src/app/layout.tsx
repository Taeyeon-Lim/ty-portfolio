import './globals.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';

const Navigator = dynamic(() => import('@Components/Navigator'));
const ChannelTalkBoot = dynamic(() => import('@Components/ChannelTalkBoot'), {
  ssr: false,
});
import { Analytics } from '@vercel/analytics/react';

import { DOMAIN_URL } from '@Utils/env';

const notoSansKR_set = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansKR-Light.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/NotoSansKR-Regular.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/NotoSansKR-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+AC00-D7A3',
    },
  ],
  variable: '--font-NotoSansKR',
});
const roboto_set = localFont({
  src: [
    {
      path: '../../public/fonts/Roboto-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/Roboto-Regular.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Roboto-Bold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0041-005A, U+0061-007A, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E',
    },
  ],
  variable: '--font-Roboto',
});
const global_fontFamily = `${roboto_set.variable} ${notoSansKR_set.variable} `;

const META_DESCRIPTION = 'taeyeon portfolio, 태연 포트폴리오';
const META_PROJECT_NAME = 'ty-portfolio';
const META_CREATOR = 'Taeyeon Lim';

export const metadata: Metadata = {
  title: 'ty portfolio',
  description: META_DESCRIPTION,
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: META_PROJECT_NAME,
  authors: [{ name: META_CREATOR, url: 'https://github.com/Taeyeon-Lim' }],
  creator: META_CREATOR,
  publisher: META_CREATOR,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={global_fontFamily}>
      <head>
        {/* OPEN GRAPH */}
        <meta property='og:title' content={META_PROJECT_NAME} />
        <meta property='og:description' content={META_DESCRIPTION} />
        <meta property='og:url' content={DOMAIN_URL} />
        <meta property='og:site_name' content={META_PROJECT_NAME} />
        <meta property='og:locale' content='ko_KR' />
        <meta property='og:image' content={DOMAIN_URL + '/og.png'} />
        <meta property='og:image:width' content='1223' />
        <meta property='og:image:height' content='689' />
        <meta property='og:image:alt' content={META_PROJECT_NAME} />
        <meta property='og:type' content='website' />

        {/* TWITTER */}
        <meta name='twitter:creator' content={META_CREATOR} />
        <meta name='twitter:title' content={META_PROJECT_NAME} />
        <meta name='twitter:description' content={META_DESCRIPTION} />
        <meta name='twitter:card' content='app' />
        <meta name='twitter:image' content={DOMAIN_URL + '/og.png'} />
        <meta name='twitter:image:alt' content={META_PROJECT_NAME} />
        <meta name='twitter:app:name:iphone' content={META_PROJECT_NAME} />
        <meta name='twitter:app:url:iphone' content={DOMAIN_URL} />
        <meta name='twitter:app:name:ipad' content={META_PROJECT_NAME} />
        <meta name='twitter:app:url:ipad' content={DOMAIN_URL} />
        <meta name='twitter:app:name:googleplay' content={META_PROJECT_NAME} />
      </head>

      <body>
        <h1 className='hide-header'>{META_PROJECT_NAME}</h1>

        {children}

        <Navigator />

        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Prevent local CSP error message */}
            <Analytics mode='production' />

            {/* only production */}
            <ChannelTalkBoot />
          </>
        )}
      </body>
    </html>
  );
}
