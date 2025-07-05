import {
    LayoutDashboard,
    FileText,
    Settings,
    Users,
    BarChart3,
    Images,
    Menu,
    LogOut
} from "lucide-react";
import {Button} from "components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "components/ui/avatar";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const menuItems = [
    {icon: LayoutDashboard, label: "Dashboard", active: true},
    {icon: FileText, label: "Posts"},
    {icon: Images, label: "Media"},
    {icon: Users, label: "Users"},
    {icon: BarChart3, label: "Analytics"},
    {icon: Settings, label: "Settings"},
];

export function Sidebar({collapsed, onToggle}: SidebarProps) {

    return (
        <div className={`
      fixed left-0 top-0 h-full bg-card border-r border-slate-300 dark:border-slate-600 transition-all duration-300 z-50 w-16
      ${collapsed ? 'xl:w-16' : 'xl:w-64'}
    `}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-600">
                {!collapsed && (
                    <div className="items-center gap-2 flex">
                        <div className="w-8 h-8 bg-primary rounded-lg items-center justify-center flex">
                            <span className="text-slate-50 font-bold text-sm">L</span>
                        </div>
                        <span className="hidden xl:block font-semibold text-lg">Laureo CMS</span>
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
                        <button
                            key={index}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer justify-center xl:justify-start
                ${item.active
                                ? 'bg-primary text-slate-50 shadow-sm'
                                : 'text-slate-800 hover:bg-slate-200 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                            }
                ${collapsed ? 'xl:justify-center' : ''}
              `}
                        >
                            <item.icon className="h-5 w-5 flex-shrink-0"/>
                            {!collapsed && <span className="text-sm font-medium hidden xl:inline">{item.label}</span>}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-300 dark:border-slate-600">
                {/* User Info */}
                <div
                    className={`flex items-center gap-3 justify-center xl:justify-start flex-col xl:flex-row  ${collapsed ? 'xl:justify-center' : ''}`}>
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"/>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 hidden xl:flex flex-col items-center xl:items-start">
                        <p className="text-sm font-medium truncate">John Doe</p>
                        <p className="text-xs text-slate-800 dark:text-slate-200 truncate">Admin</p>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1">
                        <LogOut className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}