import { Suspense } from "react";
import {} from "next/font/google";
import { MainLayout } from "@/shared/layouts/RootLayout";

import localFont from "next/font/local";
import TanstackProvider from "@/app/providers/TanstackProvider";

const ptrootui = localFont({
  src: "../public/fonts/pt-root-ui_regular.woff",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={ptrootui.className}>
        <Suspense fallback={<></>}></Suspense>
        <TanstackProvider>
          <MainLayout>
            {children}
            </MainLayout>
        </TanstackProvider>
      </body>
    </html>
  );
}
