import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Тестовое задание',
  description: 'Тестовое задание для компании true.code',
  keywords: [
    'тестовое задание',
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_HOST}`),
  openGraph: {
    title: 'Тестовое задание',
    description: 'Страница тестового задания для компании true.code',
    url: `${process.env.NEXT_PUBLIC_CLIENT_HOST}`,
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
    icon: `${process.env.NEXT_PUBLIC_CLIENT_HOST || 'http://localhost:3000'}/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_CLIENT_HOST || 'http://localhost:3000'}/favicon.ico`,
  }
};
