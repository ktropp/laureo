"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import Link from "next/link";
import {
    Eye,
    EyeOff
} from "lucide-react";
import {useState} from "react";

export default function Page({
                                 params,
                                 searchParams,
                             }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        // Clear error and proceed with login logic
        setError("");
        console.log("Login attempt:", {email, password, rememberMe});
    };
    return (
        <>
            <div className="space-y-1 mb-3">
                <h2 className="text-xl font-semibold">Sign in</h2>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                    Enter your email and password to access your account
                </p>
            </div>
            <div>
                <form className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value=""
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
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

                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>

            </div>
        </>
    );
}