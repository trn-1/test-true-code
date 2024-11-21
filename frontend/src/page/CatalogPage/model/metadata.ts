import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Тестовое задание',
  description: 'Тестовое задание для компании true.code',
  keywords: [
    'тестовое задание',
  ],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Тестовое задание',
    description: 'Страница тестового задания для компании true.code',
    url: 'http://localhost:3000',
    siteName: 'Тестовое задание для компании true.code',
    images: [
      {
        url: '/logo.webp',
        width: 640,
        height: 640
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  icons: {
    icon: `${'http://localhost:3000'}/favicon.ico`,
    apple: `${'http://localhost:3000'}/favicon.ico`,
  }
};
