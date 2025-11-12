import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import type {Metadata} from "next";

import {Roboto} from "next/font/google";
import "./globals.css";
import {ToastContainer} from "react-toastify";
import {Settings} from '@theme/settings';

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
    title: Settings.cmsName ?? "Laureo CMS",
    description: "Wordpress-like CMS. Built with Next.js, Prisma, and Tailwind CSS.",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    return (
        <html lang={locale}>
        <body
            className={`${roboto.variable} font-(family-name:--font-roboto) antialiased h-full bg-laureo-body dark:bg-laureo-body-dark text-laureo-text-dark dark:text-laureo-text`}
        >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
        />
        </body>
        </html>
    );
}
