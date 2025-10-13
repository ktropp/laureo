import * as LucideIcons from 'lucide-react';
import {LucideIcon} from "lucide-react";

export const getIconByName = (name: string) => {
    return LucideIcons[name as keyof typeof LucideIcons];
};

export const getIconName = (icon: LucideIcon): string => {
    return Object.entries(LucideIcons).find(([_, value]) => value === icon)?.[0] || '';
};
