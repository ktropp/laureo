"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    AlertCircle
} from "lucide-react";
import {useActionState, useState} from "react";
import {useTranslations} from "next-intl";
import {login} from "actions/login"
import {Alert, AlertTitle, AlertDescription} from "components/ui/alert";

export default function Page({
                                 params,
                                 searchParams,
                             }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const t = useTranslations('login');

    const [state, action, pending] = useActionState(login, undefined)
    const [showPassword, setShowPassword] = useState(false);

    const currentUser = state?.data || {}

    return (
        <>
            {state?.message && (<Alert variant="destructive" className="mb-3">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>{t('error')}</AlertTitle>
                <AlertDescription>
                    {state?.message}
                </AlertDescription>
            </Alert>)}

            <div className="space-y-1 mb-3">
                <h2 className="text-xl font-semibold">{t('title')}</h2>
                <p className="text-sm text-laureo-text-lighter dark:text-laureo-text-lighter-dark">
                    {t('description')}
                </p>
            </div>
            <div>
                <form className="space-y-4" action={action}>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder={t('email-placeholder')}
                            name="email"
                            defaultValue={currentUser?.email}
                            required
                            error={state?.errors?.email}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t('password')}</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder={t('password-placeholder')}
                                name="password"
                                defaultValue={currentUser?.password}
                                required
                                error={state?.errors?.password}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                className="rounded border-input"
                            />
                            <Label htmlFor="remember" className="text-sm mb-0">
                                {t('remember')}
                            </Label>
                        </div>
                        <Link href="" className="text-sm text-laureo-primary hover:underline">
                            {t('forgot')}
                        </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={pending}>
                        {t('submit')}
                    </Button>
                </form>

            </div>
        </>
    );
}