'use client'

import {Sidebar} from "components/sidebar";
import {usePathname} from "next/navigation";

export default function BaseTemplate({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const authRoutes = ['login', 'install'];
    const isAuthRoute = authRoutes.some(route => pathname?.includes(route));

    if (isAuthRoute) {
        return (
            <div className="flex min-h-screen">
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-md space-y-6">
                        {/* Logo and Header */}
                        <div className="text-center space-y-2">
                            <div className="flex justify-center">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-slate-50 font-bold text-xl">L</span>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">Laureo CMS</h1>
                        </div>
                        <div className="p-6 border-slate-300 dark:border-slate-600 border-1 rounded-lg">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Sidebar/>
            <main
                className="transition-all duration-300 ml-16 xl:ml-64 p-3 border-slate-300 dark:border-slate-600">
                <div className="p-3 border-1 rounded-lg min-h-content-height border-slate-300 dark:border-slate-600">
                    {children}
                </div>
            </main>
        </div>
    )
        ;
}
