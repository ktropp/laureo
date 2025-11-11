'use client'

import {Settings} from "@theme/settings";
import {Sidebar} from "components/sidebar";
import {usePathname} from "next/navigation";
import {useState} from "react";
import Image from "next/image";
import cmsIcon from "@theme/favicon/favicon.svg";
//TODO: dynamic import icon

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
                                {cmsIcon ? (
                                    <div className="w-12 h-12">
                                        <Image src={cmsIcon} alt={Settings.cmsName ?? 'Laureo CMS'}/>
                                    </div>
                                ) : (
                                    <div
                                        className="w-12 h-12 bg-laureo-primary rounded-md items-center justify-center flex">
                            <span
                                className="text-laureo-text font-bold text-xl">{Settings.cmsName ? Settings.cmsName.slice(0, 1).toUpperCase() : 'L'}</span>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{Settings.cmsName ?? 'Laureo CMS'}</h1>
                        </div>
                        <div className="p-6 border-laureo-border dark:border-laureo-border-dark border-1 rounded-lg">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const [collapsed, setCollapsed] = useState(false);
    const onToggle = () => setCollapsed(!collapsed);

    return (
        <div>
            <Sidebar collapsed={collapsed} onToggle={onToggle}/>
            <main
                className={`${collapsed ? 'xl:ml-16' : 'xl:ml-64'} transition-all duration-300 ml-16 p-3 border-laureo-border dark:border-laureo-border-dark`}>
                <div
                    className="p-3 border-1 rounded-lg min-h-content-height border-laureo-border dark:border-laureo-border-dark">
                    {children}
                </div>
            </main>
        </div>
    )
        ;
}
