import type { Metadata } from 'next';
import '@/app/globals.css';
import React from 'react';
import Header from '@/app/(default)/components/header';
import Footer from '@/app/(default)/components/footer';

export const metadata: Metadata = {
  title: 'project', // title을 항상 문자열로 보장
  description: '',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container justify-center p-4 xs:p-6 md:p-8 lg:p-12 xl:p-[100px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
