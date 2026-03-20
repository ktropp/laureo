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
    return <>
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="flex flex-col gap-4">
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
                <div className="border border-laureo-border dark:border-laureo-border-dark rounded-lg">
                    <div className="p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                        <h2 className="text-lg font-bold">Title</h2>
                    </div>
                    <div className="p-4">
                        Todo: content
                    </div>
                </div>
            </div>
        </div>
    </>;
}
