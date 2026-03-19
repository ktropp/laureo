import {
    LayoutDashboard,
    FileText,
    Settings as SettingsIcon,
    Users,
    Images,
    List,
    Menu,
    LogOut, X
} from "lucide-react";
import {Button} from "components/ui/button";
import {logout} from "actions/logout";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UserInfo} from "components/user-info";
import {Settings} from "@theme/settings";
import Image from "next/image";
import cmsIcon from "@theme/icon.svg";
import {useTranslations} from "next-intl";
import {useState} from "react";

//TODO: dynamic import icon

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}


export function Sidebar({collapsed, onToggle}: SidebarProps) {
    const t = useTranslations('sidebar');
    const pathname = usePathname()

    const [activeVersionModal, setActiveVersionModal] = useState(false);

    let menuItems = [
        {icon: LayoutDashboard, label: t('dashboard'), href: "/"},
        {icon: FileText, label: t('pages'), href: "/page"},
        {icon: Images, label: t('media'), href: "/media"},
        {icon: Users, label: t('users'), href: '/user'},
        {icon: List, label: t('menus'), href: '/menu'},
        {icon: SettingsIcon, label: t('settings'), href: '/settings'},
    ];

    const customPostTypes = Settings.customPostTypes;
    if (customPostTypes && customPostTypes.length > 0) {
        const newMenuItems = []
        customPostTypes.map((customPostType) => {
            newMenuItems.push({
                icon: customPostType.icon || FileText,
                label: customPostType.label || customPostType.slug,
                href: `/${customPostType.slug}`
            })
        })
        menuItems = [
            ...menuItems.slice(0, 2),
            ...newMenuItems,
            ...menuItems.slice(2, menuItems.length)
        ]
    }

    return (
        <div className={`
      fixed left-0 top-0 h-full bg-card border-r border-laureo-border dark:border-laureo-border-dark transition-all duration-300 z-50 w-16 flex flex-col
      ${collapsed ? 'xl:w-16' : 'xl:w-64'}
    `}>
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                <div className={`items-center gap-2 flex ${collapsed ? 'xl:hidden' : ''}`}>
                    {cmsIcon ? (
                        <div className="w-8 h-8">
                            <Image src={cmsIcon} alt={Settings.cmsName ?? 'Laureo CMS'}/>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-laureo-primary rounded-md items-center justify-center flex">
                            <span
                                className="text-laureo-text font-bold text-sm">{Settings.cmsName ? Settings.cmsName.slice(0, 1).toUpperCase() : 'L'}</span>
                        </div>
                    )}
                    <span
                        className={`hidden font-semibold text-lg xl:block`}>{Settings.cmsName ?? 'Laureo CMS'}</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="p-1.5 hidden xl:block"
                >
                    <Menu className="h-4 w-4"/>
                </Button>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                <div className="space-y-2">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`w-full flex items-center gap-3 transition-colors cursor-pointer`}
                        >
                            <Button className={`${collapsed ? 'xl:justify-center' : ''}`}
                                    variant={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'menu_active' : 'menu'}>
                                <item.icon className="h-5 w-5 flex-shrink-0"/>
                                {!collapsed &&
                                    <span className="text-sm font-medium hidden xl:inline">{item.label}</span>}
                            </Button>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-laureo-border dark:border-laureo-border-dark">
                {/* User Info */}
                <div
                    className={`flex items-center gap-3 justify-center xl:justify-start flex-col ${collapsed ? 'xl:justify-center xl:flex-col' : 'xl:flex-row'}`}>
                    <UserInfo collapsed={collapsed}/>
                    <form action={logout}>
                        <Button variant="ghost" size="sm" className="p-1" type="submit">
                            <LogOut className="h-4 w-4"/>
                        </Button>
                    </form>
                </div>
            </div>

            {/* Version info */}
            <div className="p-4 mt-auto border-t border-laureo-border dark:border-laureo-border-dark">
                <Button
                    variant="link"
                    onClick={() => setActiveVersionModal(true)}
                >
                    {t('version')} 1.0.0
                </Button>
                {activeVersionModal &&
                <div
                    className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/70 z-90 p-4 xl:p-8">
                    <div className="bg-laureo-body dark:bg-laureo-body-dark rounded-md w-full h-full max-w-200">
                        <div
                            className="flex justify-between border-b border-laureo-border dark:border-laureo-border-dark">
                            <div className="text-xl font-semibold p-4">{t('whats-new')}</div>
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={() => setActiveVersionModal(false)}
                                    className="cursor-pointer p-4 w-15 h-15 flex items-center justify-center border-l border-laureo-border rounded-tr-md dark:border-laureo-border-dark hover:bg-laureo-secondary hover:text-laureo-body transition-colors"
                                >
                                    <X size={20}/>
                                </button>
                            </div>
                        </div>
                        <div className="flex h-[calc(100%-61px)]">
                            <div className="flex flex-col gap-4 p-4">
                                <h2 className="text-lg font-semibold">Todo</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar velit at elit mollis porttitor. In sem ex, lobortis vitae justo eu, condimentum rutrum sapien. Cras condimentum risus sed rhoncus tristique. Praesent eu mattis ex.</p>
                                <ul className="list-disc pl-5">
                                    <li>Lorem ipsum</li>
                                    <li>Lorem ipsum</li>
                                    <li>Lorem ipsum</li>
                                </ul>
                                <h2 className="text-lg font-semibold">Todo</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar velit at elit mollis porttitor. In sem ex, lobortis vitae justo eu, condimentum rutrum sapien. Cras condimentum risus sed rhoncus tristique. Praesent eu mattis ex.</p>
                                <h2 className="text-lg font-semibold">Todo</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar velit at elit mollis porttitor. In sem ex, lobortis vitae justo eu, condimentum rutrum sapien. Cras condimentum risus sed rhoncus tristique. Praesent eu mattis ex.</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}
