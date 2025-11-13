import "./../globals.css";
import {Settings} from "@theme/settings";
import Header from "@theme/header";
import Footer from "@theme/footer";
import {getLocale} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    let bodyClass = Settings.bodyClass;
    Settings.fonts.forEach(font => {
        bodyClass = bodyClass.concat(" ", font.variable)
    });
    const locale = await getLocale();

    return (
        <html lang={locale} className="overflow-x-hidden">
        <body
            className={`${bodyClass} flex flex-col min-h-screen antialiased overflow-x-hidden`}
        >
        <NextIntlClientProvider>
            <div className="flex-[1_0_auto]">
                <Header locale={locale}/>
                <main>
                    {children}
                </main>
            </div>
            <Footer locale={locale}/>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
