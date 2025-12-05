import {NextFont} from "next/dist/compiled/@next/font";
import {LucideIcon} from "lucide-react";

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

type template = {
    slug: string,
    label: string,
    icon?: LucideIcon
}

type postMeta = {
    label: string,
    postType: string[],
    fields: postMetaField[]
}

type postMetaField = {
    slug: string,
    label: string,
    placeholder?: string,
    type: 'text' | 'textarea' | 'select' | 'checkbox',
    options?: postMetaFieldSelectOption[]
}

type postMetaFieldSelectOption = {
    label: string,
    value: string
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
    customPostTypes?: customPostType[],
    templates?: template[],
    postMeta?: postMeta[]
}