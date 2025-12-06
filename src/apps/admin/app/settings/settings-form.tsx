"use client"

import {Settings} from "@theme/settings";
import {useActionState} from "react";
import {globalFieldsEdit} from "@admin/actions/globalFieldsEdit";
import {Label} from "@admin/components/ui/label";
import {Input} from "@admin/components/ui/input";
import {Button} from "@admin/components/ui/button";
import {toast} from 'react-toastify';
import {useTranslations} from "next-intl";

export function SettingsForm({data}: { data: GlobalField[] }) {
    const t = useTranslations('settings');
    const globalFields = Settings.globalFields
    const [state, action, pending] = useActionState(globalFieldsEdit, undefined);

    return (
        <>
            <h1 className="text-4xl font-bold">{t('title')}</h1>
            <div className="max-w-3xl">
                <form className="space-y-4" action={async (formData) => {
                    const result = await action(formData);

                    if (result?.errors) {
                        toast.error('Please check the form for errors');
                        return;
                    }

                    toast.success('Successfully saved!');
                }}>
                    {globalFields.map((field, index) => (
                        <div className="space-y-2" key={index}>
                            <Label htmlFor={field.slug}>{field.title} [{field.slug}]</Label>
                            <Input
                                id={field.slug}
                                type="text"
                                name={field.slug}
                                defaultValue={state?.data?.filter((item) => item.slug === field.slug)[0]?.value || data?.filter((item) => item.slug === field.slug)[0]?.value || ''}
                            />
                        </div>
                    ))}

                    <Button type="submit" disabled={pending}>
                        {t('submit')}
                    </Button>
                </form>
            </div>
        </>
    )
}