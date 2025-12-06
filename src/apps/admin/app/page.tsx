import {Metadata} from "next";
import {Settings} from "@theme/settings";
import {useTranslations} from "next-intl";

export const metadata: Metadata = {
    title: "Dashboard" + " | " + (Settings.cmsName ?? "Laureo CMS"),
};
export default function Home() {
    const t = useTranslations('dashboard');
    return (
        <h1 className="text-4xl font-bold">{t('title')}</h1>
    );
}
