"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "../../components/ui/select";
import {menuLangAdd} from "actions/menuLangAdd";
import Link from "next/link";
import {Settings} from "@theme/settings";
import {useActionState} from "react";
import {menuAdd} from "actions/menuAdd";
import MenuBuilder from "components/menu/MenuBuilder";
import {useTranslations} from "next-intl";

export function MenuForm({menu}: { menu: Menu }) {
    const t = useTranslations('menus')
    const tTranslations = useTranslations('translations')

    const languages = Settings.languages;
    let translations;
    if (menu.menu) {
        translations = Settings.languages.map(code => {
            const match = menu.menu.translations.find(pl => pl.languageCode === code);
            return {
                languageCode: code,
                menuLang: match || null
            }
        });
    }

    const defaultLanguage = Settings.defaultLanguage;

    const [state, action, pending] = useActionState(menuAdd, undefined);

    const currentMenu = state || menu || {};

    return (
        <div className="flex justify-between">
            <div className="w-full">
                <MenuBuilder menuLang={menu} />
            </div>
            <div
                className="w-full max-w-md border-l min-h-sidebar-height pl-3 ml-3 border-laureo-border dark:border-laureo-border-dark">
                <form action={action}>
                    <Button type="submit" disabled={pending} className="mb-2">
                        {t('save')}
                    </Button>

                    <Input
                        type="hidden"
                        name="id"
                        defaultValue={currentMenu.id || ''}
                    />

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="location">{t('location')}</Label>
                        <Select defaultValue={currentMenu.menu?.location || ''} disabled={currentMenu.menu?.location}
                                name="location">
                            <SelectTrigger>
                                <SelectValue placeholder={t('location-placeholder')}/>
                            </SelectTrigger>
                            <SelectContent>
                                {Settings.menuLocations.map(item => (
                                    <SelectItem key={item.slug}
                                                value={item.slug}>{item.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="languageCode">{t('language')}</Label>
                        <Select defaultValue={currentMenu.languageCode || defaultLanguage} name="languageCode"
                                disabled={currentMenu.languageCode}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('language-placeholder')}/>
                            </SelectTrigger>
                            <SelectContent>
                                {languages?.map(item => (
                                    <SelectItem key={item}
                                                value={item}>{item}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="title">{t('title')}</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder={t('title-placeholder')}
                            name="title"
                            required
                            defaultValue={currentMenu.title}
                            error={state?.errors?.title}
                        />
                    </div>

                    <div className="w-full border-b-1 border-laureo-border dark:border-laureo-border-dark mt-4 mb-4"></div>

                    <h2 className="text-xl mt-5 font-semibold">{tTranslations('title')}</h2>

                    {translations?.filter(lang => lang.languageCode !== currentMenu.languageCode).map((lang, index) => (
                        <div key={index} className="flex items-center space-y2 mb-2">
                            <Label className="flex-[1_0_auto] mr-2 mb-0">{lang.languageCode}</Label>
                            <Input
                                type="text"
                                disabled
                                defaultValue={lang.menuLang?.title || ''}
                            />
                            {lang.menuLang ? (
                                <Link href={`/menu/${lang.menuLang.id}`}><Button
                                    type="button">{tTranslations('edit')}</Button></Link>) : (<Button type="button"
                                                                                   onClick={() => menuLangAdd(currentMenu.menuId, lang.languageCode)}>{tTranslations('create')}</Button>)}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}
