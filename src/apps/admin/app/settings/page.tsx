import {Settings} from "@theme/settings";
import {SettingsForm} from "@admin/app/settings/settings-form";
import {prisma} from "@admin/lib/prisma";
import {getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('settings')
    return {
        title: t('meta-title') + " | " + (Settings.cmsName ?? "Laureo CMS"),
    }
}
export default async function SettingsPage() {
    const globalFields = await prisma.GlobalField.findMany();

    return (
        <>
            <SettingsForm data={globalFields}/>
        </>
    );
}
