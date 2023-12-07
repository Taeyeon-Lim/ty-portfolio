import { NextRequest, NextResponse } from 'next/server';

/** CSP options
 * @default-src  `하위 CSP가 없을 경우, Default로 적용되는 CSP`
 * @(script/style/img/font...)-src  `해당 (...)가 명시된 주소에서 왔는지 검사`
 * @connect-src  `XMLHttpRequest, WebSocket 등 검사`
 * @object-src    `<object>, <embed>, <applet> 등의 태그가 허용 주소에서 왔는지 검사`
 * @media-src   `<audio>, <video>가 허용 주소에서 왔는지 검사`
 * @form-action   `<form>의 소스를 검사`
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    connect-src vitals.vercel-insights.com;
`;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-nonce', nonce);

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  );

  // 악성 코드를 request header에 심는 것 방지 (response 헤더를 직접 반환)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
    headers: {
      'x-nonce': nonce,
      'Content-Security-Policy': contentSecurityPolicyHeaderValue,
    },
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
