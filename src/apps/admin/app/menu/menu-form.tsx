"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "../../components/ui/select";
import {postLangAdd} from "actions/postLangAdd";
import Link from "next/link";
import {Settings} from "../../../../../theme/settings";
import {useActionState} from "react";
import {menuAdd} from "actions/menuAdd";
import MenuBuilder from "components/menu/MenuBuilder";

export function MenuForm({menu}: { menu: Menu }) {
    const languages = Settings.languages;
    let translations;
    if (menu.menu) {
        translations = Settings.languages.map(code => {
            const match = menu.menu.translations.find(pl => pl.languageCode === code);
            return {
                languageCode: code,
                postLang: match || null
            }
        });
    }
    const defaultLanguage = Settings.defaultLanguage;

    const [state, action, pending] = useActionState(menuAdd, undefined);

    const currentMenu = state?.data || menu || {};

    return (
        <div className="flex justify-between">
            <div className="w-full">
                <MenuBuilder menuLang={menu} />
            </div>
            <div
                className="w-full max-w-md border-l min-h-sidebar-height px-3 ml-3 border-slate-300 dark:border-slate-600">
                <form action={action}>
                    <Button type="submit" disabled={pending} className="mb-2">
                        Save
                    </Button>

                    <Input
                        type="hidden"
                        name="id"
                        defaultValue={currentMenu.id || ''}
                    />

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="location">Location</Label>
                        <Select defaultValue={currentMenu.menu?.location || ''} disabled={currentMenu.menu?.location}
                                name="location">
                            <SelectTrigger>
                                <SelectValue placeholder="Choose location"/>
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
                        <Label htmlFor="languageCode">Language</Label>
                        <Select defaultValue={currentMenu.languageCode || defaultLanguage} name="languageCode"
                                disabled={currentMenu.languageCode}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose language"/>
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
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            required
                            defaultValue={currentMenu.title}
                            error={state?.errors?.title}
                        />
                    </div>

                    <div className="w-full border-b-1 border-slate-300 dark:border-slate-600 mt-4 mb-4"></div>

                    <h2 className="text-xl mt-5 font-semibold">Translations</h2>

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
                                    type="button">Edit</Button></Link>) : (<Button type="button"
                                                                                   onClick={() => postLangAdd(currentMenu.postId, lang)}>Create</Button>)}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}
