import {Settings} from "@theme/settings";
import {useTranslations} from "next-intl";
import {getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('dashboard')
    return {
        title: t('meta-title') + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}

export default function Home() {
    const t = useTranslations('dashboard');
    return (
        <h1 className="text-4xl font-bold">{t('title')}</h1>
    );
}
