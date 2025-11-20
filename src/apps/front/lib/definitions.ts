import {NextFont} from "next/dist/compiled/@next/font";
import { LucideIcon } from "lucide-react";

type menuLocation = {
    slug: string,
    title: string
}

type globalField = {
    slug: string,
    title: string
}

type customPostTypeRewrite = {
    lang: string,
    rewrite: string
}

type customPostType = {
    slug: string,
    label: string,
    icon?: LucideIcon,
    rewrite?: customPostTypeRewrite[]
}

export type Settings = {
    frontendUrl: string,
    cdnUrl: string,
    appName: string,
    cmsName?: string;
    languages: string[],
    defaultLanguage: string,
    adminLanguage: string,
    fonts?: NextFont[],
    bodyClass?: string,
    menuLocations?: menuLocation[],
    globalFields?: globalField[],
    customPostTypes?: customPostType[]
}