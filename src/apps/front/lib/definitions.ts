import {NextFont} from "next/dist/compiled/@next/font";

type menuLocation = {
    slug: string,
    title: string
}

export type Settings = {
    frontendUrl: string,
    cdnUrl: string,
    cmsName?: string;
    languages: string[],
    defaultLanguage: string,
    adminLanguage: string,
    fonts?: NextFont[],
    bodyClass?: string,
    menuLocations?: menuLocation[]
}