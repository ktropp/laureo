import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import type {Metadata} from "next";

import {Figtree} from "next/font/google";
import "./globals.css";
import {ToastContainer} from "react-toastify";

const figtree = Figtree({
    variable: "--font-figtree",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Laureo CMS",
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
            className={`${figtree.variable} antialiased h-full bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50`}
        >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <ToastContainer />
        </body>
        </html>
    );
}
