/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    domainURL: 'https://tyeon-portfolio.vercel.app',
    base64Placeholder:
      'data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM1NTUiIG9mZnNldD0iNSUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM2NjYiIG9mZnNldD0iMTUlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjODg4IiBvZmZzZXQ9IjM1JSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzY2NiIgb2Zmc2V0PSI1NSUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM1NTUiIG9mZnNldD0iMTAwJSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1NTUiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiIC8+CiAgPGFuaW1hdGUgeGxpbms6aHJlZj0iI3IiIGF0dHJpYnV0ZU5hbWU9IngiIGZyb209Ii0xMDAlIiB0bz0iMjAwJSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICAvPgo8L3N2Zz4=',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.glsl/,
  //     type: 'asset/source',
  //   });
  //   return config;
  // },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // 실험적인 기능, 미리 링크 다음 정보를 가져옴 (특히, 모바일에서 최대 1초 단축)
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // 브라우저의 콘텐츠 유형 추측 방지 (파일 업로드 및 공유 사이트에 대한 XSS 방지)
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // DOM 또는 Iframe 내의 브라우저 기능 사용 범위 설정
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // `미들웨어에서 CSP-policy 설정 시, 필요없음` (IE, Chrome, Safari에서만 작동)
          //  CSP 지원이 안되는 브라우저에서 사용 시에도 XSS 취약점이 있을 수 있음
          // {
          //   key: 'X-XSS-Protection',
          //   value: '1; mode=block',
          // },
          // `미들웨어에서 CSP-policy 설정 시, 필요없음` (frame-ancestors로 사용됨)
          //  타 사이트에 내 콘텐츠 삽입 방지 => 클릭재킹 방어
          // {
          //   key: 'X-Frame-Options',
          //   value: 'SAMEORIGIN',
          // },
          // Vercel 배포인 경우, 자동 추가됨
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload'
          // }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
