import {Metadata} from "next";
import {Settings} from "@theme/settings";
import {SettingsForm} from "@admin/app/settings/settings-form";
import { prisma } from "@admin/lib/prisma";

export const metadata: Metadata = {
    title: "Settings" + " | " + (Settings.cmsName ?? "Laureo CMS"),
};
export default async function SettingsPage() {
    const globalFields = await prisma.GlobalField.findMany();

    return (
        <>
            <SettingsForm data={globalFields}/>
        </>
    );
}
