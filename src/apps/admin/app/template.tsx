'use client'

import {Sidebar} from "components/sidebar";

export default function BaseTemplate({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    const isAuthRoute = false;

    if (isAuthRoute) {
        return (
            <div>
                {children}
            </div>
        )
    }

    return (
        <div>
            <Sidebar/>
            <main className="transition-all duration-300 min-h-screen ml-64 p-6 border-slate-300 dark:border-slate-600">
                <div className="p-6 border-1 rounded-lg border-slate-300 dark:border-slate-600">
                    {children}
                </div>
            </main>
        </div>
    )
        ;
}