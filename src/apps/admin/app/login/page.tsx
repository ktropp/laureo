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
    const t = useTranslations('install');

    const [state, action, pending] = useActionState(login, undefined)
    const [showPassword, setShowPassword] = useState(false);

    const currentUser = state?.data || {}

    return (
        <>
            {state?.message && (<Alert variant="destructive" className="mb-3">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {state?.message}
                </AlertDescription>
            </Alert>)}

            <div className="space-y-1 mb-3">
                <h2 className="text-xl font-semibold">Login</h2>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                    Enter your email and password to access your account
                </p>
            </div>
            <div>
                <form className="space-y-4" action={action}>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            defaultValue={currentUser?.email}
                            required
                            error={state?.errors?.email}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
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
                                Remember me
                            </Label>
                        </div>
                        <Link href="" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={pending}>
                        Login
                    </Button>
                </form>

            </div>
        </>
    );
}