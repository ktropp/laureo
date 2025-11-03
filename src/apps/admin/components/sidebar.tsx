import {
    LayoutDashboard,
    FileText,
    Settings as SettingsIcon,
    Users,
    Images,
    List,
    Menu,
    LogOut
} from "lucide-react";
import {Button} from "components/ui/button";
import {logout} from "actions/logout";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UserInfo} from "components/user-info";
import {Settings} from "@theme/settings";
import Image from "next/image";
import cmsIcon from "@theme/favicon/favicon.svg";
//TODO: dynamic import icon

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const menuItems = [
    {icon: LayoutDashboard, label: "Dashboard", href: "/"},
    {icon: FileText, label: "Pages", href: "/page"},
    {icon: Images, label: "Media", href: "/media"},
    {icon: Users, label: "Users", href: '/user'},
    {icon: List, label: "Menus", href: '/menu'},
    {icon: SettingsIcon, label: "Settings", href: '/settings'},
];

export function Sidebar({collapsed, onToggle}: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={`
      fixed left-0 top-0 h-full bg-card border-r border-laureo-border dark:border-laureo-border-dark transition-all duration-300 z-50 w-16
      ${collapsed ? 'xl:w-16' : 'xl:w-64'}
    `}>
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 border-b border-laureo-border dark:border-laureo-border-dark">
                {!collapsed && (
                    <div className="items-center gap-2 flex">
                        <div className="w-8 h-8">
                            <Image src={cmsIcon} alt={Settings.cmsName ?? 'Laureo CMS'}/>
                        </div>
                        {/*
                        <div className="w-8 h-8 bg-laureo-primary rounded-md items-center justify-center flex">
                            <span
                                className="text-laureo-text font-bold text-sm">{Settings.cmsName ? Settings.cmsName.slice(0, 1).toUpperCase() : 'L'}</span>
                        </div>
                        */}
                        <span
                            className="hidden xl:block font-semibold text-lg">{Settings.cmsName ?? 'Laureo CMS'}</span>
                    </div>
                )}
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
            <nav className="flex-1 p-4">
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
                    className={`flex items-center gap-3 justify-center xl:justify-start flex-col xl:flex-row  ${collapsed ? 'xl:justify-center' : ''}`}>
                    <UserInfo/>
                    <form action={logout}>
                        <Button variant="ghost" size="sm" className="p-1" type="submit">
                            <LogOut className="h-4 w-4"/>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
