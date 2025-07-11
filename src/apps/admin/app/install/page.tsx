"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {install} from "actions/install"
import {
    Eye,
    EyeOff
} from "lucide-react";
import {useActionState, useState} from "react";
import {useTranslations} from "next-intl";

export default function Page() {
    const t = useTranslations('install');

    const [state, action, pending] = useActionState(install, undefined)
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="space-y-1 mb-3">
                <h2 className="text-xl font-semibold">{t('title')}</h2>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                    {t('description')}
                </p>
            </div>

            <form className="space-y-4" action={action}>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        error={state?.errors?.email}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            error={state?.errors?.password}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent max-h-10"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground"/>
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground"/>
                            )}
                        </Button>
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={pending}>
                    Finish installation
                </Button>
            </form>
        </>
    )
}