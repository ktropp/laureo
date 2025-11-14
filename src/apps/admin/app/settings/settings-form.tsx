"use client"

import {Settings} from "@theme/settings";
import {useActionState} from "react";
import {globalFieldsEdit} from "@admin/actions/globalFieldsEdit";
import {Label} from "@admin/components/ui/label";
import {Input} from "@admin/components/ui/input";
import {Button} from "@admin/components/ui/button";

export function SettingsForm({data}: { data: GlobalField[] }) {
    const globalFields = Settings.globalFields
    const [state, action, pending] = useActionState(globalFieldsEdit, undefined);

    return (
        <div className="max-w-3xl">
            <form className="space-y-4" action={action}>
                {globalFields.map((field, index) => (
                    <div className="space-y-2" key={index}>
                        <Label htmlFor={field.slug}>{field.title} [{field.slug}]</Label>
                        <Input
                            id={field.slug}
                            type="text"
                            name={field.slug}
                            defaultValue={state?.data?.[field.slug] || data?.[field.slug] || ''}
                        />
                    </div>
                ))}

                <Button type="submit" disabled={pending}>
                    Save
                </Button>
            </form>
        </div>
    )
}